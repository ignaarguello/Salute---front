import React from 'react'
import './SignIn.css'
import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import usuariosActions from '../../redux/actions/usuariosActions'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { navbar_black } from '../../Functions/NavbarResponsive'

export default function SignIn() {
  //Variables de redux de usuarios
  const { ingreso_usuario } = usuariosActions

  useEffect(() => {
    navbar_black()
  }, [])

  /* Varibles del useRef */
  const emailRef = useRef()
  const contraseñaRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()


  //Funcion que envia los datos al backend
  const ingreso = async (event) => {
    event.preventDefault()

    const data = {
      email: emailRef.current?.value,
      contraseña: contraseñaRef.current?.value
    }

    try {
      let res = await dispatch(ingreso_usuario(data))
      console.log('Respuesta', res)
      if (res.payload.success) {

        Toastify({
          text: `Bienvenido ${res.payload.response.user.nombre} - Buena Compra 🛍`,
          duration: 4500,
          style: {
            background: "#006400",
          },
        }).showToast();

        setTimeout(() => {
          navigate('/')
        }, 3000)
      }

      else{
        Toastify({
          text: `- ${res.payload.response} -`,
          duration: 2000,
          style: {
            background: "#ff0000",
          },
        }).showToast();
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div id='container-general__SignIn'>
      <div className="containers-generales_signIn"></div>
      <div className="containers-generales_signIn">
        <h2 id='titulo-iniciarSesion__signIn'>Iniciar Sesion</h2>
        <form id='formulario-singIn' onSubmit={ingreso} className='animate__animated animate__fadeIn '>
          <div className="container-inputs__signIn">
            <label htmlFor="input-email-SI" className='labelForm-SI'>Email:</label>
            <input type="email" name='input-email-SI' id='input-email' className='input-SI' placeholder='Email' required ref={emailRef} />
          </div>
          <div className="container-inputs__signIn">
            <label htmlFor="input-contraseña-SI" className='labelForm-SI'>Contraseña:</label>
            <input type="password" name='input-contraseña-SI' id='input-contraseña' className='input-SI' placeholder='Contraseña' required ref={contraseñaRef} />
          </div>
          <div id='container-buttonSubmit__signIn'>
            <input type='submit' id='button-submit__signIn' value='Iniciar Sesión' />
            <Link to='/registrar' id='titulo_noTenesCuenta__signIn'>¿No tenés cuenta? - ¡Registrate!</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
