import React from 'react'
import { Stats, Business, Billing, Exchange, Testimonials, CTA } from '../components';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const params = useParams();
  console.log(JSON.stringify(params));

  axios.get('/api/hello').then((response) => {
    console.log(response.data);
  }).catch((error) => {
    console.log(error);
    console.log('Error detected...');
  })

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