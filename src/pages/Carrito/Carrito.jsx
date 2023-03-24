import React, { useEffect }  from 'react'
import CarritoItem from '../../components/CarritoItem/CarritoItem'
import './Carrito.css'
import { useDispatch, useSelector } from 'react-redux'
import productosActions from '../../redux/actions/productosActions'
import zonasActions from '../../redux/actions/zonasActions'

export default function Carrito() {

    let {productos} = useSelector( store => store.productos)
    let {zonas} = useSelector( store => store.zonas)
    let dispatch = useDispatch()
    let {traer_productos} = productosActions
    let {traer_zonas} = zonasActions

    useEffect( () => {
        dispatch(traer_productos())
        dispatch(traer_zonas())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(zonas);

    return (
        <div id='carrito-paginaCont'>
            <div className='primerCont-carrito'>
                <h2>Tu carrito de compras</h2>
                <span>5 artículos en total</span>
                <div className='item-carritoCont'>
                    <CarritoItem nombre={productos?.[0]?.nombre} img={productos?.[0]?.imagen} tipo={productos?.[0]?.tipo} precio={productos?.[0]?.precio} />
                    <CarritoItem nombre={productos?.[1]?.nombre} img={productos?.[1]?.imagen} tipo={productos?.[1]?.tipo} precio={productos?.[1]?.precio} />
                    <CarritoItem nombre={productos?.[2]?.nombre} img={productos?.[2]?.imagen} tipo={productos?.[2]?.tipo} precio={productos?.[2]?.precio} />
                    <CarritoItem nombre={productos?.[3]?.nombre} img={productos?.[3]?.imagen} tipo={productos?.[3]?.tipo} precio={productos?.[3]?.precio} />
                    <CarritoItem nombre={productos?.[4]?.nombre} img={productos?.[4]?.imagen} tipo={productos?.[4]?.tipo} precio={productos?.[4]?.precio} />

                </div>
            </div>
            <div className='segundoCont-carrito'>
                <h2>Resumen</h2>
                <div className='total-carritoCont'>
                    <div className='subtotal-carritoCont'>
                        <span id='cantidad-carrito'>5 artículos</span>
                        <span id='subtotal-carrito'>$10250</span>
                    </div>
                    <select id='select-zona-carrito'>
                        <option defaultValue='none'>Elija la zona de entrega</option>
                        {zonas?.map( zona => <option key={zona._id} value={zona.precio}>{zona.nombre} - ${zona.precio}</option>)}
                    </select>
                    <span id='total-carrito'>TOTAL: <strong>$10500</strong></span>
                </div>
                <div id='boton-pagar'>IR A PAGAR</div>
            </div>
        </div>
    )
}
