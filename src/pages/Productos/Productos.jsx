import React, { useEffect } from 'react'
import CardProd3 from '../../components/CardProducto/CardProd3'
import './Productos.css'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productosActions from '../../redux/actions/productosActions'

export default function Productos() {

  let inputRef = useRef()
  let dispatch = useDispatch()

  const { traer_productos, filtrar_productos } = productosActions
  const { productos, tipo, todosLosTipos, nombre } = useSelector(store => store.productos)

  useEffect(() => {
    dispatch(traer_productos())
    // eslint-disable-next-line
  }, [])

  useEffect( () => {
    if(tipo || nombre){
      let data = {
        value: nombre,
        tipo: tipo,
      }
      dispatch(filtrar_productos({value: data.value, tipo: data.tipo}))
    } else{
      dispatch(traer_productos())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtroTexto = (event) => {
    // console.log(event.target.outerText);
    let texto = inputRef.current.value.trim()
    let categorias = tipo
    if (event.target.tagName === 'LI'){
      if (event.target.outerText.includes('Todos')){
        categorias = ''
      } else{
        categorias = event.target.outerText
      }
    }

    dispatch(filtrar_productos({value: texto, tipo: categorias}))
  }


  return (
    <div id='productos-pagina-cont'>
      <div className='categoriaMenu'>
        <span>Categorías principales</span>
        <div id='separadorMenu'></div>
        <ul>
          <li onClick={filtroTexto} >Todos los productos</li>
          { todosLosTipos?.map( tipo => 
            <li onClick={filtroTexto} key={tipo}>{tipo}</li>
          )}
        </ul>
      </div>  
      <div className='prodCont-general'>
        <div id='buscadores-cont'>
          <input className='inputTexto' placeholder='Buscar bebida...' type="text" onKeyUp={filtroTexto} ref={inputRef} />
          <div className="checkbox-container">
            {todosLosTipos?.map(tipo => 
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
    </div>
  )
}