import React from 'react'
import './PaymentSuccess.css'
import { useEffect } from 'react'


export default function PaymentSucess() {
  const navbar_oscuro = document.querySelector('.Navbar_total')

  useEffect(() => {
    navbar_oscuro?.classList.add('bg-black')
    navbar_oscuro?.classList.remove('ps_absolute')
  }, [])


  return (
    <div id='container-general__PaymentSuccess'>
      PaymentSucess
    </div>
  )
}
