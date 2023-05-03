import React from 'react'
import { Stats, Business, Billing, Exchange, Testimonials, CTA } from '../components';
import { useParams } from 'react-router-dom';
import Contact from '../components/Contact';

const Home = () => {
  const params = useParams();
  return (
    <>
        <Stats />
        <Business /> 
        <Billing />
        
        <Exchange refLink={ params.ref !== undefined ? params.ref : 'UNDEFINED' }/>
        <Contact />
        <Testimonials /> 
        
        <CTA /> 
    </>
  )
}

export default Home