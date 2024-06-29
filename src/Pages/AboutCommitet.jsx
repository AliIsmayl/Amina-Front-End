import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import OurCommitet from '../Components/AboutComponents/OurKomitet';
import NotMean from '../Components/NotMean/NotMean';
import { Helmet } from 'react-helmet-async';
function AboutCommitet() {
  return (
    <>
    <Helmet>
        <title>İcraiyyə komitəsi</title>
        </Helmet>
<NotMean/>
<OurCommitet/>
    </>
  )
}

export default AboutCommitet