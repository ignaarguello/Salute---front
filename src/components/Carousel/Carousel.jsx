import React from 'react'
import './Carousel.css'
import { useEffect } from 'react'
import productosActions from '../../redux/actions/productosActions'
import { useDispatch, useSelector } from 'react-redux'
import { MdAddCircle } from "react-icons/md";
import { useNavigate } from 'react-router-dom'

export default function Carousel() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //?Acciones de redux:
    const { traer_productos } = productosActions

    //? Selectores de redux:
    const { productos } = useSelector(store => store.productos)

    //! Use Effect que trae los pruductos de la Base de datos
    useEffect(() => {
        dispatch(traer_productos())
    }, [])


    return (
        <div id='container-general__carousel'>
            <h2 id='tituloProductos__carousel'>+ Mas Productos</h2>
            <div id='container-cards__carousel'>
                {productos.map(producto =>
                    <div className='card_carousel' key={producto._id}>
                        <div className='container-image-card__carousel'>
                            <img className='imagen-card__carousel' src={producto.imagen} alt="Producto Salute" />
                        </div>
                        <div id='container-body-card__carousel'>
                            <h2 className='item-card__carousel'>{producto.nombre}</h2>
                            <h2 className='item-card__carousel'>{producto.tipo}</h2>
                            <div id='contenedor-boton-compra__carousel'>
                                <h2 className='item-card__carousel-separado'>${producto.precio}</h2>
                                <MdAddCircle id='button-agregar__carousel' onClick={() => navigate('/productos')} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
