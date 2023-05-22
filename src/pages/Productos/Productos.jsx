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
import { navbar_black } from '../../Functions/NavbarResponsive'

export default function Productos() {

  let inputRef = useRef()
  let dispatch = useDispatch()
  const navigate = useNavigate()

  // Traemos del store de redux
  const { productos, tipo, todosLosTipos, nombre } = useSelector(store => store.productos)
  let { logeado, usuarioId } = useSelector(store => store.usuarios)
  let { carrito, prodAgregado, prodEliminado } = useSelector(store => store.carrito)

  // Importamos las acciones necesarias
  const { traer_productos, filtrar_productos } = productosActions
  let { agregar_producto, eliminar_prod_carrito, traer_carrito } = carritoActions

  // Variable para obtener SOLO los productos que correspondan con el usuario que esté logeado
  let tieneProductos = carrito ? carrito?.filter(el => el.usuarioId === usuarioId) : []
  // console.log(tieneProductos);
  // Variables de estado
  let [checked, setChecked] = useState([])
  let [reload, setReload] = useState(false)
  let [produsCarrito, setProdusCarrito] = useState(tieneProductos)

  // Hook para traer los productos y el carrito del usuario
  useEffect(() => {
    dispatch(traer_productos())
    dispatch(traer_carrito(usuarioId))

    navbar_black()

    // eslint-disable-next-line
  }, [prodAgregado, prodEliminado, produsCarrito, reload])

  //Hook para recargar los productos cada vez que se actualiza la pagina
  useEffect(() => {
    setReload(!reload)
    // eslint-disable-next-line
  }, [])

  //Hook para actualizar productos según la busqueda
  useEffect(() => {
    if (tipo || nombre) {
      let data = {
        value: nombre,
        tipo: tipo,
      }
      dispatch(filtrar_productos({ value: data.value, tipo: data.tipo }))
    } else {
      dispatch(traer_productos())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Funcion para filtrar busqueda de productos
  const filtroTexto = (event) => {
    // console.log(event.target.outerText);
    let checks = funcionCheck(event)
    let urlChecks = checks.map((check) => `${check}`).join('&tipo=')
    let texto = inputRef.current.value.trim()
    let categorias = tipo
    if (event.target.tagName === 'LI') {
      if (event.target.outerText.includes('Todos')) {
        categorias = ''
      } else {
        categorias = event.target.outerText
      }
    } else if (event.target.type === "checkbox") {
      categorias = urlChecks
    }

    dispatch(filtrar_productos({ value: texto, tipo: categorias }))
  }

  // Funcion para los checkbox en resoluciones pequeñas
  let funcionCheck = (e) => {
    let auxArray = []
    if (e.target.checked) {
      auxArray.push(...checked, e.target.value)
    } else {
      auxArray = checked.filter(ele => ele !== e.target.value)
    }
    setChecked(auxArray)
    return auxArray
  }

  // Funcion para agregar al carrito el producto seleccionado
  const agregarAlCarrito = async (prod) => {
    let { nombre, precio, tipo, imagen, _id: productoId } = prod

    const data = {
      nombre,
      precio,
      tipo,
      imagen,
      productoId,
      usuarioId
    }

    try {
      if (logeado) {
        await dispatch(traer_carrito(usuarioId))
        if (produsCarrito.find(ele => ele.nombre === nombre)) {
          dispatch(eliminar_prod_carrito(productoId))
          Toastify({
            text: `${nombre} se eliminó del carrito`,
            duration: 1750,
            style: {
              background: "#e95f47",
              color: "#000"
            },
          }).showToast();

          setProdusCarrito(produsCarrito.filter(ele => ele.nombre !== nombre))
        } else {
          produsCarrito.push(prod)
          let resp = await dispatch(agregar_producto(data))
          // console.log(resp.payload.response);
          if (resp.payload.response.success) {
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
          background: '#121212',
          color: '#ddd',
          showCancelButton: true,
          confirmButtonColor: '#008400',
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
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div id='productos-pagina-cont'>
      <div className='categoriaMenu'>
        <span>Categorías principales</span>
        <div id='separadorMenu'></div>
        <ul>
          <li onClick={filtroTexto} >Todos los productos</li>
          {todosLosTipos?.map(tipo =>
            <li onClick={filtroTexto} key={tipo}>{tipo}</li>
          )}
        </ul>
      </div>
      <div className='prodCont-general'>
        <div id='buscadores-cont'>
          <input className='inputTexto' placeholder='Buscar bebida...' type="search" onKeyUp={filtroTexto} ref={inputRef} />
          <div className="checkbox-container">
            {todosLosTipos?.map(tipo =>
              <label key={tipo}><input onChange={filtroTexto} className='checkboxUno' type="checkbox" id={tipo} value={tipo} />{tipo}</label>
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
                textoBoton={produsCarrito?.find(ele => ele.nombre === prod.nombre) ? 'En carrito' : 'Agregar'}
                colorBoton={produsCarrito?.find(ele => ele.nombre === prod.nombre) ? 'eliminar-prod3' : 'comprar-prod3'}

              />)
              : <div className='notFoundProd'>
                <img id='vasoNotFound' src='https://cdn-icons-png.flaticon.com/512/5386/5386124.png' alt='vaso de vidrio roto' />
                <span className='animate__animated animate__fadeInDown animate__slow'>No hay productos que coincidan con esa búsqueda.</span>
              </div>
          }
        </div>
      </div>
      {logeado &&
        <CarritoBoton />
      }
    </div>
  )
}