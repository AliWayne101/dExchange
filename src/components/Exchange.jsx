import React, { useState, useEffect } from "react";
import styles from "../style";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CURRENCY } from "../tool/USDPKR";
import axios from "axios";
import Button from "./Button";
import { confused, success } from "../assets";
import { backendAddr } from "../constants";
import LoadingScreen from "./LoadingScreen";

let over_amount = 0;
let USDPKR = 0;

console.log(`${backendAddr}/exchangerate`);
axios
  .get(`${backendAddr}/exchangerate`)
  .then((response) => {
    console.log(response.data);
    USDPKR = response.data;
  })
  .catch((err) => {
    console.log("Unable");
  });

const Exchange = ({ refLink }) => {
  const [Show, setShow] = useState(false);

  const [ifSuccess, setIfSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderId, setorderId] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [initialValue, setinitialValue] = useState(0);
  const [userDetails, setUserDetails] = useState({
    email: "",
    number: "",
    paymentMethod: "JazzCash",  
    USD: "",
    PKR: "0",
    Referral: refLink,
  });

  const returnGross = (inputVal) => {
    let fee = 4.4;
    if (inputVal > 3000 && inputVal <= 10000) {
      fee = 3.9;
    } else if (inputVal > 10000 && inputVal <= 100000) {
      fee = 3.7;
    } else if (inputVal > 100000) {
      fee = 3.4;
    }

    var overallfee = (inputVal / 100) * fee;
    var grossDollars = inputVal - overallfee;

    //var totalPKR = parseInt(grossDollars * CURRENCY.USDPKR);
    var totalPKR = parseInt(grossDollars * USDPKR);

    var _tax = inputVal * CURRENCY.TAX;
    var grossPKR = totalPKR - _tax;

    if (inputVal === 0) {
      grossPKR = 0;
      grossDollars = 0;
    }

    if (refLink !== "UNDEFINED") {
      const incentives = inputVal * CURRENCY.REFBONUS;
      grossPKR += incentives;
    }

    var rVal = {
      _fee: fee,
      PKR: grossPKR,
      USD: grossDollars,
    };
    return rVal;
  };

  const createOrder = (data, actions) => {
    console.log('amount');
    console.log(over_amount);
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Friends and Family",
            amount: {
              currency_code: "USD",
              value: over_amount,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setorderId(orderID);
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    setIsLoading(true);
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setIfSuccess(true);

      //Register in Database
      const dataArray = {
        email: userDetails.email,
        number: userDetails.number,
        paymentMethod: userDetails.paymentMethod,
        USD: userDetails.USD,
        PKR: userDetails.PKR,
        Referral: userDetails.Referral,
        OrderID: orderId.toString(),
        OriginalAmount: initialValue,
        PayerInfo: details,
      };

      var data = `?data=${JSON.stringify(dataArray)}`;
      axios
        .get(`${backendAddr}/register${data}`)
        .then((response) => {
          setIsLoading(false);
          
          console.info(response);
          if (response.data === "OK")
            setIfSuccess(true);
          else
            setErrorMessage('An error was occured while updating the local database, kindly and responsibly contact the owner');
        })
        .catch((err) => {
          setErrorMessage('An error was occured while updating the local database, kindly and responsibly contact the owner');
        });
    });
  };

  const onError = (data, actions) => {
    setErrorMessage("An error occured with your payment");
  };

  useEffect(() => {
    over_amount = initialValue;
  }, [initialValue]);

  const updateAmount = (event) => {
    var _amount = parseInt(event.target.value);
    var _c = isNaN(_amount) ? 0 : _amount;

    var _gross = returnGross(_c);
    setinitialValue(_c);

    setInsideState("PKR", _gross.PKR);
    setInsideState("USD", _gross.USD);
  };

  const updateUserInfo = (event) => {
    const { value, name } = event.target;
    setInsideState(name, value);
  };

  const setInsideState = (_name, _value) => {
    setUserDetails((prev) => {
      return { ...prev, [_name]: _value };
    });
  };

  const VerifyButton = () => {
    setIsLoading(true);
    if (over_amount > 9.99) {
      if (userDetails.number.length > 10) {
        if (
          userDetails.number.startsWith("+923") ||
          userDetails.number.startsWith("03")
        ) {
          if (userDetails.email.length > 1 && userDetails.email.includes("@")) {
            setShow(true);
          } else {
            setErrorMessage("Invalid E-mail");
          }
        } else {
          setErrorMessage("Invalid Phone number");
        }
      } else {
        setErrorMessage("Incomplete phone number");
      }
    } else {
      setErrorMessage("Minimum amount to exchange is 10 USD");
    }
    setIsLoading(false);
  }

  const resetError = () => {
    setErrorMessage("");
    setIfSuccess(false);
  };

  return (
    <section
      id="exchange"
      className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}
    >
      <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient" />
      <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
        <span className={styles.heading2}>
          <h1 className={styles.heading2}>Dollar Exchange</h1>
          <p className={styles.paragraph}>Exchange USD with PKR</p>
          <p className={`${styles.paragraph} mt-2`}>
            Note: Please fill all the information accordingly to keep track of
            your order.
          </p>
          <p className={`${styles.paragraph} mt-2`}>
            Transaction Fee (PayPal): <b>4.4%</b>.
          </p>
          {refLink !== "UNDEFINED" ? (
            <p className={`${styles.paragraph} mt-2`}>
              Reffered by: <b>{refLink}</b>
              <br />
              Bonus: <b>+2 PKR per USD</b>
              <br />
              Overall Bonus: <b>{initialValue * CURRENCY.REFBONUS} PKR</b>
            </p>
          ) : (
            ""
          )}
          
          <p className={`${styles.paragraph} mt-2`}>
            Net Amount (after tax): <span className={styles.highlightText}>{
              refLink !== 'UNDEFINED' ? (
                (parseFloat(userDetails.PKR) + CURRENCY.REFBONUS).toLocaleString()
              ) : (
                parseFloat(userDetails.PKR).toLocaleString()
              )
            } PKR</span>.
          </p>
        </span>
        <div className="w-full md:mt-0 mt-6">
          <div className={`${styles.paragraph} text-left max-w-[450px]`}>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <>
                {errorMessage !== "" ? (
                  <>
                    <div className="w-full justify-center items-center text-center">
                      <h2 className={styles.heading2}>
                        Oh No! <br />
                      </h2>
                      <span className={styles.paragraph}>
                        An error has occured
                      </span>
                    </div>
                    <div className="w-full flex justify-center items-center">
                      <img
                        src={confused}
                        alt="error"
                        className="rounded-[50%] h-[300px] w-[300px]"
                      />
                    </div>
                    <div className="w-full flex justify-center items-center mt-5 text-secondary">
                      {errorMessage}
                    </div>
                    <span onClick={resetError}>
                      <Button text="Retry!" styles="w-full mt-5" />
                    </span>
                  </>
                ) : (
                  <>
                    {ifSuccess === true ? (
                      <>
                        <div className="w-full flex justify-center items-center">
                          <img
                            src={success}
                            alt="success"
                            className="rounded-[50%] h-[300px] w-[300px]"
                          />
                        </div>
                        <div className="w-full justify-center items-center text-center text-secondary">
                          Your transaction was successful!
                        </div>
                      </>
                    ) : (
                      <>
                        <label className="mt-2">
                          Amount you want to exchange:
                          <input
                            type="text"
                            className={styles.inputField}
                            onChange={(e) => updateAmount(e)}
                            value={initialValue}
                          />
                        </label>

                        <label className="mt-2">
                          Payment Processor:
                          <select
                            name="paymentMethod"
                            className={styles.inputField}
                            onChange={updateUserInfo}
                            value={userDetails.paymentMethod}
                          >
                            <option value="JazzCash">JazzCash</option>
                            <option value="Easypaisa">EasyPaisa</option>
                          </select>
                        </label>

                        <label className="mt-2">
                          Account Detail:
                          <input
                            type="text"
                            className={styles.inputField}
                            name="number"
                            onChange={updateUserInfo}
                            placeholder="03xx-xxxxxxx"
                          />
                        </label>

                        <label className="mt-2">
                          E-mail:
                          <input
                            type="email"
                            className={styles.inputField}
                            name="email"
                            onChange={updateUserInfo}
                            placeholder="something@something.com"
                          />
                        </label>
                        {Show === true ? (
                          <PayPalScriptProvider
                            options={{
                              "client-id":
                                "AQ8RUsectsEAW_XYmf6sYYQQLvhICEyOcw2Zcu-shc-vpu4ojWt8wus0iP3KdFr3XVVpafLh2Jf6Q0gt",
                              "disable-funding": "credit",
                            }}
                          >
                            <PayPalButtons
                              style={{ layout: "vertical" }}
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            />
                          </PayPalScriptProvider>
                        ) : (
                          <span onClick={VerifyButton}>
                            <Button text="Verify" styles="w-full" />
                          </span>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Exchange;
