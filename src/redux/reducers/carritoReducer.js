import { createReducer } from "@reduxjs/toolkit";
import carritoActions from "../actions/carritoActions";

const { traer_carrito, eliminar_prod_carrito, agregar_producto } = carritoActions

const initialState = {
    carrito: [],
    prodEliminado: [],
    prodAgregado: [],
    mensaje: '',
}

const carritoReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(traer_carrito.fulfilled, (state, action) => {
            console.log(action.payload);
            return {
                ...state,
                carrito: action.payload,
            }
        })

        .addCase(eliminar_prod_carrito.fulfilled, (state, action) => {
            return{
                ...state,
                prodEliminado: action.payload,
            }
        })

        .addCase(agregar_producto.fulfilled, (state, action) => {
            return {
                ...state,
                prodAgregado: action.payload,
            }
        })
})

export default carritoReducer