import React from 'react'
import './ZonasEntrega.css'

export default function ZonasEntrega() {
  return (
    <div id='zonasentrega-cont'>
      <div className='titulos-zonas'>
        <span>Nuestras zonas de entrega</span>
      </div>
      <div className='mapa-texto-cont'>
        <div className='mapa-zonas'>
          <iframe src="https://www.google.com/maps/d/u/0/embed?mid=16cnMi0dh5EM0cmAK8CzGNTNkltTiWVo&ehbc=2E312F" width="640" height="480"></iframe>
        </div>
        <div className='texto-zonas'>
          <span>Zona verde - SIN COSTO</span>
          <span>Zona negro - $250</span>
          <span>Zona amarillo - $300</span>
          <span>Zona violeta - $200</span>
          <span>Zona azul - $150</span>
          <span>Zona rojo - $150</span>
        </div>
      </div>
    </div>
  )
}
