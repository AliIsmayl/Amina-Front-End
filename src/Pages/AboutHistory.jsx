import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import OurHistory from '../Components/AboutComponents/OurHistory';
import NotMean from '../Components/NotMean/NotMean';
import { Helmet } from 'react-helmet-async';

const AboutHistory = () => {
  return (
    <>
    <Helmet>
        <title>Tariximiz</title>
        </Helmet>
<NotMean/>
      <OurHistory/>
    </>
  )
}

export default AboutHistory
