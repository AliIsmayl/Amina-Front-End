import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Link } from 'react-router-dom';
import './RespNavbar.scss';

function RespNavbar() {
    const [openAccordionIndex, setOpenAccordionIndex] = useState(false);
    const [openSecondAccordionIndex, setOpenSecondAccordionIndex] = useState(false);
    const [openThirdAccordionIndex, setOpenThirdAccordionIndex] = useState(false);
    const [openLastAccordionIndex, setOpenLastAccordionIndex] = useState(false);
    const [openChildAccordionIndex, setOpenChildAccordionIndex] = useState(false);
    const [navbarText, setnavbarText] = useState([])

    async function TextGetData() {
        const res = await axios.get("https://amina-back-end.onrender.com/idmanNovleri")
        setnavbarText(res.data)
    }
    const handleOpenAccordion = () => {
        setOpenAccordionIndex(!openAccordionIndex)
        setOpenSecondAccordionIndex(false)
        setOpenThirdAccordionIndex(false)
        setOpenLastAccordionIndex(false)


    };
    const handleSecondOpenAccordion = () => {
        setOpenSecondAccordionIndex(!openSecondAccordionIndex)
        setOpenAccordionIndex(false)
        setOpenThirdAccordionIndex(false)
        setOpenLastAccordionIndex(false)

    };
    const handleThirdOpenAccordion = () => {
        setOpenThirdAccordionIndex(!openThirdAccordionIndex)
        setOpenAccordionIndex(false)
        setOpenSecondAccordionIndex(false)
        setOpenLastAccordionIndex(false)

    };
    const handleLastOpenAccordion = () => {
        setOpenLastAccordionIndex(!openLastAccordionIndex)
        setOpenAccordionIndex(false)
        setOpenSecondAccordionIndex(false)
        setOpenThirdAccordionIndex(false)

    };

    const handleOpenChildAccordion = () => {
        setOpenChildAccordionIndex(!openChildAccordionIndex)
    };
    useEffect(() => {
        TextGetData()
    }, [])
    return (
        <ul className='accordion1'>
            <Link className='link' to={''}>
                <li className='accordionFirstLi'>
                    <p className='text1'>Ana Səhifə</p>
                </li>
            </Link>
            <Link className='link' to={''}>
                <li className='accordionFirstLi'>
                    <p className='text1' onClick={handleSecondOpenAccordion}>Haqqımızda
                        <span className='arrowBox' >
                            {
                                openSecondAccordionIndex ? <IoMdArrowDropup /> : <IoMdArrowDropdown />
                            }
                        </span></p>
                    <ul className={`text2 ${openSecondAccordionIndex ? 'openAccordion' : ''}`}>
                        <li>
                            <Link className='pageLink' to={`/tariximiz`} >
                                Tariximiz
                            </Link>
                        </li>
                        <li>
                            <Link className='pageLink' to={`/rehberlik`} >
                                Rəhbərlik
                            </Link>
                        </li>
                        <li>
                            <Link className='pageLink' to={`/icraiyye-comitesi`} >
                                İcraiyyə Komitəsi
                            </Link>
                        </li>
                    </ul>

                </li>
            </Link>
            <Link className='link' to={''}>
                <li className='accordionFirstLi'>
                    <p className='text1' onClick={handleThirdOpenAccordion}>Milli komandalar
                        <span className='arrowBox' >
                            {
                                openThirdAccordionIndex ? <IoMdArrowDropup /> : <IoMdArrowDropdown />
                            }
                        </span></p>
                    <ul className={`text2 ${openThirdAccordionIndex ? 'openAccordion' : ''}`}>
                        <li>
                            <Link className='pageLink' to={`/mesqciler`} >
                                Məşqçilər
                            </Link>
                        </li>
                        <li>
                            <Link className='pageLink' to={`/idmancilar`} >
                                İdmançılar
                            </Link>
                        </li>
                        <li>
                            <Link className='pageLink' to={`/hakimler`} >
                                Hakimlər
                            </Link>
                        </li>
                    </ul>
                </li>
            </Link>
            <Link className='link' to={''}>
                <li className='accordionFirstLi' >

                    <p className='text1' onClick={handleOpenAccordion}>İdman növləri <span className='arrowBox' >
                        {
                            openAccordionIndex ? <IoMdArrowDropup /> : <IoMdArrowDropdown />
                        }
                    </span></p>
                    <ul className={`text2 ${openAccordionIndex ? 'openAccordion' : ''}`}>
                        {navbarText.map((item, index) => (
                            <li key={index}>
                                <Link className='pageLink' to={`/page/${item.name}`} onClick={handleOpenChildAccordion}>
                                    {item.tittle}
                                </Link>

                                {
                                    item.Alt.length > 0 ? <IoMdArrowDropup /> : ""
                                }

                                <ul className={`altText ${openChildAccordionIndex ? "openSecondAccordion" : ""}`}>
                                    {item.Alt.map((altItem, index) =>
                                        <li key={index}>
                                            <Link className='pageLink' to={`/page/${altItem.name}`}>
                                                {altItem.tittle}
                                            </Link>
                                        </li>)}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </li>
            </Link>
            <Link className='link' to={'/news'}>
                <li className='accordionFirstLi'>
                    <p className='text1'>Xəbər</p>
                </li>
            </Link>
            <Link className='link' to={''}>
                <li className='accordionFirstLi'>
                    <p className='text1' onClick={handleLastOpenAccordion}>Media
                        <span className='arrowBox' >
                            {
                                openLastAccordionIndex ? <IoMdArrowDropup /> : <IoMdArrowDropdown />
                            }
                        </span></p>
                    <ul className={`text2 ${openLastAccordionIndex ? 'openAccordion' : ''}`}>
                        <li>
                            <Link className='pageLink' to={`/photo`} >
                                Foto
                            </Link>
                        </li>
                        <li>
                            <Link className='pageLink' to={`/video`} >
                                Video
                            </Link>
                        </li>
                    </ul>
                </li>
            </Link>
            <Link className='link' to={'/contact'}>
                <li className='accordionFirstLi'>
                    <p className='text1'>Əlaqə</p>
                </li>
            </Link>
        </ul>
    );
}

export default RespNavbar;
