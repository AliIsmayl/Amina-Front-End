import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import Logo from '../../Image/Amina-35.png'
import { navbarData } from '../../utils/NavbarData'
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import RespNavbar from './RespNavbar/RespNavbar';
import { Link, NavLink } from "react-router-dom";
import axios from 'axios'

function Navbar() {
  const [openNavbar, setopenNavbar] = useState(false)
  const [hiddenNavbar, sethiddenNavbar] = useState(true)
  const [navbarText, setnavbarText] = useState([])

  async function TextGetData() {
    const res = await axios.get("https://amina-back-end.onrender.com/idmanNovleri")
    setnavbarText(res.data)
  }

  function handleOpenNavbar() {
    setopenNavbar(!openNavbar)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        sethiddenNavbar(false);
      } else {
        sethiddenNavbar(true);
      }
    };

    const mediaQuery = window.matchMedia('(min-width: 321px)');

    if (mediaQuery.matches) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (mediaQuery.matches) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    TextGetData()
  }, [])

  return (
    <nav>
      {
        hiddenNavbar && <div className="upBox">
          <div className="menuBox" onClick={handleOpenNavbar}>
            <AiOutlineMenu />
          </div>
          <img src={Logo} alt="" />
        </div>
      }

      <div className="downBox">
        <ul>
          <div>
            <li className='pageText'><NavLink className='link' to={"/"}><span></span> Ana Səhifə</NavLink></li>
          </div>
          <div>
            <li className='pageText'><NavLink className='link' to={"/haqqimizda"}><span></span> Haqqımızda
              <div className="subMenu">
                <Link className='pageLink' to={'/tariximiz'}>
                  <li><span></span>Tariximiz</li>
                </Link>
                <Link className='pageLink' to={'/rehberlik'}>
                  <li><span></span>Rəhbərlik</li>
                </Link>
                <Link className='pageLink' to={'/icraiyye-comitesi'}>
                  <li><span></span>İcraiyə Komitəsi</li>
                </Link>
              </div>
            </NavLink></li>
          </div>
          <div>
            <li className='pageText'><p className='link' to={"#"}><span></span> Milli komandalar
              <div className="subMenu">
                <Link className='pageLink' to={'/mesqciler'}>
                  <li><span></span>Məşqçilər</li>
                </Link>
                <Link className='pageLink' to={'/idmancilar'}>
                  <li><span></span>İdmançılar</li>
                </Link>
                <Link className='pageLink' to={'/hakimler'}>
                  <li><span></span>Hakimlər</li>
                </Link>
              </div></p></li>
          </div>
          <div>
            <li className='pageText'><p className='link' ><span></span> İdman növləri
              <div className="subMenu">
                {
                  navbarText && navbarText.map((item) => (
                    <Link className='pageLink' to={`/page/${item.name}`} key={item.name}>
                      <li><span></span>{item.tittle}
                        <ul className='altText'>
                          {item.Alt.map((altItem) => (
                            <Link className='pageLink' to={`/page/${altItem?.name}`} key={altItem?.name}>
                              <li key={altItem?.name}><span></span>{altItem?.tittle}</li>
                            </Link>
                          ))}
                        </ul>
                      </li>
                    </Link>
                  ))
                }
              </div>
            </p></li>
          </div>
          <div>
            <li className='pageText'><NavLink className='link' to={"/news"}><span></span> Xəbər</NavLink></li>
          </div>
          <div>
            <li className='pageText'><p className='link' ><span></span> Media
              <div className="subMenu">
                <Link className='pageLink' to={'/photo'}>
                  <li><span></span>Foto</li>
                </Link>
                <Link className='pageLink' to={'/video'}>
                  <li><span></span>Video</li>
                </Link>
              </div></p></li>
          </div>
          <div>
            <li className='pageText'><NavLink className='link' to={"/contact"}><span></span> Əlaqə</NavLink></li>
          </div>
        </ul>
      </div>
      <div className={`respNavbar ${openNavbar ? "open" : ""}`}>
        <div className="closeBox" onClick={handleOpenNavbar}>
          <IoMdClose />
        </div>
        <div className="respUpBox"><img src={Logo} alt="" /></div>
        <div className="respDownBox">
          <RespNavbar />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
