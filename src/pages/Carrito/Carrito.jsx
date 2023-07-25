import React, { useEffect, useRef, useState }  from 'react'
import CarritoItem from '../../components/CarritoItem/CarritoItem'
import './Carrito.css'
import { useDispatch, useSelector } from 'react-redux'
import zonasActions from '../../redux/actions/zonasActions'
import carritoActions from '../../redux/actions/carritoActions'
import Swal from 'sweetalert2'
import axios from 'axios'
import { BASE_URL } from '../../Api/Api'

export default function Carrito() {

    let {zonas} = useSelector( store => store.zonas)
    let {usuarioId, nombre, apellido, email} = useSelector(store => store.usuarios)
    let {carrito, prodEliminado, prodAgregado, prodEditado} = useSelector( store => store.carrito)
    let dispatch = useDispatch()
    let { traer_zonas } = zonasActions
    let { traer_carrito, eliminar_prod_carrito, cambiar_cantidad_carrito } = carritoActions

    let [zonaElegida, setZonaElegida] = useState()
    let [mostrarMapa, setMostrarMapa] = useState('mapa-cerrado')

    let zonaComprador = useRef()
    let direccionComprador = useRef()
    let alturaComprador = useRef()
    let postalComprador = useRef()
    let celularComprador = useRef()
    let dniComprador = useRef()

    useEffect(() => {
        // dispatch(traer_productos())
        dispatch(traer_zonas())
        dispatch(traer_carrito(usuarioId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prodEliminado, prodAgregado, prodEditado])

    const precioSubtotal = carrito && carrito.reduce((total, prod) => {
        return total + prod.precio * prod.cantidad
    }, 0)

    const cantidadTotal = carrito && carrito.reduce((total, prod) => {
        return total + prod.cantidad
    }, 0)

    const precioTotal = precioSubtotal + (zonaElegida ? parseInt(zonaElegida) : 0)

    const borrarProd = (e) => {
        Swal.fire({
            title: 'Quitar del carrito?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(eliminar_prod_carrito(e.productoId))
                Swal.fire({
                    showConfirmButton: false,
                    title: 'Eliminado',
                    text: 'Se eliminó el producto con éxito.',
                    icon: 'success',
                    timer: 650
                })
            }
        })

    }

    const sumarCantidad = (e) => {
        dispatch(cambiar_cantidad_carrito({ productoId: e.productoId, query: 'incrementar', usuarioId: usuarioId }))
    }

    const restarCantidad = (e) => {
        dispatch(cambiar_cantidad_carrito({ productoId: e.productoId, query: 'decrementar', usuarioId: usuarioId }))
    }

    const finalizarCompra = async() => {
        let tituloCompra = carrito?.map(e => e.nombre).join(', ')

        let data = {
            precio: precioTotal,
            cantidad: cantidadTotal,
            imagen: carrito?.[0].imagen,
            nombreComprador: nombre,
            apellidoComprador: apellido,
            emailComprador: email,
            direccionComprador: direccionComprador?.current?.value,
            alturaComprador: alturaComprador?.current?.value,
            postalComprador: postalComprador?.current?.value,
            celularComprador: celularComprador?.current?.value,
            dniComprador: dniComprador?.current?.value,
            usuarioId,
        }

        if(data.direccionComprador.length === 0 || data.alturaComprador.length === 0 || data.postalComprador.length === 0 || data.celularComprador.length === 0 || data.dniComprador.length === 0){
            Swal.fire({
                position: 'centre',
                icon: 'error',
                title: 'Los campos de entrega deben completarse',
                showConfirmButton: false,
                timer: 1800
            })
        } else if(zonaComprador.current.value === 'none'){
            Swal.fire({
                position: 'centre',
                icon: 'error',
                title: 'Seleccione una zona',
                showConfirmButton: false,
                timer: 1800
            })
        } else{
            try{
                let res = await axios.post(`${BASE_URL}/payment`, data)
                console.log(res);
                if(res){
                    window.location.replace(res.data.response.init_point)
                }
                
    
            } catch(error){
                console.log(error);
            }
        }
    }

    return (
        <div id='carrito-paginaCont'>
            <div className='primerCont-carrito'>
                <h2>Tu carrito de compras</h2>
                {carrito
                    && (carrito.length > 0)
                    ? <span>{carrito.length > 1 ? `${carrito.length} productos` : `${carrito.length} producto`} en total</span>
                    : <span>En la sección productos podrás llenar tu carrito!</span>
                }
                <div className='item-carritoCont'>
                    {carrito
                        && (carrito.length > 0)
                        ? carrito.map(prod => <CarritoItem
                            key={prod._id}
                            cantidad={prod?.cantidad}
                            nombre={prod?.nombre}
                            img={prod?.imagen}
                            tipo={prod?.tipo}
                            precio={prod?.precio}
                            fnBorrar={() => borrarProd(prod)}
                            fnRestar={() => restarCantidad(prod)}
                            fnSumar={() => sumarCantidad(prod)}
                        />)
                        : <span>No hay productos</span>
                    }
                </div>
            </div>
            {carrito
                && (carrito.length > 0)
                &&
                <div className='segundoCont-carrito'>
                    <h2>Resumen</h2>
                    <div className='total-carritoCont'>
                        <div className='subtotal-carritoCont'>
                            <span id='cantidad-carrito'>{cantidadTotal > 1 ? `${cantidadTotal} artículos` : `${cantidadTotal} artículo`}</span>
                            <span id='subtotal-carrito'>${precioSubtotal.toLocaleString('es-ES')}</span>
                        </div>
                        <select id='select-zona-carrito' required onChange={(e) => setZonaElegida(e?.target?.value)} ref={zonaComprador}>
                            <option value='none'>Elija la zona de entrega</option>
                            {zonas?.map( zona => <option key={zona._id}  value={zona.precio}>{zona.nombre} - ${zona.precio}</option>)}
                        </select>
                        <span className='boton-mapa-carrito' onClick={() => setMostrarMapa('mapa-abierto')}>VER MAPA DE ZONAS</span>
                        <span id='total-carrito'>TOTAL: <strong>${precioTotal.toLocaleString('es-ES')}</strong></span>
                    </div>
                    {/* <div id="wallet_container"></div> */}
                    {/* <Wallet initialization={{ preferenceId: 'wallet_container' }} /> */}
                    <div className='datos-comprador-cont'>
                        <span>Datos de entrega</span>
                        <label>Dirección de entrega
                            <input type='text' className='inputCarrito' ref={direccionComprador} required />
                        </label>
                        <label> Altura
                            <input type='number' className='inputCarrito' ref={alturaComprador} required />
                        </label>
                        <label>Código Postal
                            <input type='number' className='inputCarrito' ref={postalComprador} required/>
                        </label>
                        <label>Celular
                            <div id='label-celular'>
                                <span>11</span>
                                <input type='number' className='inputCarrito' ref={celularComprador} required />
                            </div>
                        </label>
                        <label>DNI (sin puntos ni guiones)
                            <input type='number' className='inputCarrito' ref={dniComprador} required/>
                        </label>
                    </div>
                    <div id='boton-pagar' onClick={finalizarCompra}>COMPRAR</div>
                </div>
            }
            <div className={mostrarMapa}>
                <span onClick={() => setMostrarMapa('mapa-cerrado')}>x</span>
                <iframe className='mapa-carrito' src="https://www.google.com/maps/d/u/0/embed?mid=16cnMi0dh5EM0cmAK8CzGNTNkltTiWVo&ehbc=2E312F" title='Mapa de entregas' />
            </div>
        </div>
    )
}
