import React from 'react'
import './ZonasEntrega.css'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {TbTruckDelivery} from 'react-icons/tb'

export default function ZonasEntrega() {
  return (
    <div id='zonasentrega-cont'>
      <div className='titulos-zonas'>
        <span className='animate__animated animate__slideInLeft animate__slower'>Nuestras zonas de entrega  <TbTruckDelivery /></span>
      </div>
      <div className='mapa-texto-cont'>
        <div className='mapa-zonas'>
          <iframe className='mapaFrame' src="https://www.google.com/maps/d/u/0/embed?mid=16cnMi0dh5EM0cmAK8CzGNTNkltTiWVo&ehbc=2E312F"></iframe>
        </div>
        <div className='texto-zonas'>
          <div className='desc-texto-zonas'>
            <span>Nos ubicamos en la zona de <span id='BernalEste'>Bernal Este</span>, sobre la calle Lavalle, a unas pocas cuadras del Registro Civil de Bernal.
            Al momento de <span id='hacerPedidoTexto'>hacer tu pedido</span> podés optar por la opción de retirar en nuestro local o seleccionar la zona que te corresponda:</span>
          </div>
          <div className='zonas-color'>
            <span><FaMapMarkerAlt id='z-rojo' /> Zona rojo - SIN COSTO</span>
            <span><FaMapMarkerAlt id='z-verde' /> Zona verde - $150</span>
            <span><FaMapMarkerAlt id='z-negro'/> Zona negro - $250</span>
            <span><FaMapMarkerAlt id='z-amarillo'/> Zona amarillo - $300</span>
            <span><FaMapMarkerAlt id='z-violeta'/> Zona violeta - $200</span>
            <span><FaMapMarkerAlt id='z-azul'/> Zona azul - $150</span>
          </div>
        </div>
      </div>
    </div>
  )
}
