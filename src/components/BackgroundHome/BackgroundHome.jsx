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
      <div id='container-refs__backgroundHome'>
        <a target='_blank' href="https://google.com"><FiInstagram className='ref__backgroundHome' /></a>
        <a target='_blank' href="https://google.com"><BsWhatsapp className='ref__backgroundHome' /></a>
        <a target='_blank' href="https://google.com"><BsYoutube className='ref__backgroundHome' /></a>
      </div>
    </div>
  )
}
