import React from 'react'
import './Partner.scss'
import { Link } from 'react-router-dom'

function Partner() {
    return (
        <section id='partnerComponent'>
            <div className="upBox">
                <Link to={"https://president.az/"} className="partnerBox">
                    <div className="imgBox">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyPtmI2RlITit30tdHuUqW0NhFwLxhYU8LKw&s" alt="" />
                    </div>
                    <div className="text">
                        <p>Ilham Əliyev</p>
                        <span>Azerbaycan Respublikasının Prezidenti</span>
                    </div>
                </Link>
                <Link to={"https://heydar-aliyev-foundation.org/az"} className="partnerBox">
                    <div className="imgBox">
                        <img src="https://www.yeniazerbaycan.com/yukle/shekil/2024_05_09_169962_fond-logo.jpeg" alt="" />
                    </div>
                    <div className="text">
                        <p>Heydər Əliyev fondu</p>
                        {/* <span>Azerbaycan Respublikasının Prezidenti</span> */}
                    </div>
                </Link>
                {/* <div className="partner2Box">
                    <p>Heydər Əliyev fondu</p>
                    <img src="https://www.yeniazerbaycan.com/yukle/shekil/2024_05_09_169962_fond-logo.jpeg" alt="" />
                </div> */}
                <Link to={"https://mehriban-aliyeva.az/"} className="partnerBox">
                    <div className="imgBox">
                        <img className='fondImage' src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Mehriban_Aliyeva_%28portrait_in_2023%29.jpg" alt="" />
                    </div>
                    <div className="text">
                        <p>Mehriban Əliyeva</p>
                        <span>Azerbaycan Respublikasının Birinci vitse-prezidenti</span>
                    </div>
                </Link>
            </div>
            <div className="middleBox"><p>Tərəfdaşlarımız</p></div>
            <div className="downBox">
                <Link to={"https://mys.gov.az/"} className="partnerBox">
                    <img style={{maxWidth:"150px"}} src="https://mys.gov.az/assets/img/logo/logo.svg" alt="" />
                </Link>
                <Link to={"https://www.olympic.az/"} className="partnerBox">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAT6UEzwiUTUL2PQPHt3aZQTjx9JKsOOrfYQ&s" alt="" />
                </Link>
                <Link to={"https://uww.org/"} className="partnerBox">
                    <img src="https://thumbor.prod.vidiocdn.com/530UT_6ZOLanNLcFYT8NzGgA400=/filters:strip_icc():quality(70)/vidio-web-prod-user/uploads/user/avatar/142086897/logouww-647935b0699bcd20.jpeg" alt="" />
                </Link>
            </div>
        </section>
    )
}

export default Partner