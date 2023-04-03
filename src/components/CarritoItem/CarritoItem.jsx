import React, { useState } from 'react'
import './CarritoItem.css'
import { MdDeleteForever } from "react-icons/md";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

export default function CarritoItem(props) {

    let {img, nombre, tipo, precio, fnBorrar, cantidad, fnRestar, fnSumar} = props

    let subtotalProd = cantidad * precio

    return (
        <div id='item-Cont'>
            <img className='foto-itemCarrito' src={img} alt={nombre} />
            <div className='info-itemCarrito'>
                <span id='nombre-itemCarrito'>{nombre}</span>
                <span id='tipo-itemCarrito'>{tipo}</span>
                <span id='precio-itemCarrito'>{cantidad} x ${precio} {subtotalProd !== precio && ` = ($${subtotalProd.toLocaleString('es-ES')})`}</span>
            </div>
            <div className='btn-itemCarrito'>
                <MdDeleteForever onClick={fnBorrar} className='borrar-itemCarrito'/>
                <div className='btn2-itemCarrito'>
                    <AiOutlineMinusCircle onClick={fnRestar} className='restar-itemCarrito' />
                    <span id='cantidad-itemCarrito'>{cantidad}</span>
                    <AiOutlinePlusCircle onClick={fnSumar} className='sumar-itemCarrito' />
                </div>
            </div>
        </div>
    )
}
