import React from 'react'
import Inform from '../Components/HomePageComponents/InformComponents/Inform'
import Medal from '../Components/HomePageComponents/MedalComponents/Medal'
import Partner from '../Components/HomePageComponents/PartnerComponents/Partner'
import Header from '../Components/HomePageComponents/Header/Header'
import NotMean from '../Components/NotMean/NotMean'
import Calendar from '../Components/HomePageComponents/Calendar/Calendar'
import { Helmet } from 'react-helmet-async'

function HomePage() {
  return (
    <>
    <Helmet>
        <title>Ana səhifə</title>
        </Helmet>
    <NotMean/>
      <Header />
      <Inform />
      <Medal />
      <Calendar/>
      <Partner />
    </>
  )
}

export default HomePage