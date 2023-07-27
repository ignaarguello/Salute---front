import React from 'react'
import './BackgroundHome.css'
import { FiInstagram } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";

export default function BackgroundHome() {
  return (
    <div id='container-general__BackgroundHome'>
      <h3 id='titulo-estamos__BackgroundHome'>#ESTAMOS</h3>
      <h3 id='titulo-fechas__BackgroundHome'>Viernes - Sabados - Feriados</h3>
      <h3 id='titulo-fechas__BackgroundHome'>22:00 - 03:00</h3>
      <div id='container-refs__backgroundHome'>
        <a className='a-ref__backgroundHome' target='_blank' rel='noreferrer' href="https://www.instagram.com/salute_drinkss2/"><FiInstagram className='ref__backgroundHome' /></a>
        <a className='a-ref__backgroundHome' target='_blank' rel='noreferrer' href="https://api.whatsapp.com/send?phone=1128682405"><BsWhatsapp className='ref__backgroundHome' /></a>
        <a className='a-ref__backgroundHome' target='_blank' rel='noreferrer' href="https://www.instagram.com/salute_drinkss2/"><BsYoutube className='ref__backgroundHome' /></a>
      </div>
    </div>
  )
}
