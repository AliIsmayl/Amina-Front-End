import React, { useEffect, useState } from 'react'
import './Calendar.scss'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from 'swiper/modules';
import { Pagination } from 'swiper/modules'
import 'swiper/css/pagination';
import axios from 'axios';

function Calendar() {
    const [calendar, setCalendar] = useState([])
    async function getData() {
        const res = await axios.get('https://amina-back-end.onrender.com/yaris')
        setCalendar(res.data)

    }
    useEffect(() => {
        getData()
    }, [])

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };
    return (
        <section id='calendar'>
            <Swiper className="mySwiper"
                modules={[Autoplay, Pagination]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={pagination}
                loop={true}
            >
                {
                    calendar && calendar.map((item) =>
                    (
                        <SwiperSlide>
                            <div className="leftBox">
                                <img src={item.image} alt="" />
                            </div>
                            <div className="rightBox">
                                <div className="textBox">
                                    <p>{item.time}</p>
                                    <span>{item.title}</span>
                                </div>
                            </div>
                        </SwiperSlide>))
                }

            </Swiper>

        </section>
    )
}

export default Calendar