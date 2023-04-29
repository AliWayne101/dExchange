import React from 'react'
import { Stats, Business, Billing, Exchange, Testimonials, CTA } from '../components';
import { useParams } from 'react-router-dom';

const Home = () => {
  const params = useParams();
  console.log(JSON.stringify(params));
  return (
    <>
        <Stats />
        <Business /> 
        <Billing />
        
        <Exchange refLink={ params.ref !== undefined ? params.ref : 'UNDEFINED' }/>
        <Testimonials /> 
        
        <CTA /> 
    </>
  )
}

export default Home