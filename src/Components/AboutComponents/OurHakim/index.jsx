import React, { useEffect, useState } from 'react'
import "./index.scss"
import AboutCard from '../../../component/AboutCard'
import axios from 'axios'
import NotMean from '../../NotMean/NotMean'
import { Helmet } from 'react-helmet-async'

const OurHakim = () => {

  const [data, setData] = useState([])

  async function getData() {
    const res = await axios.get("https://amina-back-end.onrender.com/hakim")
    setData(res.data)
  }
  useEffect(() => {
    getData()
  }, [])


  return (
    <>
    <Helmet>
        <title>Hakimlər</title>
        </Helmet>
    <NotMean/>
        <div id='about-us'>
      <div className="tittle-icra">
        <h3 style={{color:"#CCB892"}}>Hakimlər</h3>
      </div>
      <div className="container">
          <div className="normalBox">
            {
              data && data.map(item =>
                <div className='peopleBox'>
                  <div className="frontTextBox">
                    <span>{item.position}</span>
                    <p>{item.title}</p>
                  </div>
                  <img src={item.image} alt="" />
                </div>
              )
            }
          </div>
        </div>
     
    </div>
    </>



  )
}

export default OurHakim
