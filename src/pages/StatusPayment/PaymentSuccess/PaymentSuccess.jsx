import React from 'react'
import './PaymentSuccess.css'
import { useEffect } from 'react'
import { navbar_black } from '../../../Functions/NavbarResponsive'
import { HiBadgeCheck } from "react-icons/hi";
import { useSelector } from 'react-redux'
import axios from 'axios';
import { BASE_URL } from '../../../Api/Api'


export default function PaymentSucess() {
  const { usuarioId } = useSelector(store => store.usuarios)
  axios.delete(`${BASE_URL}/orders/${usuarioId}`)

  useEffect(() => {
    navbar_black()
  }, [])

  return (
    <div id='container-general__PaymentSuccess'>
      <div id="container-titleAndCheck__PaymentSuccess">
        <h2>Pago realizado con exito</h2>
        < HiBadgeCheck id='logo-check__PaymentSuccess' />
      </div>
      <p id='texto__PaymentSuccess'>Gracias por realizar tu compra en la plataforma de Salute Drinks. Nos encontramos trabajando para brindarte la mejor experiencia e interfaz. Tu compra nos ayuda a seguir creciendo y mejorando todos los días.</p>
      <span id='span-EquipoSD__PaymentSuccess'>Equipo de Salute Drinks. #ESTAMOS</span>
    </div>
  )
}
