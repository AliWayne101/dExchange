require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const { connect } = require('mongoose');
const { db_token } = process.env;
const UserInfo = require('./schemas/userInfo');
const axios = require('axios');
const _db = require('@replit/database');
const DB = new _db();

let connected = false;

async function main() {
    console.log('connecting database');
    await connect(db_token).then(()=> {
        console.log('Connected');
        connected = true;
    }).catch((error) => {
        console.log(error);
        connected = false;
    });
}

app.get('/exchangerate', cors(), async(req, res) => {
    let url = "http://www.floatrates.com/daily/usd.json";
    let result = await axios.get(url);
    console.log(result.data['pkr'].rate);
    const currency = parseFloat(result.data['pkr'].rate);
    res.status(200).send(currency.toString());
});

app.get('/search', cors(), async(req,res) => {
    var response = {
        status: 0,
        data: null
    };
    console.log(req.query.email);
    if (req.query.email !== "") {
        if (connected) {
            let userProfile = await UserInfo.find({ Email: req.query.email })
                .sort({ tStamp: -1 });
            if (userProfile.length === 0) {
                response.status = 404;
            } else {
                response.status = 200;
                response.data = userProfile;
            }
        } else
            response.status = 403;
    }

    res.send(JSON.stringify(response));
});

app.get('/register', cors(), async(req, res) => {
    if (req.query.data !== "") {
        const _postData = JSON.parse(req.query.data);

    }
});

app.get('/stats', cors(), async(req, res) => {
    const values = await DB.get('stats');
    res.send(values);
});

app.get('/setstats', cors(), async(req, res) => {
    if (req.query.data !== '') {
        const prevStats = await DB.get('stats');
        const _rawData = req.query.data.split('#');
        const prevStat = prevStats.split('#');
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
        await DB.set('stats', overallVal);
        res.send('OK');
    } else
        res.send('NOT_OK');
});

app.listen(port, ()=> {
    console.log(`server is listening on port ${port}`);
    main();
})