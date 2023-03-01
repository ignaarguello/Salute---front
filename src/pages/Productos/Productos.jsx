import React from 'react'
import CardProd2 from '../../components/CardProducto/CardProd2'
import CardProducto from '../../components/CardProducto/CardProducto'
import './Productos.css'

export default function Productos() {
  return (
    <div id='productos-pagina-cont'>
      <CardProducto />
      <CardProd2 />
    </div>
  )
}
