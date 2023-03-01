import React from 'react'
import CardProd2 from '../../components/CardProducto/CardProd2'
import CardProd3 from '../../components/CardProducto/CardProd3'
import CardProducto from '../../components/CardProducto/CardProducto'
import './Productos.css'

export default function Productos() {
  return (
    <div id='productos-pagina-cont'>
      {/* <input className='search' /> */}
        <CardProducto />
        <CardProd2 />
        <CardProd3 />
        <CardProducto />
        <CardProd2 />
        <CardProd3 />
        <CardProducto />
        <CardProd2 />
        <CardProd3 />
        <CardProducto />
        <CardProd2 />
        <CardProd3 />
    </div>
  )
}
