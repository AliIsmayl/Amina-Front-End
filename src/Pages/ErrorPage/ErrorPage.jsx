import React from 'react'
import './ErrorPage.scss'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <section id='errorPage'>
       <div>
       <h4>Bu cür səhifə mövcud deil</h4>
       <p><Link to={"/"} className='link'>Əsas Səhifə</Link>'yə keçid et...</p>
       </div>
    </section>
  )
}

export default ErrorPage