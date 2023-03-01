import React from 'react'
import './CardProd2.css'
import { BsCart2 } from "react-icons/bs";

export default function CardProd2() {
    return (
        <div id='producto-container2'>
            <div id='foto-container-prod2'>
                <img className='foto-prod2' src='https://http2.mlstatic.com/D_NQ_NP_852719-MLA51600508862_092022-O.webp' alt='fernet' />
            </div>
            <div id='nombre-tipo-container-prod2'>
                <span className='nombre-prod2'>Fernet Branca 750ml</span>
                <span className='tipo-prod2'>Aperitivo</span>
            </div>
            <div id='precio-comprar-container2'>
                <span className='precio-prod2'>$1900</span>
                <div className='comprar-prod2'>Comprar <BsCart2 /></div>
            </div>
        </div>
    )
}