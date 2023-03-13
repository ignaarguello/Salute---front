import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productosActions from '../../redux/actions/productosActions'
import './Admin.css'
import Swal from 'sweetalert2'

export default function Admin() {

    let dispatch = useDispatch()
    const { traer_productos, crear_producto, eliminar_producto } = productosActions
    const { productos, todosLosTipos, nuevoProducto, productosEliminados } = useSelector(store => store.productos)

    let [produs, setProdus] = useState([])
    let [estadoModal, setEstadoModal] = useState('modalCerrado')

    let nuevoNombreRef = useRef()
    let nuevoPrecioRef = useRef()
    let nuevoTipoRef = useRef()
    let nuevoTipoCreadoRef = useRef()
    let nuevoFotoRef = useRef()



    useEffect(() => {
        dispatch(traer_productos())
        /* setProdus(productos) */
        // eslint-disable-next-line
    }, [nuevoProducto, productosEliminados])

    const inputCambio = (e) => {
        console.log(e);
        setProdus({ ...produs, [e.target.placeholder]: e.target.value })
    }

    const subirFormulario = async (event) => {
        event.preventDefault()
        alert("subio formulario");
    }

    const nuevoProductos = (e) => {
        e.preventDefault()

        if (nuevoTipoRef?.current?.value === 'Tipo de bebida' && nuevoTipoCreadoRef?.current.value === ""){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Selecciona un tipo de bebida',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            const data = {
                nombre: nuevoNombreRef?.current?.value,
                tipo: nuevoTipoCreadoRef?.current?.value || nuevoTipoRef?.current.value,
                precio: nuevoPrecioRef?.current?.value,
                imagen: nuevoFotoRef?.current?.value,
            }
    
            e.target.reset()
            dispatch(crear_producto(data))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto creado',
                showConfirmButton: false,
                timer: 750
            })
        }
    }

    const abrirModal = () => {
        estadoModal === 'modalCerrado' ? setEstadoModal('modalAbierto') : setEstadoModal('modalCerrado')
    }

    const eliminarProducto = (id) => {
        Swal.fire({
            title: 'Eliminar producto?',
            text: "No podrás revertir este cambio",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(eliminar_producto(id))
                Swal.fire({
                    showConfirmButton: false,
                    title: 'Eliminado 🚮',
                    text: 'Se eliminó el producto con éxito.',
                    icon: 'success',
                    timer: 600
                })
            }
        })
        
    }

    return (
        <div id='admin-pagina-cont'>
            <div className='btnNuevoProd' onClick={abrirModal}>{estadoModal === 'modalCerrado' ? '+ AGREGAR PRODUCTO' : 'CERRAR VENTANA'}</div>
            <form onSubmit={nuevoProductos} className={`${estadoModal}`}>
                <div className='admProd'>
                    <label htmlFor='admNombreProd'>
                        <input type='text' placeholder={'Nombre'} required name={'nuevoNombre'} onChange={(e) => (e)} id='admNombreProd' ref={nuevoNombreRef} />
                    </label>
                    <label htmlFor='admTipoProd'>
                        <input type='text' placeholder='Nuevo tipo de bebida' ref={nuevoTipoCreadoRef} />
                        <select name='nuevoTipo' id='admTipoProd' defaultValue='none' ref={nuevoTipoRef}>
                            <option defaultValue='none' >Tipo de bebida</option>
                            {(todosLosTipos?.map(p => <option key={p}  value={p}>{p}</option>))}
                        </select>
                    </label>
                    <label htmlFor='admPrecioProd'>
                        <input type='number' placeholder={'Precio'} required name={'nuevoPrecio'} onChange={(e) => (e)} id='admPrecioProd' ref={nuevoPrecioRef} />
                    </label>
                    <label htmlFor='admFotoProd'>
                        <input type='text' placeholder={'Imagen'} required name={'nuevoFoto'} onChange={(e) => (e)} id='admFotoProd' ref={nuevoFotoRef} />
                    </label>
                </div>
                <div className='inputSumbit'>
                    <input type='submit' value='Crear' />
                </div>
            </form>
            <h1>EDITAR PRODUCTOS</h1>
            <div>
                <form onSubmit={subirFormulario} className='adminProd-cont'>
                    {productos?.map((prod) => (
                        <div key={prod._id} className='admProd' id={prod._id}>
                            <img className='fotoProdAdm' src={prod.imagen} alt={prod.nombre} />
                            <label htmlFor='admNombreProd'>
                                <input type='text' placeholder={'Nombre'} name={'nuevoNombre'} onChange={(e) => inputCambio(e)} id='admNombreProd' defaultValue={prod.nombre} />
                            </label>
                            <label htmlFor='admTipoProd'>
                                <select name='nuevoTipo' id='admTipoProd' required>
                                    <option value="none" defaultValue={prod.tipo} required>{prod.tipo}</option>
                                    {(todosLosTipos?.filter(e => e !== prod.tipo).map(p => <option key={p} value={p} required >{p}</option>))}
                                </select>
                                {/* <input type='text' placeholder={'Tipo de bebida'} name={'nuevoTipo'} onChange={(e) => inputCambio(e)} id='admTipoProd' defaultValue={prod.tipo} /> */}
                            </label>
                            <label htmlFor='admPrecioProd'>
                                <input type='number' placeholder={'Precio'} name={'nuevoPrecio'} onChange={(e) => inputCambio(e)} id='admPrecioProd' defaultValue={prod.precio} />
                            </label>
                            <label htmlFor='admFotoProd'>
                                <input type='text' placeholder={'Imagen'} name={'nuevoFoto'} onChange={(e) => inputCambio(e)} id='admFotoProd' defaultValue={prod.imagen} />
                            </label>
                            <img className='borrarProdAdm' onClick={() => eliminarProducto(prod._id)} src='https://cdn-icons-png.flaticon.com/512/1828/1828843.png' alt='eliminar' />
                        </div>
                    ))}
                    <div className='inputSumbit'>
                        <input type='submit' value='Confirmar' />
                    </div>
                </form>
            </div>
        </div>
    )
}