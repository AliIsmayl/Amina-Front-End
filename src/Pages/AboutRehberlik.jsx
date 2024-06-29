import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import OurRehberlik from '../Components/AboutComponents/Rehberlik';
import NotMean from '../Components/NotMean/NotMean';
import { Helmet } from 'react-helmet-async';

const AboutRehberlik = () => {
  return (
    <>
      <Helmet>
        <title>rehberlik</title>
        </Helmet>
      <NotMean />
      <OurRehberlik />
    </>
  )
}

export default AboutRehberlik
