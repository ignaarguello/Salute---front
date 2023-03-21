import React from 'react'
import './Inicio.css'
import Banner from '../../components/Banner/Banner'
import BannerEnvios from '../../components/BannerEnvios/BannerEnvios'
import CardsHome from '../../components/CardsHome/CardsHome'
import BackgroundHome from '../../components/BackgroundHome/BackgroundHome'
import { useEffect } from 'react'

export default function Inicio() {
  //Variable que usa el useEffect para borrar la clase del navbar oscuro, traida por JQUERY
   const navbar_oscuro = document.querySelector('.Navbar_total')

  useEffect(()=>{
    navbar_oscuro?.classList.add('ps_absolute')
    navbar_oscuro?.classList.remove('bg-black')
  },[])

  return (
    <>
      <Banner />
      <BannerEnvios />
      <h2 id='titulo-destacados__home'>Nuestros productos destacados</h2>
      <CardsHome/>
      <BackgroundHome/>
    </>
  )
}
