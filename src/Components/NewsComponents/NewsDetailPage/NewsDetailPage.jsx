import React, { useEffect, useState } from 'react'
import './NewsDetailPage.scss'
import { CgTime } from "react-icons/cg";
import { HiMiniUserCircle } from "react-icons/hi2";
import NotMean from '../../NotMean/NotMean';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

function NewsDetailPage() {
    const { name } = useParams()

    const [NewsDetail, setNewsDetail] = useState()

    async function getDetail() {
        const res = await axios.get(`https://amina-back-end.onrender.com/xeberler/${name}`)
        setNewsDetail(res.data)
        console.log(res.data);
    }
    useEffect(() => {
        getDetail()
    }, [name])

    const formatDate = (dateString) => {
        const options = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", options);
    };
    return (
        <>


            <NotMean />
            {
                NewsDetail ?
                    <>

                        <div className='newsDetailPage'>
                            <div className="upBox">
                                <div className="imageBox">
                                    <img src={NewsDetail.image1} alt="" />
                                </div>
                                <div className="textBox">
                                    <div className="nothing">
                                        <span></span>
                                        <p>Blog</p>
                                    </div>
                                    <h1>{NewsDetail.title}</h1>
                                    <div className='littleInform'>
                                        <div className="littleBox">
                                            <CgTime />
                                            <p>{formatDate(NewsDetail.createdAt)}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="downBox">
                                <img src={NewsDetail.image1} className='image1' alt="" />
                                <img src={NewsDetail.image2} className='image2' alt="" />
                                <img src={NewsDetail.image3} className='image3' alt="" />
                                <img src={NewsDetail.image4} className='image4' alt="" />
                            </div>
                        </div>
                    </>
                    : ""
            }
        </>
    )
}

export default NewsDetailPage