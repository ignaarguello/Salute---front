import React, { useEffect, useState }  from 'react'
import CarritoItem from '../../components/CarritoItem/CarritoItem'
import './Carrito.css'
import { useDispatch, useSelector } from 'react-redux'
import zonasActions from '../../redux/actions/zonasActions'
import carritoActions from '../../redux/actions/carritoActions'
import Swal from 'sweetalert2'
import axios from 'axios'
import { BASE_URL } from '../../Api/Api'
/* import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('ACCESS_TOKEN'); */

export default function Carrito() {

    // let {productos} = useSelector( store => store.productos)
    let {zonas} = useSelector( store => store.zonas)
    let {usuarioId, nombre, apellido, email} = useSelector(store => store.usuarios)
    let {carrito, prodEliminado, prodAgregado, prodEditado} = useSelector( store => store.carrito)
    let dispatch = useDispatch()
    let {traer_zonas} = zonasActions
    let {traer_carrito, eliminar_prod_carrito, cambiar_cantidad_carrito} = carritoActions

    let [zonaElegida, setZonaElegida] = useState()

    useEffect( () => {
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

    // console.log(cantidadTotal);

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
        dispatch(cambiar_cantidad_carrito({productoId: e.productoId, query: 'incrementar', usuarioId: usuarioId}))
    }

    const restarCantidad = (e) => {
        dispatch(cambiar_cantidad_carrito({productoId: e.productoId, query: 'decrementar', usuarioId: usuarioId}))
    }

    const finalizarCompra = async() => {
        let tituloCompra = carrito?.map(e => e.nombre).join(', ')
        // console.log(carrito)

        // console.log(zonaElegida);

        let data = {
            titulo: tituloCompra,
            precio: precioTotal,
            cantidad: cantidadTotal,
            imagen: carrito?.[0].imagen,
            nombreComprador: nombre,
            apellidoComprador: apellido,
            emailComprador: email,    
        }
        try{
            let res = await axios.post(`${BASE_URL}/payment`, data)
            console.log(res);
            if(res){
                window.location.replace(res.data.init_point)
            }
            

        } catch(error){
            console.log(error);
        }
    }

    /* const customization = {
        texts: {
            action: 'buy',
            valueProp: 'security_details',
        },
        visual: {
            buttonBackground: 'black',
            borderRadius: '6px',
        },
    } */

    return (
        <div id='carrito-paginaCont'>
            <div className='primerCont-carrito'>
                <h2>Tu carrito de compras</h2>
                { carrito
                    && (carrito.length > 0)
                        ? <span>{carrito.length > 1 ? `${carrito.length} productos` : `${carrito.length} producto`} en total</span>
                        : <span>En la sección productos podrás llenar tu carrito!</span>
                }
                <div className='item-carritoCont'>
                { carrito
                    &&   (carrito.length > 0)
                        ? carrito.map( prod => <CarritoItem 
                            key={prod._id} 
                            cantidad= {prod?.cantidad}
                            nombre={prod?.nombre} 
                            img={prod?.imagen} 
                            tipo={prod?.tipo} 
                            precio={prod?.precio} 
                            fnBorrar={() => borrarProd(prod)}
                            fnRestar= {() => restarCantidad(prod)}
                            fnSumar= {() => sumarCantidad(prod)}
                            />)
                        : <span>No hay productos</span>
                }
                </div>
            </div>
            { carrito
                &&  (carrito.length > 0)
                && 
                <div className='segundoCont-carrito'>
                    <h2>Resumen</h2>
                    <div className='total-carritoCont'>
                        <div className='subtotal-carritoCont'>
                            <span id='cantidad-carrito'>{cantidadTotal > 1 ? `${cantidadTotal} artículos` : `${cantidadTotal} artículo`}</span>
                            <span id='subtotal-carrito'>${precioSubtotal.toLocaleString('es-ES')}</span>
                        </div>
                        <select id='select-zona-carrito' onChange={(e) => setZonaElegida(e?.target?.value)}>
                            <option value={0}>Elija la zona de entrega</option>
                            {zonas?.map( zona => <option key={zona._id}  value={zona.precio}>{zona.nombre} - ${zona.precio}</option>)}
                        </select>
                        <span id='total-carrito'>TOTAL: <strong>${precioTotal.toLocaleString('es-ES')}</strong></span>
                    </div>
                    <div id='boton-pagar' onClick={finalizarCompra}>COMPRAR</div>
                    {/* <div id="wallet_container"></div> */}
                    {/* <Wallet initialization={{ preferenceId: 'wallet_container' }} /> */}
                </div>
            }
        </div>
    )
}
