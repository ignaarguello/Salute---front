import React, { useEffect, useState } from 'react'
import CardProd3 from '../../components/CardProducto/CardProd3'
import './Productos.css'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productosActions from '../../redux/actions/productosActions'

export default function Productos() {

  let inputRef = useRef()
  let dispatch = useDispatch()
  let [checked, setChecked] = useState([])

  const { traer_productos, filtrar_productos } = productosActions
  const { productos, tipos } = useSelector(store => store.productos)

  console.log(tipos);

  useEffect(() => {
    dispatch(traer_productos())
    // eslint-disable-next-line
  }, [])

  const filtroTexto = (event) => {
    let checks = filtroChecks(event)
    let texto = inputRef.current.value.trim()
    let urlChecks = checks.map( (check) => `tipo=${check}`).join('&')
    dispatch(filtrar_productos({value: texto, tipo: urlChecks}))
  }

  let filtroChecks = (e) => {
    let auxArray = []
    if(e.target.checked){
      auxArray.push(...checked, e.target.value)
    } else {
      auxArray = checked.filter( ele => ele !== e.target.value)
    }
    setChecked(auxArray)
    return auxArray
  }

  return (
    <div id='productos-pagina-cont'>
      <div id='buscadores-cont'>
        <input className='inputTexto' placeholder='Buscar bebida...' type="text" onKeyUp={filtroTexto} ref={inputRef} />
        <div className="checkbox-container">
          {tipos?.map(tipo => 
          <label key={tipo}><input onChange={filtroTexto} className='checkboxUno' type="checkbox" id={tipo} value={tipo}/>{tipo}</label>
          )}
        </div>
      </div>
      <div id='container-cards__productos'>
        {
          (productos?.length > 0)
            ? productos?.map((prod) => <CardProd3 key={prod?._id} nombre={prod?.nombre} img={prod?.imagen} precio={prod?.precio} tipo={prod?.tipo} />)
            : <div className='notFoundProd'>
                <img id='vasoNotFound' src='https://cdn-icons-png.flaticon.com/512/5386/5386124.png' alt='vaso de vidrio roto'/>
                <span className='animate__animated animate__fadeInDown animate__slow'>No hay productos que coincidan con esa búsqueda.</span>
              </div>
        }
      </div>
    </div>
  )
}