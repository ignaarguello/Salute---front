import React from 'react'
import './Footer.css'
import {AiFillInstagram} from "react-icons/ai"
import {BsYoutube} from "react-icons/bs"
import {IoLogoWhatsapp} from "react-icons/io"
import { Link } from 'react-router-dom'


export default function Footer() {
  return (
    <footer>
      <div className='redes-sociales-footer'>
        <Link to='https://www.instagram.com/salute_drinkss2/' target={'_blank'}><AiFillInstagram id='ig-footer'/></Link>
        <Link to='https://www.youtube.com/@salutetv4605' target={'_blank'}><BsYoutube id='yt-footer'/></Link>
        <IoLogoWhatsapp id='wp-footer'/>
      </div> 
      <div className='dev-footer'>
        <span>- Salute Drinks 2023 -</span>
      </div>
    </footer>
  )
}
