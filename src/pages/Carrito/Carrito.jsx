import React, { useEffect }  from 'react'
import CarritoItem from '../../components/CarritoItem/CarritoItem'
import './Carrito.css'
import { useDispatch, useSelector } from 'react-redux'
import productosActions from '../../redux/actions/productosActions'

export default function Carrito() {

    let {productos} = useSelector( store => store.productos)
    let dispatch = useDispatch()
    let {traer_productos} = productosActions

    useEffect( () => {
        dispatch(traer_productos())
    }, [])
    console.log(productos);

    return (
        <div id='carrito-paginaCont'>
            <div className='primerCont-carrito'>
                <h2>Tu carrito de compras</h2>
                <span>5 artículos en total</span>
                <div className='item-carritoCont'>
                    <CarritoItem nombre={productos?.[0].nombre} img={productos?.[0].imagen} tipo={productos?.[0].tipo} precio={productos?.[0].precio} />
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
                        <option defaultValue='none'>Zona Rojo ($250)</option>
                    </select>
                    <span id='total-carrito'>TOTAL: $10500</span>
                </div>
                <div id='boton-pagar'>IR A PAGAR</div>
            </div>
        </div>
    )
}
