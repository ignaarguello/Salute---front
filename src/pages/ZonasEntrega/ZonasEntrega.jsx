import React, { useEffect } from 'react'
import './ZonasEntrega.css'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {TbTruckDelivery} from 'react-icons/tb'
import zonasActions from '../../redux/actions/zonasActions'
import { useDispatch, useSelector } from 'react-redux'

export default function ZonasEntrega() {

  let {traer_zonas} = zonasActions
  let dispatch = useDispatch()

  let { zonas } = useSelector( store => store.zonas)

  useEffect( () => {
    dispatch(traer_zonas())
    // eslint-disable-next-line
  }, [])

  return (
    <div id='zonasentrega-cont'>
      <div className='titulos-zonas'>
        <span className='animate__animated animate__slideInLeft animate__slower'>Nuestras zonas de entrega  <TbTruckDelivery /></span>
      </div>
      <div className='mapa-texto-cont'>
        <div className='mapa-zonas'>
          <iframe className='mapaFrame' src="https://www.google.com/maps/d/u/0/embed?mid=16cnMi0dh5EM0cmAK8CzGNTNkltTiWVo&ehbc=2E312F" title='Mapa de entregas' />
        </div>
        <div className='texto-zonas'>
          <div className='desc-texto-zonas'>
            <span>Nos ubicamos en la zona de <span id='BernalEste'>Bernal Este</span>, sobre la calle Lavalle, a unas pocas cuadras del Registro Civil de Bernal.
            Al momento de <span id='hacerPedidoTexto'>hacer tu pedido</span> podés optar por la opción de retirar en nuestro local o seleccionar la zona que te corresponda:</span>
          </div>
          <div className='zonas-color'>
          {
            zonas?.map(zona => <span key={zona._id} ><FaMapMarkerAlt /> {zona.nombre} - ${zona.precio}</span>)
          }
          </div>
        </div>
      </div>
    </div>
  )
}
