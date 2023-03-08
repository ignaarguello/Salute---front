import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productosActions from '../../redux/actions/productosActions'
import './Admin.css'


export default function Admin() {

    let dispatch = useDispatch()
    const { traer_productos } = productosActions
    const { productos, tipos } = useSelector(store => store.productos)

    let [produs, setProdus] = useState([])

    useEffect(() => {
        dispatch(traer_productos())
        setProdus(productos)
        // eslint-disable-next-line
    }, [])

    console.log(produs);

    const inputCambio = (e) => {
        console.log(e);
        setProdus({ ...produs, [e.target.placeholder]: e.target.value})
    }

    const subirFormulario = async(event) => {
        event.preventDefault()
    }

return (
        <div id='admin-pagina-cont'>
            <div className='btnNuevoProd'>+ AGREGAR PRODUCTO</div>
            <h1>EDITAR PRODUCTOS</h1>
            <div>
                <form onSubmit={subirFormulario} className='adminProd-cont'>
                    {productos?.map( (prod) => (
                        <div className='admProd'>
                            <img className='fotoProdAdm' src={prod.imagen} alt={prod.nombre} />
                            <label htmlFor='admNombreProd'>
                                <input type='text' placeholder={'Nombre'} name={'nuevoNombre'} onChange={(e) => inputCambio(e)} id='admNombreProd' defaultValue={prod.nombre} />
                            </label>
                            <label htmlFor='admTipoProd'>
                                <select name='nuevoTipo' id='admTipoProd' required>
                                    <option value="none" defaultValue={prod.tipo} required>{prod.tipo}</option>
                                    {(tipos?.filter(e => e !== prod.tipo).map(p =>  <option key={p} value={p} required >{p}</option>))}
                                </select>
                                {/* <input type='text' placeholder={'Tipo de bebida'} name={'nuevoTipo'} onChange={(e) => inputCambio(e)} id='admTipoProd' defaultValue={prod.tipo} /> */}
                            </label>
                            <label htmlFor='admPrecioProd'>
                                <input type='number' placeholder={'Precio'} name={'nuevoPrecio'} onChange={(e) => inputCambio(e)} id='admPrecioProd' defaultValue={prod.precio} />
                            </label>
                            <label htmlFor='admFotoProd'>
                                <input type='text' placeholder={'Imagen'} name={'nuevoFoto'} onChange={(e) => inputCambio(e)} id='admFotoProd' defaultValue={prod.imagen} />
                            </label>
                            <img className='borrarProdAdm' src='https://cdn-icons-png.flaticon.com/512/1828/1828843.png' alt='eliminar' />
                        </div>
                    ))}
                    <div className='inputSumbit'>
                        <input type='submit' value='Confirmar'/>
                    </div>
                </form>
            </div> 
        </div>
    )
}
