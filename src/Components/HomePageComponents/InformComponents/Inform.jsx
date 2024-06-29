import React, { useEffect, useState } from 'react'
import './Inform.scss'
import photo from '../../../Image/cudo-7-380x280.jpg'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Inform() {
    const [NewsCart, setNewsCart] = useState([])
    // const [newState, setNewState] = useState([])
    async function GetNewsData() {
        const res = await axios.get("https://amina-back-end.onrender.com/xeberler")
        setNewsCart(res.data)
    }



    useEffect(() => {
        GetNewsData()
    }, [])
    return (
        <section id='informComponent'>
            {
                NewsCart && NewsCart
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 4)
                    .map((item, index) => (
                        <div className="informCardBox" key={index}>
                            <div className="imageBox"> <img src={item.image} alt="" /></div>
                            <div className="textBox">
                                <p>{item.title}</p>
                                <div className="line"></div>
                                <Link to={`news/${item.name}`}>
                                    <button>Daha Ətraflı</button>
                                </Link>
                            </div>
                        </div>
                    ))
            }
        </section>
    )
}

export default Inform