import React from 'react'
import { MdOutlinePhone } from "react-icons/md";
import './Footer.scss'
import { FaInstagram } from "react-icons/fa";
import { RiContactsBookFill } from "react-icons/ri";
import { RiContactsBookLine } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaEarthAmericas } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer>
            <div className="upBox">
                <div className="box">
                    <div className="oneBox">
                        <span></span>
                        <p>AMINA</p>
                    </div>
                    <div className="infoBox">
                        <MdOutlinePhone />
                        <span>(+994 12) 564 08 09</span>
                    </div>
                    <div className="infoBox">
                        <MdOutlinePhone />
                        <span>(+994) 50 310 50 19</span>
                    </div>
                    <div className="infoBox">
                        <MdOutlineMail />
                        <span>office@amina-azif.az</span>
                    </div>
                    <div className="infoBox">
                        <FaEarthAmericas />
                        <span>amina-azif.az</span>
                    </div>

                </div>
                <div className="contactBox">
                    <div className="oneBox">
                        <span></span>
                        <p>Sosial şəbəkələrimiz</p>
                    </div>
                    <Link to={"https://www.facebook.com/profile.php?id=100064944864466"}>
                        <div className="socialMedia">
                            <FaFacebookF />
                        </div>
                    </Link>
                    <Link to={"https://www.instagram.com/aminaazif.az/"}>
                        <div className="socialMedia">
                            <FaInstagram />
                        </div>
                    </Link>
                </div>
            </div>
            <div className="downBox">
                <div className="coptRightBox">Copyright by 2023. Bütün hüquqlar qorunur.</div>
                <div className="pagesBox">Web Site creeted Af104 Group <a href="https://www.instagram.com/ali.ismayil_/" target='_blank'><RiContactsBookFill /></a><a href="https://www.instagram.com/iszd.n/" target='_blank'><RiContactsBookLine /></a></div>
            </div>
        </footer>
    )
}

export default Footer