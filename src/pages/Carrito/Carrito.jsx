import React, { useEffect, useState }  from 'react'
import CarritoItem from '../../components/CarritoItem/CarritoItem'
import './Carrito.css'
import { useDispatch, useSelector } from 'react-redux'
// import productosActions from '../../redux/actions/productosActions'
import zonasActions from '../../redux/actions/zonasActions'
import carritoActions from '../../redux/actions/carritoActions'
import Swal from 'sweetalert2'

export default function Carrito() {

    // let {productos} = useSelector( store => store.productos)
    let {zonas} = useSelector( store => store.zonas)
    let {usuarioId} = useSelector(store => store.usuarios)
    let {carrito, prodEliminado, prodAgregado,} = useSelector( store => store.carrito)
    let dispatch = useDispatch()
    // let {traer_productos} = productosActions
    let {traer_zonas} = zonasActions
    let {traer_carrito, eliminar_prod_carrito} = carritoActions

    let [zonaElegida, setZonaElegida] = useState()

    useEffect( () => {
        // dispatch(traer_productos())
        dispatch(traer_zonas())
        dispatch(traer_carrito(usuarioId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prodEliminado, prodAgregado])

    // console.log(zonas);
    console.log(carrito);

    const precioSubtotal = carrito && carrito.reduce((total, prod) => {
        return total + prod.precio
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
    // console.log(precioSubtotal);
    // console.log(zonaElegida);

    return (
        <div id='carrito-paginaCont'>
            <div className='primerCont-carrito'>
                <h2>Tu carrito de compras</h2>
                { carrito
                    && (carrito.length > 0)
                        ? <span>{carrito.length > 1 ? `${carrito.length} artículos` : `${carrito.length} artículo`} en total</span>
                        : <span>En la sección productos podrás llenar tu carrito!</span>
                }
                <div className='item-carritoCont'>
                { carrito
                    &&   (carrito.length > 0)
                        ? carrito.map( prod => <CarritoItem key={prod._id} nombre={prod?.nombre} img={prod?.imagen} tipo={prod?.tipo} precio={prod?.precio} fnBorrar={() => borrarProd(prod)} />)
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
                            <span id='cantidad-carrito'>{carrito.length} artículos</span>
                            <span id='subtotal-carrito'>${precioSubtotal}</span>
                        </div>
                        <select id='select-zona-carrito' onChange={(e) => setZonaElegida(e?.target?.value)}>
                            <option value={0}>Elija la zona de entrega</option>
                            {zonas?.map( zona => <option key={zona._id}  value={zona.precio}>{zona.nombre} - ${zona.precio}</option>)}
                        </select>
                        <span id='total-carrito'>TOTAL: <strong>${precioTotal}</strong></span>
                    </div>
                    <div id='boton-pagar'>IR A PAGAR</div>
                </div>
            }
        </div>
    )
}
