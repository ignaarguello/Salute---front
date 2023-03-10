import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productosActions from '../../redux/actions/productosActions'
import './Admin.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { BASE_URL } from '../../Api/Api'

export default function Admin() {

    let dispatch = useDispatch()
    const { traer_productos } = productosActions
    const { productos, todosLosTipos } = useSelector(store => store.productos)

    let [produs, setProdus] = useState([])
    let [estadoModal, setEstadoModal] = useState('cerrado')
    let [dataFinal, setDataFinal] = useState(null)

    let nuevoNombreRef = useRef()
    let nuevoPrecioRef = useRef()
    let nuevoTipoRef = useRef()
    let nuevoFotoRef = useRef()
    let nuevoTipo2Ref = useRef()



    useEffect(() => {
        dispatch(traer_productos())
        setProdus(productos)
        // eslint-disable-next-line
    }, [productos])

    const inputCambio = (e) => {
        console.log(e);
        setProdus({ ...produs, [e.target.placeholder]: e.target.value})
    }

    const subirFormulario = async(event) => {
        event.preventDefault()
        alert("subio formulario");
    }

    const nuevoProducto = (e) => {
        e.preventDefault()
        
        const data = {
            nombre: nuevoNombreRef?.current?.value,
            tipo: nuevoTipo2Ref?.current?.value,
            precio: nuevoPrecioRef?.current?.value,
            imagen: nuevoFotoRef?.current?.value,
        }
        setDataFinal(data)
        alert("nuevo producto agregado")
        e.target.reset()
    }

    useEffect( () => {
        axios.post(`${BASE_URL}/productos`, dataFinal)
            .then(response => {
                console.log(response);
            })
            .catch( error => {
                console.log(error);
            })
    }, [dataFinal])



    const abrirModal = () => {
        estadoModal === 'cerrado' ? setEstadoModal('abierto') : setEstadoModal('cerrado')
    }

return (
        <div id='admin-pagina-cont'>
            <div className='btnNuevoProd' onClick={abrirModal}>{estadoModal === 'cerrado' ? '+ AGREGAR PRODUCTO' : 'CERRAR VENTANA'}</div>
            <form onSubmit={nuevoProducto} className={`${estadoModal}`}>
                <div className='admProd'>
                    <label htmlFor='admNombreProd'>
                        <input type='text' placeholder={'Nombre'} name={'nuevoNombre'} onChange={(e) => (e)} id='admNombreProd' ref={nuevoNombreRef} />
                    </label>
                    <label htmlFor='admTipoProd'>
                        <input type='text' placeholder='Nuevo tipo de bebida' ref={nuevoTipo2Ref} />
                        <select name='nuevoTipo' id='admTipoProd'>
                            <option defaultValue='none' >Tipo de bebida</option>
                                {(todosLosTipos?.map(p =>  <option key={p} value={p} ref={nuevoTipoRef} >{p}</option>))}
                        </select>
                    </label>
                    <label htmlFor='admPrecioProd'>
                        <input type='number' placeholder={'Precio'} name={'nuevoPrecio'} onChange={(e) => (e)} id='admPrecioProd' ref={nuevoPrecioRef} />
                    </label>
                    <label htmlFor='admFotoProd'>
                        <input type='text' placeholder={'Imagen'} name={'nuevoFoto'} onChange={(e) => (e)} id='admFotoProd' ref={nuevoFotoRef} />
                    </label>
                </div>
        
                    <div className='inputSumbit'>
                        <input type='submit' value='Crear'/>
                    </div>
                </form>
            <h1>EDITAR PRODUCTOS</h1>
            <div>
                <form onSubmit={subirFormulario} className='adminProd-cont'>
                    {productos?.map( (prod) => (
                        <div key={prod._id} className='admProd' id={prod._id}>
                            <img className='fotoProdAdm' src={prod.imagen} alt={prod.nombre} />
                            <label htmlFor='admNombreProd'>
                                <input type='text' placeholder={'Nombre'} name={'nuevoNombre'} onChange={(e) => inputCambio(e)} id='admNombreProd' defaultValue={prod.nombre} />
                            </label>
                            <label htmlFor='admTipoProd'>
                                <select name='nuevoTipo' id='admTipoProd' required>
                                    <option value="none" defaultValue={prod.tipo} required>{prod.tipo}</option>
                                    {(todosLosTipos?.filter(e => e !== prod.tipo).map(p =>  <option key={p} value={p} required >{p}</option>))}
                                </select>
                                {/* <input type='text' placeholder={'Tipo de bebida'} name={'nuevoTipo'} onChange={(e) => inputCambio(e)} id='admTipoProd' defaultValue={prod.tipo} /> */}
                            </label>
                            <label htmlFor='admPrecioProd'>
                                <input type='number' placeholder={'Precio'} name={'nuevoPrecio'} onChange={(e) => inputCambio(e)} id='admPrecioProd' defaultValue={prod.precio} />
                            </label>
                            <label htmlFor='admFotoProd'>
                                <input type='text' placeholder={'Imagen'} name={'nuevoFoto'} onChange={(e) => inputCambio(e)} id='admFotoProd' defaultValue={prod.imagen} />
                            </label>
                            <img className='borrarProdAdm' onClick={() => console.log(prod._id)} src='https://cdn-icons-png.flaticon.com/512/1828/1828843.png' alt='eliminar' />
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
