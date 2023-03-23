import { createReducer } from "@reduxjs/toolkit";
import zonasActions from "../actions/zonasActions";

const { traer_zonas, crear_zona } = zonasActions

const initialState = {
    zonas: [],
    nuevaZona: [],
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
})

export default zonasReducer