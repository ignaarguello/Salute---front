import React from 'react'
import './CardProd3.css'
import { BsCart2 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import productosActions from '../../redux/actions/productosActions'
import { useEffect } from 'react';


export default function CardProd3(props) {
    let {img, nombre, tipo, precio, id} = props

    return (
        <div id='container-general-prod3'>
            <div id='producto-container3'>
                    <div>
                        <div id='foto-container-prod3'>
                            <img className='foto-prod3' src={img} alt={nombre} />
                        </div>
                        <div id='nombre-tipo-container-prod3'>
                            <span className='nombre-prod3'>{nombre}</span>
                            <span className='tipo-prod3'>{tipo}</span>
                        </div>
                        <div id='precio-comprar-container3'>
                            <span className='precio-prod3'>{precio}$</span>
                            <div className='comprar-prod3'><BsCart2 />Comprar</div>
                        </div>
                    </div>
            </div>
        </div>
    )
}