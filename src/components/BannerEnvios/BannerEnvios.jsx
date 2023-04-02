import React from 'react'
import './BannerEnvios.css'
import { Link } from 'react-router-dom';

export default function BannerEnvios() {
    return (
        <div id='container-general__BannerEnvios'>
            <div className="container-item__BannerEnvios">
                <div className="container1-body__BannerEnvios">
                    <img className='image__bannerEnvios' src="./images/mercadopago.png" alt="" />
                </div>
                <div className="container2-body__BannerEnvios">
                    <h2 className="titulo-item__BannerEnvios">
                        Realizá tus compras de manera rápida y segura. Abonando a través de Mercadopago o en efectivo.
                    </h2>
                </div>
            </div>
            <div className="container-item__BannerEnvios">
                <div className="container1-body__BannerEnvios">
                    <img className='image__bannerEnvios' src="./images/envios.png" alt="" />
                </div>
                <div className="container2-body__BannerEnvios">
                    <h2 className="titulo-item__BannerEnvios">
                        Hacé tu pedido por nuestra web y recibilo en minutos. Consultá por nuestro Stock de productos.
                    </h2>
                </div>
            </div>
            <div className="container-item__BannerEnvios">
                <div className="container1-body__BannerEnvios">
                    <img className='image__bannerEnvios' src="./images/location.png" alt="" />
                </div>
                <div className="container2-body__BannerEnvios">
                    <h2 className="titulo-item__BannerEnvios">
                        Nos encontramos en Quilmes. Repartimos por la ciudad y sus alrededores. +Info en <Link to='zonas-entrega' id='texto-zonasEntregas'>Zonas de entrega</Link>
                    </h2>
                </div>
            </div>
        </div>
    )
}
