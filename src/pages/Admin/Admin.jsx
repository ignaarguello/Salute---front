import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productosActions from '../../redux/actions/productosActions'
import './Admin.css'
import Swal from 'sweetalert2'

export default function Admin() {

    let dispatch = useDispatch()
    const { traer_productos, crear_producto, eliminar_producto, editar_producto } = productosActions
    const { productos, todosLosTipos, nuevoProducto, productosEliminados, productosEditados } = useSelector(store => store.productos)

    let [estadoModal, setEstadoModal] = useState('modalCerrado')
    let [tipoBebida, setTipoBebida] = useState('tipoAbierto')
    let [tipoNuevoBebida, setTipoNuevoBebida] = useState('tipoNuevoCerrado')

    let nuevoNombreRef = useRef()
    let nuevoPrecioRef = useRef()
    let nuevoTipoRef = useRef()
    let nuevoTipoCreadoRef = useRef()
    let nuevoFotoRef = useRef()

    let nombreEditRef = useRef()
    let precioEditRef = useRef()
    let tipoEditRef = useRef()
    let fotoEditRef = useRef()

    useEffect(() => {
        dispatch(traer_productos())
        /* setProdus(productos) */
        // eslint-disable-next-line
    }, [nuevoProducto, productosEliminados, productosEditados])

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

    const abrirTipo = () => {
        if(tipoBebida === 'tipoCerrado'){
            setTipoBebida('tipoAbierto')
            setTipoNuevoBebida('tipoNuevoCerrado')
        } else if (tipoNuevoBebida === 'tipoNuevoCerrado'){
            setTipoNuevoBebida('tipoNuevoAbierto')
            setTipoBebida('tipoCerrado')
        }
    }

    const eliminarProducto = (id) => {
        Swal.fire({
            title: 'Eliminar producto?',
            text: "No podr??s revertir este cambio",
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
                    title: 'Eliminado ????',
                    text: 'Se elimin?? el producto con ??xito.',
                    icon: 'success',
                    timer: 600
                })
            }
        })
    }

    const editarProducto = (input, producto) => {
        let nombreEdit = producto.nombre
        let tipoEdit = producto.tipo
        let precioEdit = producto.precio
        let fotoEdit = producto.imagen

        if(input.target.name === 'editNombre'){
            nombreEdit = input.target.value
        } else if(input.target.name === 'editTipo'){
            tipoEdit = input.target.value
        } else if(input.target.name === 'editPrecio'){
            precioEdit = input.target.value
        } else if(input.target.name === 'editFoto'){
            fotoEdit = input.target.value
        }
        nombreEdit === "" ? nombreEdit = producto.nombre : console.log("nada");
        tipoEdit === "" ? tipoEdit = producto.tipo : console.log("nada");
        precioEdit === "" ? precioEdit = producto.precio : console.log("nada");
        fotoEdit === "" ? fotoEdit = producto.fotoEdit : console.log("nada");

        let objeto = {
            nombre: nombreEdit,
            tipo: tipoEdit,
            precio: precioEdit,
            imagen: fotoEdit,
        }
        console.log("OBJETO QUE SE DESPACHA -->",objeto);
        dispatch(editar_producto({id: producto._id, data: objeto}))
    }

    return (
        <div id='admin-pagina-cont'>
            <div className='btnNuevoProd' onClick={abrirModal}>{estadoModal === 'modalCerrado' ? '+ AGREGAR PRODUCTO' : 'CERRAR VENTANA'}</div>
            <form onSubmit={nuevoProductos} className={`${estadoModal}`}>
                <div className='admProdNuevo'>
                    <label htmlFor='admNombreProdNuevo'>
                        <input type='text' placeholder={'Nombre'} required name={'nuevoNombre'} id='admNombreProdNuevo' ref={nuevoNombreRef} />
                    </label>
                    <label htmlFor='admTipoProdNuevo' id='label-tipos'>
                        <div className='btnTipoProd' onClick={abrirTipo}>{tipoBebida === 'tipoAbierto' ? 'Crear categor??a' : 'Elegir categor??a'}</div>
                        <input className={`${tipoNuevoBebida}`} id='admTipoProdNuevo' type='text' placeholder='Nuevo tipo de bebida' ref={nuevoTipoCreadoRef} />
                        <select name='nuevoTipo' id='admTipoProdNuevo' className={`${tipoBebida}`} defaultValue='none' ref={nuevoTipoRef}>
                            <option defaultValue='none' >Tipo de bebida</option>
                            {(todosLosTipos?.map(p => <option key={p}  value={p}>{p}</option>))}
                        </select>
                    </label>
                    <label htmlFor='admPrecioProdNuevo'>
                        <input type='number' placeholder={'Precio'} required name={'nuevoPrecio'} id='admPrecioProdNuevo' ref={nuevoPrecioRef} />
                    </label>
                    <label htmlFor='admFotoProdNuevo'>
                        <input type='text' placeholder={'Imagen'} required name={'nuevoFoto'} id='admFotoProdNuevo' ref={nuevoFotoRef} />
                    </label>
                </div>
                <div className='inputSumbit'>
                    <input type='submit' value='Crear nuevo producto' />
                </div>
            </form>

            <div className='textoAdmin'>
                <h1>EDITAR PRODUCTOS</h1>
                <p>??C??mo funciona el editor de productos?</p>
                <div className='comoFuncionaAdmin'>
                    <p>- Todos los campos son editables, al modificar cualquier dato se actualiza autom??ticamente el producto, sin necesidad de hacer click en ning??n bot??n extra.</p>
                    <p>- El bot??n rojo del final de cada campo elimina el producto seleccionado.</p>
                    <p>- Los datos de cada producto NO pueden quedar en blanco, ya que afectar??a directamente a la p??gina principal y, asimismo, a la experiencia de los clientes.</p>
                </div>
            </div>
            <div>
                <form className='adminProd-cont'>
                    {productos?.map((prod) => (
                        <div key={prod._id} className='admProd' id={prod._id}>
                            <img className='fotoProdAdm' src={prod.imagen} alt={prod.nombre} />
                            <label htmlFor='admNombreProd'>
                                <input type='text' placeholder={'Nombre'} required name={'editNombre'} ref={nombreEditRef}  id='admNombreProd' onBlur={(e) => editarProducto(e, prod)} defaultValue={prod.nombre} />
                            </label>
                            <label htmlFor='admTipoProd'>
                                <select name='editTipo' id='admTipoProd' required defaultValue={prod.tipo} onBlur={(e) => editarProducto(e, prod)} ref={tipoEditRef}>
                                    <option value={prod.tipo} defaultValue={prod.tipo} required>{prod.tipo}</option>
                                    {(todosLosTipos?.filter(e => e !== prod.tipo).map(p => <option key={p} value={p} required >{p}</option>))}
                                </select>
                                {/* <input type='text' placeholder={'Tipo de bebida'} name={'nuevoTipo'} onChange={(e) => inputCambio(e)} id='admTipoProd' defaultValue={prod.tipo} /> */}
                            </label>
                            <label htmlFor='admPrecioProd'>
                                <input type='number' placeholder={'Precio'} required ref={precioEditRef} name={'editPrecio'}  id='admPrecioProd' onBlur={(e) => editarProducto(e, prod)} defaultValue={prod.precio} />
                            </label>
                            <label htmlFor='admFotoProd'>
                                <input type='text' placeholder={'Imagen'} required ref={fotoEditRef} name={'editFoto'}  id='admFotoProd' onBlur={(e) => editarProducto(e, prod)} defaultValue={prod.imagen} />
                            </label>
                            {/* <img className='editarProdAdm' onClick={() => editarProducto(prod)} src='https://cdn-icons-png.flaticon.com/512/9631/9631875.png' alt='confirmar cambios'/> */}
                            <img className='borrarProdAdm' onClick={() => eliminarProducto(prod._id)} src='https://cdn-icons-png.flaticon.com/512/1828/1828843.png' alt='eliminar' />
                        </div>
                    ))}
                </form>
            </div>
        </div>
    )
}