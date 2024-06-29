import React, { useEffect, useState } from 'react'
import "./index.scss"
import AboutCard from '../../../component/AboutCard'
import axios from 'axios'

const OurRehberlik = () => {
  const [data, setData] = useState([])

  async function getData() {
    const res = await axios.get("https://amina-back-end.onrender.com/rehberlik")
    setData(res.data)
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div id='about-us'>
      <div className="tittle">
        <h3 style={{color:"#CCB892"}}>Rəhbərlik</h3>
      </div>
      <div className="container">
        <div className="normalBox">
          {
            data && data.map(item =>
              <div className='peopleBox'>
                {/* <AboutCard {...item} /> */}
                <div className="frontTextBox">
                  <span>{item.title}</span>
                  <p>{item.position}</p>
                </div>
                <img src={item.image} alt="" />
              </div>
            )
          }
        </div>
      </div>
    </div>


  )
}

export default OurRehberlik
