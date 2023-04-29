require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const { connect } = require("mongoose");
const { db_token } = process.env;
const UserInfo = require("./schemas/userInfo");
const axios = require("axios");
const _db = require("@replit/database");
const DB = new _db();
const mongoose = require('mongoose');

let connected = false;

async function main() {
  console.log("connecting database");
  await connect(db_token)
    .then(() => {
      console.log("Connected");
      connected = true;
    })
    .catch((error) => {
      console.log(error);
      connected = false;
    });
}

app.get("/exchangerate", cors(), async (req, res) => {
    try {
        let url = "http://www.floatrates.com/daily/usd.json";
        let result = await axios.get(url);
        console.log(result.data["pkr"].rate);
        const currency = parseFloat(result.data["pkr"].rate);
        res.status(200).send(currency.toString());
    } catch (err) {
        res.send('Not-ok');
        console.log(err);
    }
  
});

app.get("/search", cors(), async (req, res) => {
  var response = {
    status: 0,
    data: null,
  };
  console.log(req.query.email);
  if (req.query.email !== "") {
    if (connected) {
      let userProfile = await UserInfo.find({ Email: req.query.email }).sort({
        tStamp: -1,
      });
      if (userProfile.length === 0) {
        response.status = 404;
      } else {
        response.status = 200;

        let rawData = userProfile.map(item => {
            return {
                Email: item.Email,
                PKR: parseFloat(item.PKR),
                USD: parseFloat(item.USD),
                PaymentProcess: item.PaymentProcess,
                OriginalAmount: parseFloat(item.OriginalAmount),
                PayerInfo: item.PayerInfo,
                Referral: item.Referral,
                OrderID: item.OrderID,
                tStamp: Date(item.tStamp).split('GMT')[0],
                Status: item.Status
            }
        });
        response.data = rawData;
      }
    } else response.status = 403;
  }

  res.send(JSON.stringify(response));
});

app.get("/register", cors(), async(req, res) => {
  if (req.query.data !== "") {
    const _postData = JSON.parse(req.query.data);
    const newEntry = new UserInfo({
        _id: new mongoose.Types.ObjectId(),
        Email: _postData.email,
        USD: _postData.USD,
        PKR: _postData.PKR,
        PaymentProcess: _postData.paymentMethod,
        Referral: _postData.Referral,
        OrderID: _postData.OrderID,
        PayerInfo: _postData.PayerInfo,
        OriginalAmount: _postData.OriginalAmount,
        Status: "pending",
    });

    await connect(db_token).then(() => {
        newEntry.save().then((response) => {
            console.log(response);
            res.send('OK');
        }).catch((err) => {
            console.log(err);
            res.send('NOT_OK');
        });
    })
  }
});

app.get('/regnew', cors(), async(req, res) => {
    const newEntry = new UserInfo({
        _id: new mongoose.Types.ObjectId(),
        Email: "alimalikwayne@gmail.com",
        USD: "19.8",
        PKR: "5000",
        PaymentProcess: "Jazzcash",
        Referral: "Undefined",
        OrderID: "12314234",
        PayerInfo: ['null'],
        OriginalAmount: "20"
    });

    await connect(db_token).then(() => {
        newEntry.save().then((response) => {
            console.log(response);
            console.log('Added');
            res.send('Added');
        }).catch(console.log);
    })
});

app.get("/stats", cors(), async (req, res) => {
  const values = "ok";
  //const values = await DB.get("stats");
  res.send(values);
});

app.get("/setstats", cors(), async (req, res) => {
  if (req.query.data !== "") {
    const prevStats = await DB.get("stats");
    const _rawData = req.query.data.split("#");
    const prevStat = prevStats.split("#");
    var overallVal = "";
    var sep = "";
    for (var i = 0; i < prevStat.length; i++) {
      if (i > 0) sep = "#";
      const newVal = prevStat[i];
      if (_rawData[i] !== "0") {
        newVal = parseInt(prevStat[i]) + parseInt(_rawData[i]);
      }
      overallVal += sep + newVal.toString();
    }
    await DB.set("stats", overallVal);
    res.send("OK");
  } else res.send("NOT_OK");
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
  main();
});
