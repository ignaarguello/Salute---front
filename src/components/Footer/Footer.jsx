import React from 'react'
import './Footer.css'
import { FiInstagram } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { Link } from 'react-router-dom'
import { MdAddLocationAlt } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";



export default function Footer() {
  return (
    <div id='container-superGeneral__footer'>
      <footer id='container-general__footer'>
        <div className="containers-footer" id='container-A__footer'>
          <img id='logo-salute__footer' src="../images/logo-salute.png" alt="" />
          <h2 id='titulo-links__footer'>Quick Links</h2>
          <div id='lista-contenedorLinks__footer'>
            <Link to='/' className="link-ref__footer">Inicio</Link>
            <Link to='/productos' className="link-ref__footer">Catalogo</Link>
            <Link to='/ingresar' className="link-ref__footer">Iniciar Sesión</Link>
            <Link to='/zonas-entrega' className="link-ref__footer">Zonas de Entrega</Link>
            <Link to='/salute-tv' className="link-ref__footer">Salute TV</Link>
          </div>
        </div>
        <div className="containers-footer" id='container-B__footer'>
          <h2 id='titulo-sobreNosotros__footer'>Sobre Nosotros</h2>
          <p id="texto-sobreNosotros__footer">
            Desde la ciudad de Quilmes, al sur del Gran Buenos Aires. Dedicimos formar este emprendimiento de ventas de bebidas de todo tipo.
            Poniendolé amor y buena onda en cada entrega, para que los disfrutes, de la mejor manera.
          </p>
          <div id="container-refs__footer">
            <div className="container-ref-respaldo__footer">
              <FiInstagram className='link-refSocial__footer' />
            </div>
            <div className="container-ref-respaldo__footer">
              <BsYoutube className='link-refSocial__footer' />
            </div>
            <div className="container-ref-respaldo__footer">
              <BsWhatsapp className='link-refSocial__footer' />
            </div>
          </div>
        </div>
        <div className="containers-footer" id='container-C__footer'>
          <div id="container-iframe__footer">
            <iframe id='iframe__footer' src="https://maps.google.com/maps?width=700&amp;height=440&amp;hl=en&amp;q=Marmol%20y%20mitre+(Salute%20Drinks)&amp;ie=UTF8&amp;t=&amp;z=10&amp;iwloc=B&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
          </div>
          <div className="container-titulos-cont2__footer">
            <MdMarkEmailRead className='icono-container2__footer'/>
            <h3 className='titulo-quilmes__footer'>Salutedrinks@gmail.com</h3>
          </div>
          <div className="container-titulos-cont2__footer">
            <MdAddLocationAlt className='icono-container2__footer'/>
            <h3 className='titulo-quilmes__footer'>Quilmes, Buenos Aires.</h3>
          </div>
        </div>
      </footer>
      <div id='container-desarrolladores__footer'>
        <div className="div-desarrollador">
          <Link to='https://github.com/ignaarguello' target={'_blank'} className='titulo-desarrollador__footer'>Argüello Ignacio</Link>
          <BsGithub className='logo-gh__footer' />
        </div>
        <div className="div-desarrollador">
          <Link to='https://github.com/FabrizioCatanzaro' target={'_blank'} className='titulo-desarrollador__footer'>Fabrizio Catanzaro</Link>
          <BsGithub className='logo-gh__footer' />
        </div>
      </div>
    </div>
  )
}
