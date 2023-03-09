import { createReducer } from "@reduxjs/toolkit";
import productosActions from "../actions/productosActions";

const { traer_productos, filtrar_productos } = productosActions

const initialState = {
    productos: [],
    todosLosTipos: [],
    tipo: '',
    nombre: ''
}

const productosReducer = createReducer(initialState, (builder) =>{
    builder
        .addCase(traer_productos.fulfilled, (state,action) =>{
            // console.log("ACTION . PAYLOAD",action.payload);
            let todosTiposDeProducto = action.payload.map( (prod) => prod.tipo)
            let cadaTipoDeProducto = [...new Set(todosTiposDeProducto)]
            return{
                ...state,
                productos: action.payload,
                todosLosTipos: cadaTipoDeProducto,
            }
        })
        .addCase(filtrar_productos.fulfilled, (state, action) => {
            console.log("REDUCER . PAYLOAD -->",action.payload)
            return{
                ...state,
                ...action.payload,
                tipo: action.payload.tipo,
            }
        })
})



export default productosReducer