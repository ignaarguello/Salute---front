import React from 'react'
import './CardProd3.css'
import { BsCart2 } from "react-icons/bs";

export default function CardProd3(props) {
    let {img, nombre, tipo, precio, fnAgregar, textoBoton, colorBoton} = props

    return (
            <div id='producto-container3'>
                    <div id='body-card__prod3'>
                        <div id='foto-container-prod3'>
                            <img className='foto-prod3' src={img ||'./images/logo-salute.png'} alt={nombre} />
                        </div>
                        <div id='nombre-tipo-container-prod3'>
                            <span className='nombre-prod3'>{nombre}</span>
                            <span className='tipo-prod3'>{tipo}</span>
                        </div>
                        <div id='precio-comprar-container3'>
                            <span className='precio-prod3'>${precio}</span>
                            <div className={colorBoton} onClick={fnAgregar}><BsCart2 />{textoBoton}</div>
                        </div>
                    </div>
            </div>
    )
}