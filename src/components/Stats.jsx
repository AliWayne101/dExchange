import React, { useState } from 'react'
import { backendAddr } from '../constants';
import styles from '../style';
import axios from 'axios';

const Stats = () => {

  const [customer, setCustomer] = useState('Refreshing');
  const [transactions, setTransactions] = useState('Refreshing');
  const [totalTransactions, setTotalTransactions] = useState('Refreshing');
  
  axios.get(`${backendAddr}/stats`)
  .then(response => {
    console.log(response.data);
    const refData = response.data.split('#');
    setCustomer(refData[0]);
    setTransactions(refData[1]);
    setTotalTransactions(refData[2]);
  }).catch(err => {
    console.log(err);
    console.log("Unable to fetch stats..");
  });


  return (
    <>
    <div className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}>
      <div className={`flex-1 flex justify-start items-center flex-row m-3`}>
        <h4 className='font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-white'>{customer}</h4>
        <p className='font-poppins font-normal xs:text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-gradient uppercase ml-3'>Satisfied Customers</p>
      </div>

      <div className={`flex-1 flex justify-start items-center flex-row m-3`}>
        <h4 className='font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-white'>{transactions}</h4>
        <p className='font-poppins font-normal xs:text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-gradient uppercase ml-3'>Overall Transactions</p>
      </div>

      <div className={`flex-1 flex justify-start items-center flex-row m-3`}>
        <h4 className='font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-white'>{totalTransactions}</h4>
        <p className='font-poppins font-normal xs:text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-gradient uppercase ml-3'>Transactions</p>
      </div>
    </div>
    </>
  )
}

export default Stats