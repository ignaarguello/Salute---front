import React from 'react'
import { Link } from 'react-router-dom'
import './SaluteTV.css'
import { useEffect } from 'react'
import { navbar_black } from '../../Functions/NavbarResponsive'

export default function SaluteTV() {

  useEffect(() => {
      navbar_black()
  }, [])

  return (
    <div id='salutetv-pagina-cont'>
      <div className='bienvenida-salutetv'>
        <div className='titulo-salutetv'>
          <span>SUSCRIBITE A SALUTE TV</span>
        </div>
        <div className='textoAnimado'>
          <span>Divertite con videos de</span>
          <ul>
            <li>entretenimiento</li>
            <li>historia</li>
            <li>entrevistas</li>
            <li>música</li>
            <li>degustaciones</li>
          </ul>
        </div>
      </div>
      <div className='salutetv-segundoCont'>
        <div className='info-canal'>
          <Link to='https://www.youtube.com/@salutetv4605' target={'_blank'}><img id='logo-canalYT' src='./images/salutetv.jpg' alt='Logo del canal de YouTube' /></Link>
          <span>Salute TV</span>
          {/* <div className='comentariosCont'>
            <textarea className='inputComentario' placeholder='Dejanos tu comentario...' />
            <div className='comentarios'>
              <span id='nombreComentario'>Gonzalo Higuain</span>
              <span id='textoComentario'>Me cagué de risa con la historia de la Quilmes jajjaj</span>
            </div>
          </div> */}
        </div>
        <div className='video-canalCont'>
          <iframe className='video-canal' src="https://www.youtube.com/embed/8gTjxW7EV_w" title="SALUTE, TE CUENTA: LA HISTORIA DE LA CERVEZA QUILMES ! ! ! 🍻🍻🍻" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  )
}
