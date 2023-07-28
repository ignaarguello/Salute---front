import React from 'react'
import './Banner.css'
import { Link } from 'react-router-dom';
import { HiBadgeCheck } from "react-icons/hi";
import { FiInstagram } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";


export default function Banner() {

  return (
    /* DESKTOP */
    <div id='container-principal__banner'>
      <div id='container-banner-foto__banner'>
        <div id='container-contactos__banner' className='animate__animated animate__fadeIn animate__delay-2s'>
          <h3 id='titulo-contacto__banner'>Nuestras Redes:</h3>
          <div id='container-refs__banner'>
            <a target='_blank' href="https://www.instagram.com/salute_drinkss2/" rel='noreferrer'><FiInstagram className='ref__banner' id='ref-banner-1' /></a>
            <a target='_blank' href="https://api.whatsapp.com/send?phone=1128682405" rel='noreferrer'><BsWhatsapp className='ref__banner' id='ref-banner-2' /></a>
            <a target='_blank' href="https://www.instagram.com/salute_drinkss2/" rel='noreferrer'><BsYoutube className='ref__banner' id='ref-banner-3' /></a>
          </div>
        </div>
        <div id='container-titulos__banner'>
          <h2 className='titulo__bienvenido__banner-lg animate__animated animate__fadeIn animate__delay-1s'>Bienvenido a Salute Drinks</h2>
          <div id='container-web-approbed__banner'>
            <h3 className='titulo-webOficial__banner-lg animate__animated animate__fadeIn animate__delay-2s'> Tienda Oficial </h3>
            <HiBadgeCheck id='logo-check__banner' className='animate__animated animate__fadeIn animate__delay-3s' />
          </div>
          <Link to='/productos' id='button-catalogo__banner-lg' className='animate__animated animate__fadeIn animate__delay-2s'>Catalogo de productos</Link>
        </div>

      </div>
      {/* MOBILE ↓  */}
      <div id='container-video-texto__banner'>
        <video autoPlay="autoplay" muted={true} loop={true} controls={false} playsInline id="container-banner-video__banner">
          <source id='video__banner' src="./images/videoFinal.mp4" type="video/mp4" />
        </video>
        <div id='container-textos__banner'>
          <h2 className='titulo__bienvenido__banner animate__animated animate__fadeIn animate__delay-1s'>Bienvenido a Salute Drinks</h2>
          <div id='container-web-approbed__banner_sm'>
            <h3 className='titulo-webOficial__banner_sm animate__animated animate__fadeIn animate__delay-1s'> Tienda Oficial </h3>
            <HiBadgeCheck id='logo-check__banner_sm' className='animate__animated animate__fadeIn animate__delay-2s' />
          </div>
          <Link to='/productos' id='button-catalogo__banner'>Catalogo de productos</Link>
        </div>
      </div>
    </div>
  )
}
