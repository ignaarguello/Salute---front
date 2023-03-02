import { createReducer } from "@reduxjs/toolkit";
import productosActions from "../actions/productosActions";

const { traer_productos, filtrar_productos } = productosActions

const initialState = {
    productos: [],
}

const productosReducer = createReducer(initialState, (builder) =>{
    builder
        .addCase(traer_productos.fulfilled, (state,action) =>{
            console.log(action)
            return{
                ...state,
                productos: action.payload,
            }
        })
        .addCase(filtrar_productos.fulfilled, (state, action) => {
            return{
                ...state,
                ...action.payload,
            }
        })
})



export default productosReducer