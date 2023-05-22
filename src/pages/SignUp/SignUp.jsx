import React from 'react'
import './SignUp.css'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import usuariosActions from '../../redux/actions/usuariosActions'
import { uploadImagenes } from '../../firebase/config_firebase'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { navbar_black } from '../../Functions/NavbarResponsive'
import { useEffect } from 'react';


export default function SignUp() {

  useEffect(() =>{
    navbar_black()
  },[])

  //Variable de estado para setear los archivos
  const [file, setFile] = useState(null)

  //?Variables de acciones de redux de usuarios
  const { nuevo_usuario } = usuariosActions

  //? Varibles del useRef 
  const nombreRef = useRef()
  const apellidoRef = useRef()
  const emailRef = useRef()
  const contraseñaRef = useRef()


  //? Dispatch y Navigate
  const dispatch = useDispatch()
  const navigate = useNavigate()


  //? Funcion que envia la peticion de registro - (nuevo_usuario)
  const registrarUsuario = async (e) => {
    e.preventDefault()
    try {
      const url_image = await uploadImagenes(file)

      const data = {
        nombre: nombreRef.current?.value,
        apellido: apellidoRef.current?.value,
        foto: url_image,
        email: emailRef.current?.value,
        contraseña: contraseñaRef.current?.value
      }

      let res = await dispatch(nuevo_usuario(data))

      if (res.payload.success) {
        Toastify({
          text: `Usuario Registrado, por favor, revisá tu casilla de correo`,
          duration: 4500,
          style: {
            background: "#006400",
          },
        }).showToast();

        setTimeout(() => {
          navigate('/ingresar')
        }, 3000)
      }
      else {
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
    <div id='container-general__signUp'>
      {/* Contenedor 1 */}
      <div className="containers__signUp">
        <div className="contenedores_cont1__signUp"></div>
        <div className="contenedores_cont1__signUp"></div>
      </div>
      {/* Contenedor 2 */}
      <div className="containers__signUp">
        <h2 id='titulo-registrarse__signUp'>Registrarse</h2>
        <form id='form__signUp' onSubmit={registrarUsuario} className='animate__animated animate__fadeIn '>
          <div className='container-input__signUp'>
            <label htmlFor="input-nombre_SU" className='label-signUp'>Nombre:</label>
            <input type="text" className='input__signUp' name='input-nombre_SU' placeholder='Nombre' ref={nombreRef} />
          </div>
          <div className='container-input__signUp'>
            <label htmlFor="input-apellido_SU" className='label-signUp'>Apellido:</label>
            <input type="text" className='input__signUp' name='input-apellido_SU' placeholder='Apellido' ref={apellidoRef} />
          </div>
          <div className='container-input__signUp'>
            <label htmlFor="input-foto_SU" className='label-signUp'>Foto:</label>
            <input type="file" className='input__signUp' name='input-foto_SU' onChange={e => setFile(e?.target?.files?.[0])} />
          </div>
          <div className='container-input__signUp'>
            <label htmlFor="input-email_SU" className='label-signUp'>Email:</label>
            <input type="email" className='input__signUp' name='input-email_SU' placeholder='Email' ref={emailRef} onChange={e => setFile(e)} />
          </div>
          <div className='container-input__signUp'>
            <label htmlFor="input-password_SU" className='label-signUp'>Contraseña:</label>
            <input type="password" className='input__signUp' name='input-password_SU' placeholder='Contraseña' ref={contraseñaRef} />
          </div>
          <div className='container-input__signUp'>
            <input type="submit" className='input-submit__signUp' value='Registrarse' />
          </div>
        </form>
        <Link to='/ingresar' id='titulo-siYaEstasRegistrado__signUp'>Si ya tenes cuenta, ¡Ingresá desde aca!</Link>
      </div>
    </div>
  )
}
