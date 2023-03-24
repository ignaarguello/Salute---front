import { createReducer } from "@reduxjs/toolkit";
import zonasActions from "../actions/zonasActions";

const { traer_zonas, crear_zona, eliminar_zona, editar_zona } = zonasActions

const initialState = {
    zonas: [],
    nuevaZona: [],
    zonaEliminada: [],
    zonaEditada: [],
}

const zonasReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(traer_zonas.fulfilled, (state, action) => {
            return {
                ...state,
                zonas: action.payload,
            }
        })

        .addCase(crear_zona.fulfilled, (state, action) => {
            return{
                ...state,
                nuevaZona: action.payload
            }
        })

        .addCase(eliminar_zona.fulfilled, (state, action) => {
            return{
                ...state,
                zonaEliminada: action.payload,
            }
        })

        .addCase(editar_zona.fulfilled, (state, action) => {
            return{
                ...state,
                zonaEditada: action.payload,
            }
        })
})

export default zonasReducer