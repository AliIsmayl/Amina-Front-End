import React, { useState } from 'react'
import "./index.scss"
import emailjs from '@emailjs/browser';


const SendMeassage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')


  function handleSubmit(e) {
    e.preventDefault()

    const serviceId = "service_twh1kwt"
    const templateId = "template_ms39wbr"
    const publicKey = "wFhQhB9eGsSUH82P5"

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "AMINA",
      message: message

    }

    emailjs.send(serviceId, templateId, templateParams, publicKey).then((response) => {
      setName('')
      setEmail('')
      setMessage('')
      alert("okey")
    })
      .catch((error) => {
        alert("problem")
      })

  }
  return (
    <div className='send-message'>
      <div className="container">
        <form id="contactForm" onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              name="firstname"
              type="text"
              placeholder="Ad*"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <input
              name="email"
              type="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <textarea
              name="message"
              placeholder="Müraciətin mətni..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Mesajınızı göndərin</button>
        </form>

      </div>

    </div>
  )
}

export default SendMeassage
