import React from 'react'
import './CarritoItem.css'
import { MdDeleteForever } from "react-icons/md";

export default function CarritoItem(props) {

    let {img, nombre, tipo, precio} = props

    return (
        <div id='item-Cont'>
            <img className='foto-itemCarrito' src={img} alt={nombre} />
            <div className='info-itemCarrito'>
                <span id='nombre-itemCarrito'>{nombre}</span>
                <span id='tipo-itemCarrito'>{tipo}</span>
                <span id='precio-itemCarrito'>${precio}</span>
            </div>
            <MdDeleteForever className='borrar-itemCarrito'/>
        </div>
    )
}
