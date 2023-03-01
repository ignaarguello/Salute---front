import React from 'react'
import './CardProd3.css'
import { BsCart2 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import productosActions from '../../redux/actions/productosActions'
import { useEffect } from 'react';


export default function CardProd3() {

    const dispatch = useDispatch();
    const { traer_productos } = productosActions
    const { productos } = useSelector(store => store.productos)

    useEffect(() => {
        dispatch(traer_productos())
    }, [])

    console.log(productos)
    return (
        <div id='container-general-prod3'>
                {productos.map((producto) => 
            <div id='producto-container3'>
                    <div>
                        <div id='foto-container-prod3'>
                            <img className='foto-prod3' src={producto.imagen} alt='fernet' />
                        </div>
                        <div id='nombre-tipo-container-prod3'>
                            <span className='nombre-prod3'>{producto.nombre}</span>
                            <span className='tipo-prod3'>{producto.tipok}</span>
                        </div>
                        <div id='precio-comprar-container3'>
                            <span className='precio-prod3'>{producto.precio}$</span>
                            <div className='comprar-prod3'><BsCart2 />Comprar</div>
                        </div>
                    </div>
            </div>
                )}
        </div>
    )
}