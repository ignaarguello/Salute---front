import React from 'react'
import './CardProducto.css'
import { BsCart2 } from "react-icons/bs";

export default function CardProducto() {
    return (
        <div id='producto-container'>
            <div id='nombre-tipo-container-prod'>
                <span className='nombre-prod'>Fernet Branca 750ml</span>
                <div id='separador'></div>
                <span className='tipo-prod'>Aperitivo</span>
            </div>
            <div id='foto-container-prod'>
                <img className='foto-prod' src='https://http2.mlstatic.com/D_NQ_NP_852719-MLA51600508862_092022-O.webp' alt='fernet' />
            </div>
            <div id='precio-comprar-container'>
                <span className='precio-prod'>$1900</span>
                <div className='comprar-prod'>Comprar <BsCart2 /></div>
            </div>
        </div>
    )
}
