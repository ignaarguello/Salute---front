import React, { useEffect } from 'react'
import CardProd3 from '../../components/CardProducto/CardProd3'
import './Productos.css'
import CardTailwind from '../../components/CardTailwind/CardTailwind'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productosActions from '../../redux/actions/productosActions'

export default function Productos() {

  let inputRef = useRef()
  let dispatch = useDispatch()

  const { traer_productos, filtrar_productos } = productosActions
  const { productos } = useSelector(store => store.productos)

  useEffect(() => {
        dispatch(traer_productos())
  }, [])

  const filtroTexto = (event) => {
    let texto = inputRef.current.value.trim()
    dispatch(filtrar_productos(texto))
  }
  return (
    <div id='productos-pagina-cont'>
      <input className='inputTexto' type="text" onKeyUp={filtroTexto} placeholder="Search.." ref={inputRef}/>
      {
        (productos?.length > 0) && productos?.map( (prod) => (<CardTailwind key={prod.id} nombre={prod.nombre} img={prod.imagen} precio={prod.precio} tipo={prod.tipo} />))
      }
      {
        (productos?.length > 0)
        ? productos?.map( (prod) => <CardProd3 key={prod?._id} nombre={prod?.nombre} img={prod?.imagen} precio={prod?.precio} tipo={prod?.tipo} />)
        : <h1>No hay nada</h1>
        }
    </div>
  )
}
