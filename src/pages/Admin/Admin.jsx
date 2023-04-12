import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productosActions from '../../redux/actions/productosActions'
import './Admin.css'
import Swal from 'sweetalert2'
import { uploadImagenes } from '../../firebase/config_firebase'
import zonasActions from '../../redux/actions/zonasActions'

export default function Admin() {

    let dispatch = useDispatch()
    //Variable que usa el useEffect para el navbar oscuro, traida por JQUERY
    const navbar_oscuro = document.querySelector('.Navbar_total')

    const { traer_productos, crear_producto, eliminar_producto, editar_producto } = productosActions
    const { traer_zonas, crear_zona, eliminar_zona, editar_zona } = zonasActions
    const { productos, todosLosTipos, nuevoProducto, productosEliminados, productosEditados } = useSelector(store => store.productos)
    const { zonas, nuevaZona, zonaEliminada, zonaEditada } = useSelector(store => store.zonas)

    let [estadoModal, setEstadoModal] = useState('modalCerrado')
    let [tipoBebida, setTipoBebida] = useState('tipoAbierto')
    let [tipoNuevoBebida, setTipoNuevoBebida] = useState('tipoNuevoCerrado')
    let [fotoProd, setFotoProd] = useState(null)

    let nuevoNombreRef = useRef()
    let nuevoPrecioRef = useRef()
    let nuevoTipoRef = useRef()
    let nuevoTipoCreadoRef = useRef()
    let nuevoFotoRef = useRef()

    let nuevaZonaNombreRef = useRef()
    let nuevaZonaPrecioRef = useRef()

    let nombreEditRef = useRef()
    let precioEditRef = useRef()
    let tipoEditRef = useRef()
    let fotoEditRef = useRef()

    useEffect(() => {
        dispatch(traer_productos())
        dispatch(traer_zonas())
        navbar_oscuro?.classList.add('bg-black')
        navbar_oscuro?.classList.remove('ps_absolute')
        /* setProdus(productos) */
        // eslint-disable-next-line
    }, [nuevoProducto, productosEliminados, productosEditados, nuevaZona, zonaEliminada, zonaEditada])


    // FUNCION para crear productos
    const nuevoProductos = async (e) => {
        e.preventDefault()

        try {
            const urlFoto = await uploadImagenes(fotoProd)
            // console.log(urlFoto);
            if (nuevoTipoRef?.current?.value === 'Tipo de bebida' && nuevoTipoCreadoRef?.current.value === "") {
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
                    imagen: urlFoto,
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
        } catch (error) {
            console.log(error.message);
        }
    }
    //FUNCION para crear zonas de entrega
    const nuevasZonas = async (e) => {
        e.preventDefault()

        try {
            const data = {
                nombre: nuevaZonaNombreRef?.current?.value,
                precio: nuevaZonaPrecioRef?.current?.value,
            }

            e.target.reset()
            dispatch(crear_zona(data))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Zona creada',
                showConfirmButton: false,
                timer: 750
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    // FUNCION para abrir el modal de creación de procutos
    const abrirModal = () => {
        estadoModal === 'modalCerrado' ? setEstadoModal('modalAbierto') : setEstadoModal('modalCerrado')
    }
    // FUNCION para abrir el input de cambiar entre "nueva categoria" y "elegir categoria"
    const abrirTipo = () => {
        if (tipoBebida === 'tipoCerrado') {
            setTipoBebida('tipoAbierto')
            setTipoNuevoBebida('tipoNuevoCerrado')
        } else if (tipoNuevoBebida === 'tipoNuevoCerrado') {
            setTipoNuevoBebida('tipoNuevoAbierto')
            setTipoBebida('tipoCerrado')
        }
    }
    // FUNCION para eliminar productos
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
    // FUNCION para eliminar zonas de entrega
    const eliminarZona = (id) => {
        Swal.fire({
            title: 'Eliminar zona?',
            text: "No podrás revertir este cambio",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(eliminar_zona(id))
                Swal.fire({
                    showConfirmButton: false,
                    title: 'Eliminado 🚮',
                    text: 'Se eliminó la zona con éxito.',
                    icon: 'success',
                    timer: 600
                })
            }
        })
    }
    // FUNCION para editar productos
    const editarProducto = (input, producto) => {
        let nombreEdit = producto.nombre
        let tipoEdit = producto.tipo
        let precioEdit = producto.precio
        let fotoEdit = producto.imagen

        if (input.target.nombre === 'editNombre') {
            nombreEdit = input.target.value
        } else if (input.target.tipo === 'editTipo') {
            tipoEdit = input.target.value
        } else if (input.target.precio === 'editPrecio') {
            precioEdit = input.target.value
        } else if (input.target.imagen === 'editFoto') {
            fotoEdit = input.target.value
        }
        nombreEdit === "" && (nombreEdit = producto.nombre);
        tipoEdit === "" && (tipoEdit = producto.tipo);
        precioEdit === "" && (precioEdit = producto.precio);
        fotoEdit === "" && (fotoEdit = producto.fotoEdit);

        let objeto = {
            nombre: nombreEdit,
            tipo: tipoEdit,
            precio: precioEdit,
            imagen: fotoEdit,
        }
        //console.log("OBJETO QUE SE DESPACHA -->",objeto);
        dispatch(editar_producto({ id: producto._id, data: objeto }))
    }
    // FUNCION para editar zonas de entrega
    const editarZona = (input, zona) => {
        let nombreEdit = zona.nombre
        let precioEdit = zona.precio

        if (input.target.name === 'editZonaNombre') {
            nombreEdit = input.target.value
        } else if (input.target.name === 'editZonaPrecio') {
            precioEdit = input.target.value
        }
        nombreEdit === "" && (nombreEdit = zona.nombre);
        precioEdit === "" && (precioEdit = zona.precio);
        let objeto = {
            nombre: nombreEdit,
            precio: precioEdit,
        }
        //console.log("OBJETO QUE SE DESPACHA -->",objeto);
        dispatch(editar_zona({ id: zona._id, data: objeto }))
    }

    return (
        // ? Texto De Entrada
        <div id='admin-pagina-cont'>
            <div className='textoAdmin'>
                <h1 id='titulo-admin'>Sección de Administrador</h1>
                <p id='texto-comoFunciona__admin'>¿Cómo funciona el editor de productos?</p>
                <div className='comoFuncionaAdmin'>
                    <p>- Todos los campos son editables, al modificar cualquier dato se actualiza automáticamente el producto, sin necesidad de hacer click en ningún botón extra.</p>
                    <p>- El botón rojo del final de cada campo elimina el producto seleccionado.</p>
                    <p>- Los datos de cada producto NO pueden quedar en blanco, ya que afectaría directamente a la página principal y, asimismo, a la experiencia del usuario.</p>
                </div>
            </div>
            {/* ? Seccion para crear nuevo producto */}
            <div className='btnNuevoProd' onClick={abrirModal}>{estadoModal === 'modalCerrado' ? '+ AGREGAR PRODUCTO' : 'CERRAR VENTANA'}</div>
            <form onSubmit={nuevoProductos} className={`${estadoModal}`}>
                <div className='admProdNuevo'>
                    <label htmlFor='admNombreProdNuevo'>
                        <input type='text' placeholder={'Nombre'} required name={'nuevoNombre'} id='admNombreProdNuevo' ref={nuevoNombreRef} />
                    </label>
                    <label htmlFor='admTipoProdNuevo' id='label-tipos'>
                        <div className='btnTipoProd' onClick={abrirTipo}>{tipoBebida === 'tipoAbierto' ? 'Crear categoría' : 'Elegir categoría'}</div>
                        <input className={`${tipoNuevoBebida}`} id='admTipoProdNuevo' type='text' placeholder='Nuevo tipo de bebida' ref={nuevoTipoCreadoRef} />
                        <select name='nuevoTipo' id='admTipoProdNuevo' className={`${tipoBebida}`} defaultValue='none' ref={nuevoTipoRef}>
                            <option defaultValue='none' >Tipo de bebida</option>
                            {(todosLosTipos?.map(p => <option key={p} value={p}>{p}</option>))}
                        </select>
                    </label>
                    <label htmlFor='admPrecioProdNuevo'>
                        <input type='number' placeholder={'Precio'} required name={'nuevoPrecio'} id='admPrecioProdNuevo' ref={nuevoPrecioRef} />
                    </label>
                    <label htmlFor='admFotoProdNuevo' className='label-fotoProd'>Imagen:
                        <input type='file' aria-label='Imagen' required name={'nuevoFoto'} id='admFotoProdNuevo' ref={nuevoFotoRef} onChange={e => setFotoProd(e?.target?.files?.[0])} />
                    </label>
                </div>
                <div>
                    <input className='inputSumbit' type='submit' value='Crear nuevo producto' />
                </div>
            </form>
            {/* Sección para editar Productos */}
            <form className='adminProd-cont'>
                {productos?.map((prod) => (
                    <div key={prod._id} className='admProd' id={prod._id}>
                        <img className='fotoProdAdm' src={prod.imagen} alt={prod.nombre} />
                        <label htmlFor='admNombreProd'>
                            <input type='text' placeholder={'Nombre'} required name={'editNombre'} ref={nombreEditRef} id='admNombreProd' onBlur={(e) => editarProducto(e, prod)} defaultValue={prod.nombre} />
                        </label>
                        <label htmlFor='admTipoProd'>
                            <select name='editTipo' id='admTipoProd' required defaultValue={prod.tipo} onBlur={(e) => editarProducto(e, prod)} ref={tipoEditRef}>
                                <option value={prod.tipo} defaultValue={prod.tipo} required>{prod.tipo}</option>
                                {(todosLosTipos?.filter(e => e !== prod.tipo).map(p => <option key={p} value={p} required >{p}</option>))}
                            </select>
                            {/* <input type='text' placeholder={'Tipo de bebida'} name={'nuevoTipo'} onChange={(e) => inputCambio(e)} id='admTipoProd' defaultValue={prod.tipo} /> */}
                        </label>
                        <label htmlFor='admPrecioProd'>
                            <input type='number' placeholder={'Precio'} required ref={precioEditRef} name={'editPrecio'} id='admPrecioProd' onBlur={(e) => editarProducto(e, prod)} defaultValue={prod.precio} />
                        </label>
                        <label htmlFor='admFotoProd'>
                            <input type='text' placeholder={'Imagen'} required ref={fotoEditRef} name={'editFoto'} id='admFotoProd' onBlur={(e) => editarProducto(e, prod)} defaultValue={prod.imagen} />
                        </label>
                        <img className='borrarProdAdm' onClick={() => eliminarProducto(prod._id)} src='https://cdn-icons-png.flaticon.com/512/1828/1828843.png' alt='eliminar' />
                    </div>
                ))}
            </form>
            {/* Seccion para editar Zonas De Entrega */}
            <form className='adminProd-cont'>
                <span className='titulo-zona__admin'>EDITAR ZONAS DE ENTREGA</span>
                {zonas?.map(zona => (
                    <div key={zona._id} className='admProd' id={zona._id} >
                        <label htmlFor='admNombreZona' className='label-zonas__admin'> Nombre:
                            <input type='text' placeholder='Nombre de zona' name='editZonaNombre' onBlur={(e) => editarZona(e, zona)} id='admNombreZona' required defaultValue={zona.nombre} />
                        </label>
                        <label htmlFor='admPrecioZona' className='label-zonas__admin'> Precio:
                            <input type='number' placeholder='Precio' name='editZonaPrecio' onBlur={(e) => editarZona(e, zona)} id='admPrecioZona' required defaultValue={zona.precio} />
                        </label>
                        <img className='borrarProdAdm-zonas' onClick={() => eliminarZona(zona._id)} src='https://cdn-icons-png.flaticon.com/512/1828/1828843.png' alt='eliminar' />
                    </div>
                ))
                }
            </form>
            <div className='adminProd-cont'>
                <span className='titulo-zona__admin'>CREAR NUEVA ZONA</span>
                <form onSubmit={nuevasZonas} className='admProd'>
                    <label htmlFor='admNuevaZonaNombre' className='label-zonas__admin'> Nombre:
                        <input type='text' placeholder='Nombre de nueva zona' name='nuevaZonaNombre' ref={nuevaZonaNombreRef} id='admNuevaZonaNombre' required />
                    </label>
                    <label htmlFor='admNuevaZonaPrecio' className='label-zonas__admin'> Precio:
                        <input type='number' placeholder='Precio de nueva zona' name='nuevaZonaPrecio' ref={nuevaZonaPrecioRef} id='admNuevaZonaPrecio' required />
                    </label>
                    <input id='input-submit-zonas__admin' type='submit' value='Crear' />
                </form>
            </div>
        </div>
    )
}