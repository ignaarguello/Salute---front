import React from 'react'
import './Banner.css'
import { Link } from 'react-router-dom';
import { HiBadgeCheck } from "react-icons/hi";

export default function Banner() {
  return (
    /* DESKTOP */
    <div id='container-principal__banner'>
      <div id='container-banner-foto__banner'>
        <h2 className='titulo__bienvenido__banner-lg'>_Bienvenido a Salute Drinks</h2>
        <div id='container-web-approbed__banner'>
          <h3 className='titulo-webOficial__banner-lg'> Web Oficial </h3>
          <HiBadgeCheck id='logo-check__banner' />
        </div>
        <Link to='/productos' id='button-catalogo__banner-lg'>Catalogo de productos</Link>
      </div>
      {/* MOBILE ↓  */}
      <div id='container-video-texto__banner'>
        <video autoPlay="autoplay" muted={true} loop={true} controls={false} playsInline id="container-banner-video__banner">
          <source id='video__banner' src="./images/videoFinal.mp4" type="video/mp4" />
        </video>
        <div id='container-textos__banner'>
          <h2 className='titulo__bienvenido__banner'>_Bienvenido a Salute Drinks</h2>
          <h3 className='titulo-webOficial__banner'> Web Oficial </h3>
          <Link to='/productos' id='button-catalogo__banner'>Catalogo de productos</Link>
        </div>
      </div>
    </div>
  )
}
