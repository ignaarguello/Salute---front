import React from 'react'
import './Inicio.css'
import Banner from '../../components/Banner/Banner'
import BannerEnvios from '../../components/BannerEnvios/BannerEnvios'
import CardsHome from '../../components/CardsHome/CardsHome'
import BackgroundHome from '../../components/BackgroundHome/BackgroundHome'

export default function Inicio() {
  return (
    <>
      <Banner />
      <BannerEnvios />
      <h2 id='titulo-destacados__home'>Nuestro productos destacados</h2>
      <CardsHome/>
      <BackgroundHome/>
    </>
  )
}
