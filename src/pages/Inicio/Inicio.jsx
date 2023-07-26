import React from 'react'
import { useEffect } from 'react'
import './Inicio.css'

//?Importación de Componentes para 'Home'
import Banner from '../../components/Banner/Banner'
import BannerEnvios from '../../components/BannerEnvios/BannerEnvios'
import CardsHome from '../../components/CardsHome/CardsHome'
import BackgroundHome from '../../components/BackgroundHome/BackgroundHome'
import Carousel from '../../components/Carousel/Carousel'
import { navbar_transparent } from '../../Functions/NavbarResponsive'

export default function Inicio() {

  useEffect(() => {
    navbar_transparent()
  }, [])

  return (
    <>
      <Banner />
      <BannerEnvios />
      <h2 id='titulo-destacados__home'>Nuestros productos destacados</h2>
      <CardsHome />
      <BackgroundHome />
      <Carousel />
    </>
  )
}

