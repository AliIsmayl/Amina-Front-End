import React, { useEffect, useState } from "react";
import "./index.scss";
import { PiMapPinAreaLight } from "react-icons/pi";
import { PiPhoneCallLight } from "react-icons/pi";  
import { GiMailbox } from "react-icons/gi";
import axios from "axios";

const ContactWithUs = () => {
  const [data, setData] = useState([])

  async function getData() {
    const res=await axios.get("https://amina-back-end.onrender.com/contact")
    setData(res.data)
  }
  useEffect(() => {
    getData()
  }, [])
  
  return (
    <div className="contact-us">
      <div className="container">
        <div className="row-contact">
            <div className="cont">
              <h3>
                <span>Bizimlə</span> əlaqə
              </h3>
            </div>
          
            <div className="address">
              <div className="addr">
                <div className="image">
                  <PiMapPinAreaLight />
                </div> 
                  <div className="content">
                  <h3>Ünvanımız</h3>
                {
                  data && data.map(item=>
                 
                  <p>{item.location}</p>
               
                  )
                }
               </div>  
              </div>
              <div className="addr">
                <div className="image">
                <PiPhoneCallLight />
                </div>
                <div className="content">
                  <h3>Tel:</h3>
                  {
                  data && data.map(item=>
                 
                  <p>{item.number}</p>
               
                  )
                }
                </div>
              </div>
              <div className="addr">
                <div className="image">
                <GiMailbox />
                </div>
                <div className="content">
                  <h3>Email</h3>
                  {
                  data && data.map(item=>
                 
                  <p>{item.email}</p>
               
                  )
                }
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactWithUs;
