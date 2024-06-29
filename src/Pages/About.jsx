import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import OurHistory from '../Components/AboutComponents/OurHistory';
import NotMean from '../Components/NotMean/NotMean';
import About from '../Components/AboutComponents/About';
import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
  return (
    <>
    <Helmet>
        <title>Haqqimizda</title>
        </Helmet>
<NotMean/>
      <About/>
    </>
  )
}

export default AboutPage
