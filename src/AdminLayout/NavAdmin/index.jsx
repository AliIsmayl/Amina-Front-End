import React, { useState } from 'react'
import "./index.scss"
import { NavLink } from 'react-router-dom'
import { TbUsers } from "react-icons/tb";
import { IoSparklesOutline } from "react-icons/io5";
import { MdInsertEmoticon } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { MdOutlineSpa } from "react-icons/md";
import { LiaMedalSolid } from "react-icons/lia";
import { AiOutlineComment } from "react-icons/ai";
import { PiNewspaperClipping } from "react-icons/pi";
import { MdSportsKabaddi } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { FaRegImages } from "react-icons/fa";
import { IoLogoReddit } from "react-icons/io";
import { TfiGallery } from "react-icons/tfi";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { BsPatchQuestion } from "react-icons/bs";
import { RiTeamLine } from "react-icons/ri";
import { TiContacts } from "react-icons/ti";
import { TbBrandBooking } from "react-icons/tb";
import { PiGithubLogoDuotone } from "react-icons/pi";
import { IoCalendarClearOutline } from "react-icons/io5";

const NavAdmin = () => {



    return (
        <div id='nav-admin' className="darkMode">

            <div className="navigation">
                <ul>

                    <li>
                    </li>
                    <li>
                        <NavLink to="/admin/idmanNovleri"><MdSportsKabaddi />Idman Novleri</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/idmancilar"><TbUsers />Idmançılar</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/hakim"><TbUsers />Hakimlər</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/komitet"><TbUsers />İcraiyyə Komiteti</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/rehberlik"><TbUsers />Rəhbərlik</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/mesqci"><TbUsers />Məşqçilər</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/xeberler"><PiNewspaperClipping />Xəbərlər</NavLink>
                    </li>

                    <li>
                        <NavLink to="/admin/video"><IoVideocamOutline />Videolar</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/foto"><FaRegImages />Şəkillər</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/medal"><LiaMedalSolid />Medallar</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/contact"><TiContacts />Contact</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/yaris"><IoCalendarClearOutline />Calendar</NavLink>
                    </li>


                </ul>
            </div>
        </div>
    )
}

export default NavAdmin