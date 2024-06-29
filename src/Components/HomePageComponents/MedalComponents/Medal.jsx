import React, { useEffect, useRef, useState } from 'react'
import './Medal.scss'
import axios from 'axios'
import MedalSekil from '../../../Image/Medal-sekil.png'
function Medal() {
    const [count, setCount] = useState(0);
    const containerRef = useRef(null);
    const [medal, setmedal] = useState([])

    async function getMedal() {
        const res = await axios.get("https://amina-back-end.onrender.com/medal")
        setmedal(res.data)
    }

    useEffect(() => {
        getMedal()
    }, [])

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (count < 85) {
    //             setCount(prevCount => prevCount + 1);
    //         } else {
    //             clearInterval(interval);
    //         }
    //     }, 1); // Saniyede bir arttır

    //     return () => clearInterval(interval);
    // }, [count]);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (containerRef.current) {
    //             const rect = containerRef.current.getBoundingClientRect();
    //             const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    //             if (isVisible) {
    //                 setCount(0); // Sayacı sıfırla ve yeniden başlat
    //             }
    //         }
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);
    return (
        <section id='medalComponent'>
            <div className="upBox">
                <div className="leftBox">
                    <img src={MedalSekil} alt="" />
                </div>
                <div className="rightBox">
                    <div className="text">
                        <div className="line"></div>
                        <span>Qazanılan Medallar</span>
                    </div>
                    <p><span>Azərbaycan yığma komandasının</span> müxtəlif yaş qrupları üzrə beynalxalq turnirlərdə qazandığı medallar sayı</p>
                </div>
            </div>
            {
                medal && medal.map((item, index) => (
                    <div className="downBox" ref={containerRef}>
                        <div className="medalCartBox">
                            <p>{item.qold}</p>
                            <div className="line"></div>
                            <span>Qizil</span>
                        </div>
                        <div className="medalCartBox">
                            <p>{item.silver}</p>
                            <div className="line"></div>
                            <span>Gümüş</span>
                        </div>
                        <div className="medalCartBox">
                            <p>{item.bronz}</p>
                            <div className="line"></div>
                            <span>Bürünc</span>
                        </div>
                        <div className="medalCartBox">
                        <p>{item.qold + item.silver + item.bronz}</p>
                            <div className="line"></div>
                            <span>Hamısı</span>
                        </div>
                    </div>
                ))
            }
        </section>
    )
}

export default Medal