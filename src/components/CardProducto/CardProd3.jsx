import React from 'react'
import './CardProd3.css'
import { BsCart2 } from "react-icons/bs";

export default function CardProd3() {
    return (
        <div id='producto-container3'>
            <div id='foto-container-prod3'>
                <img className='foto-prod3' src='https://http2.mlstatic.com/D_NQ_NP_852719-MLA51600508862_092022-O.webp' alt='fernet' />
            </div>
            <div id='nombre-tipo-container-prod3'>
                <span className='nombre-prod3'>Lata de Heineken</span>
                <span className='tipo-prod3'>Aperitivo</span>
            </div>
            <div id='precio-comprar-container3'>
                <span className='precio-prod3'>$1900</span>
                <div className='comprar-prod3'><BsCart2 />Comprar</div>
            </div>
        </div>
    )
}