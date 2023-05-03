import React, { useState, useEffect } from "react";
import styles from "../style";
import axios from "axios";

const Stats = () => {
  const [statsDetails, setStatsDetails] = useState({
    customers: null,
    transactions: null,
    totalTransactions: null,
  });

  
  const backendAddr = import.meta.env.VITE_WEB_ADDR;

  useEffect(() => {axios
    .get(`${backendAddr}/stats`)
    .then((response) => {
      if (response.data.data) {
        setStatsDetails({
          customers: response.data.data.customers,
          transactions: response.data.data.transactions,
          totalTransactions: response.data.data.totalTransactions
        });
      }
    })
    .catch((err) => {
      console.log("Error while updating the stats..");
    });
  }, []);

  return (
    <>
      <div className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}>
        <div className={`flex-1 flex justify-start items-center flex-row m-3`}>
          <h4 className="font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-white">
            {statsDetails.customers !== null ? (
              statsDetails.customers
            ) : (
              <span>loading..</span>
            )}
          </h4>
          <p className="font-poppins font-normal xs:text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-gradient uppercase ml-3">
            Satisfied Customers
          </p>
        </div>

        <div className={`flex-1 flex justify-start items-center flex-row m-3`}>
          <h4 className="font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-white">
            {statsDetails.transactions !== null ? (
              statsDetails.transactions
            ) : (
              <span>loading..</span>
            )}
          </h4>
          <p className="font-poppins font-normal xs:text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-gradient uppercase ml-3">
            Transaction
          </p>
        </div>

        <div className={`flex-1 flex justify-start items-center flex-row m-3`}>
          <h4 className="font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-white">
          ${statsDetails.totalTransactions !== null ? (
              statsDetails.totalTransactions
            ) : (
              <span>loading..</span>
            )}
          </h4>
          <p className="font-poppins font-normal xs:text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-gradient uppercase ml-3">
            Transactions <small>Amount</small>
          </p>
        </div>
      </div>
    </>
  );
};

export default Stats;
