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
    // eslint-disable-next-line
  }, [])

  const filtroTexto = () => {
    let texto = inputRef.current.value.trim()
    dispatch(filtrar_productos(texto))
  }
  return (
    <div id='productos-pagina-cont'>
      <input className='inputTexto' placeholder='Buscar bebida...' type="text" onKeyUp={filtroTexto} ref={inputRef} />
      <div id='container-cards__productos'>
        {
          (productos?.length > 0)
            ? productos?.map((prod) => <CardProd3 key={prod?._id} nombre={prod?.nombre} img={prod?.imagen} precio={prod?.precio} tipo={prod?.tipo} />)
            : <span>No hay productos que coincidan con esa búsqueda.</span>
        }
      </div>
    </div>
  )
}
