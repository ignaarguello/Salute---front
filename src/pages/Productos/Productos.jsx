import React, { useEffect, useState } from 'react'
import CardProd3 from '../../components/CardProducto/CardProd3'
import './Productos.css'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productosActions from '../../redux/actions/productosActions'
import CarritoBoton from '../../components/CarritoBoton/CarritoBoton'
import { useNavigate } from 'react-router-dom'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import Swal from 'sweetalert2';
import carritoActions from '../../redux/actions/carritoActions'

export default function Productos() {

  let inputRef = useRef()
  let dispatch = useDispatch()

  let [checked, setChecked] = useState([])

  const { traer_productos, filtrar_productos } = productosActions
  const { productos, tipo, todosLosTipos, nombre } = useSelector(store => store.productos)
  let { logeado, usuarioId } = useSelector(store => store.usuarios)
  let { prodAgregado, prodEliminado} = useSelector( store => store.carrito)
  const navigate = useNavigate()
  let {agregar_producto, eliminar_prod_carrito} = carritoActions

  //Variable que usa el useEffect para el navbar oscuro, traida por JQUERY
  const navbar_oscuro = document.querySelector('.Navbar_total')

  useEffect(() => {
    dispatch(traer_productos())
    
    navbar_oscuro?.classList.add('bg-black')
    navbar_oscuro?.classList.remove('ps_absolute')
    // eslint-disable-next-line
  }, [prodAgregado, prodEliminado])


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
    let checks = funcionCheck(event)
    let urlChecks = checks.map( (check) => `${check}`).join('&tipo=')
    let texto = inputRef.current.value.trim()
    let categorias = tipo
    if (event.target.tagName === 'LI'){
      if (event.target.outerText.includes('Todos')){
        categorias = ''
      } else{
        categorias = event.target.outerText
      }
    } else if(event.target.type === "checkbox"){
      categorias = urlChecks
    }

    dispatch(filtrar_productos({value: texto, tipo: categorias}))
  }

  let funcionCheck = (e) => {
    let auxArray = []
    if(e.target.checked){
      auxArray.push(...checked, e.target.value)
    } else {
      auxArray = checked.filter( ele => ele !== e.target.value)
    }
    setChecked(auxArray)
    return auxArray
  }

  const agregarAlCarrito = async (prod) => {
    let {nombre, precio, tipo, imagen, _id: productoId, enCarrito} = prod

    // console.log(prod);

    const data = {
        nombre,
        precio,
        tipo,
        imagen,
        productoId,
        usuarioId
    }
    
    try {
        if (logeado){
          if(enCarrito){
            dispatch(eliminar_prod_carrito(productoId))
            Toastify({
              text: `${nombre} se eliminó del carrito`,
              duration: 1750,
              style: {
                  background: "#e95f47",
                  color: "#000"
              },
            }).showToast();
          } else{
            let resp = await dispatch(agregar_producto(data))
            // console.log(resp.payload.response);
            if (resp.payload.response.success){
                Toastify({
                    text: `${resp.payload.response.data.nombre} se agregó al carrito.`,
                    duration: 1500,
                    style: {
                        background: "#006400",
                    },
                }).showToast();
            } else {
                Toastify({
                    text: 'Hubo un error al procesar el producto',
                    duration: 1500,
                    style: {
                        background: "#e95f47",
                    },
                }).showToast();
            }
          }
        } else {
            Swal.fire({
                title: 'Iniciá sesión!',
                text: 'Para continuar con tu compra debes tener una cuenta en Salute.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonText: 'Volver',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Iniciar Sesión'
            }).then((result) => {
                if (result.isConfirmed) {
                    setTimeout(() => {
                        navigate('/ingresar')
                    }, 500)
                }
            })
        }
    } catch(error){
        console.log(error);
    }
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
          <input className='inputTexto' placeholder='Buscar bebida...' type="search" onKeyUp={filtroTexto} ref={inputRef} />
          <div className="checkbox-container">
            {todosLosTipos?.map(tipo => 
            <label key={tipo}><input onChange={filtroTexto} className='checkboxUno' type="checkbox" id={tipo} value={tipo}/>{tipo}</label>
            )}
          </div>
        </div>
        <div id='container-cards__productos'>
          {
            (productos?.length > 0)
              ? productos?.map((prod) => <CardProd3 
                  key={prod?._id} 
                  producto={prod} 
                  nombre={prod?.nombre} 
                  img={prod?.imagen} 
                  precio={prod?.precio} 
                  tipo={prod?.tipo} 
                  fnAgregar={() => agregarAlCarrito(prod)} 
                  textoBoton={prod.enCarrito ? 'Quitar' : 'Agregar'}
                  colorBoton={prod.enCarrito ? 'eliminar-prod3' : 'comprar-prod3'}
                  
                />)
              : <div className='notFoundProd'>
                  <img id='vasoNotFound' src='https://cdn-icons-png.flaticon.com/512/5386/5386124.png' alt='vaso de vidrio roto'/>
                  <span className='animate__animated animate__fadeInDown animate__slow'>No hay productos que coincidan con esa búsqueda.</span>
                </div>
          }
        </div>
      </div>
      { logeado &&
        <CarritoBoton />
      }
    </div>
  )
}