import React from 'react'
import './SignIn.css'
import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router";

export default function SignIn() {
  //Variable que usa el useEffect para el navbar oscuro, traida por JQUERY
  const navbar_oscuro = document.querySelector('.Navbar_total')

  useEffect(() => {
    navbar_oscuro?.classList.add('bg-black')
  }, [])

  /* Varibles del useRef */
  const emailRef = useRef()
  const contraseñaRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div id='container-general__SignIn'>
      <div className="containers-generales_signIn"></div>
      <div className="containers-generales_signIn">
        <h2 id='titulo-iniciarSesion__signIn'>Iniciar Sesion</h2>
        <form id='formulario-singIn'>
          <div className="container-inputs__signIn">
            <label htmlFor="input-email-SI" className='labelForm-SI'>Email</label>
            <input type="email" name='input-email-SI' id='input-email' className='input-SI' placeholder='Email' required ref={emailRef} />
          </div>
          <div className="container-inputs__signIn">
            <label htmlFor="input-contraseña-SI" className='labelForm-SI'>Contraseña:</label>
            <input type="password" name='input-contraseña-SI' id='input-contraseña' className='input-SI' placeholder='Contraseña' required ref={contraseñaRef} />
          </div>
          <div id='container-buttonSubmit__signIn'>
            <div id='button-submit__signIn'>Iniciar Sesión</div>
          </div>
        </form>
      </div>
    </div>
  )
}
