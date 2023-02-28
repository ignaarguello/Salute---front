import React from 'react'
import './Banner.css'

export default function Banner() {
  return (
    <div id='container-principal__banner'>
      <div id='container-banner-foto__banner'></div>
      <div id='container-video-texto__banner'>
        <video autoPlay muted loop id="container-banner-video__banner">
          <source id='video__banner' src="./images/video-banner2.mp4" type="video/mp4" />
        </video>
        <div id='container-textos__banner'>
          <h2 className='titulo__bienvenido__banner'>Bienvenidos a Salute Drinks</h2>
          <h3 className='titulo-webOficial__banner'> Web Oficial </h3>
        </div>
      </div>
    </div>
  )
}
