import React from 'react'
import './Footer.css'
import {AiFillInstagram} from "react-icons/ai"
import {BsYoutube} from "react-icons/bs"
import {IoLogoWhatsapp} from "react-icons/io"

export default function Footer() {
  return (
    <footer>
      <div className='redes-sociales-footer'>
        <AiFillInstagram id='ig-footer'/>
        <BsYoutube id='yt-footer'/>
        <IoLogoWhatsapp id='wp-footer'/>
      </div>
      <div className='dev-footer'>
        <span>- Salute Drinks 2023 -</span>
      </div>
    </footer>
  )
}
