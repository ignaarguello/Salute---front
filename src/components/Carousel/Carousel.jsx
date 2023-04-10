import React from 'react'
import './Carousel.css'
import { useEffect } from 'react'
import productosActions from '../../redux/actions/productosActions'
import { useDispatch, useSelector } from 'react-redux'
import { MdAddCircle } from "react-icons/md";

export default function Carousel() {

    const dispatch = useDispatch()
    const { traer_productos } = productosActions
    const { productos } = useSelector(store => store.productos)
    const { logeado, usuarioId } = useSelector(store => store.usuarios)

    useEffect(() => {
        dispatch(traer_productos())
    }, [])

    const find_product = (producto) => {
        if (logeado) {
            let producto_encontrado = productos.find(e => e.nombre === producto)
            console.log(producto_encontrado)
        }
    }

    return (
        <div id='container-general__carousel'>
            <h2 id='tituloProductos__carousel'>+Productos</h2>
            <div id='container-cards__carousel'>
                {productos.map(producto =>
                    <div className='card_carousel'>
                        <div className='container-image-card__carousel'>
                            <img className='imagen-card__carousel' src={producto.imagen} alt="Producto Salute" />
                        </div>
                        <div id='container-body-card__carousel'>
                            <h2 className='item-card__carousel'>{producto.nombre}</h2>
                            <h2 className='item-card__carousel'>{producto.tipo}</h2>
                            <div id='contenedor-boton-compra__carousel'>
                                <h2 className='item-card__carousel-separado'>${producto.precio}</h2>
                                <MdAddCircle id='button-agregar__carousel' onClick={()=>find_product(producto.nombre)} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
