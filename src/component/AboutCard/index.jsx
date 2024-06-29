import React, { useState } from 'react'
import "./index.scss"
import axios from 'axios'

const AboutCard = (product, style) => {

  return (
    <div className='about-card'>

      <div className="image"

      >
        <img src={product.image} alt=""
          style={{ height: `${style ? "370px" : ""}` }}
        />
      </div>
      <div className="content">
        <h4>{product.title}</h4>
        <div className='line'></div>
        <p>
          {product.position}
        </p>
      </div>
    </div>
  )
}

export default AboutCard
