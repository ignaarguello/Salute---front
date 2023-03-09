import React from 'react'
import './CardsHome.css'
import { Link } from 'react-router-dom';

export default function CardsHome() {
  return (
    <div id='container-principal__CardsHome'>
        <Link to='/productos' className="card-producto__CardsHome">
            <h3 className='titulo-card__CardsHome'>Aperitivos</h3>
        </Link>
        <Link to='/productos' className="card-producto__CardsHome">
            <h3 className='titulo-card__CardsHome'>Cervezas</h3>
        </Link>
        <Link to='/productos' className="card-producto__CardsHome">
            <h3 className='titulo-card__CardsHome'>Espumantes</h3>
        </Link>
        <Link to='/productos' className="card-producto__CardsHome">
            <h3 className='titulo-card__CardsHome'>Bebidas Blancas</h3>
        </Link>
    </div>
  )
}
