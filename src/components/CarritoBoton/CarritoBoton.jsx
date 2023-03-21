import React from 'react'
import './CarritoBoton.css'
import { BsCart2 } from "react-icons/bs";
import { Link } from 'react-router-dom';

export default function CarritoBoton() {
    return (
            <Link to={'/carrito'} className='boton-carritoCont'>
                <BsCart2 className='icono-carrito' />
            </Link>
    )
}
