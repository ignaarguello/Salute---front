import { createReducer } from "@reduxjs/toolkit";
import usuariosActions from '../actions/usuariosActions'

const { nuevo_usuario, ingreso_usuario } = usuariosActions

const initialState = {
    usuarios: [],
    nombre: '',
    rol: '',
    logeado: false,
    token: '',
}

const usuarios_reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(nuevo_usuario.fulfilled, (state, action) => {
            if (action.payload.success) {
                return state.perfiles.push(action.payload.response)
            }
        })
        .addCase(ingreso_usuario.fulfilled, (state, action) => {
            console.log(action)
            const { success, response } = action.payload
            if (success) {
                let { user, token } = response
                localStorage.setItem('token', JSON.stringify({ token: { user: token } }))
                let newState = {
                    ...state,
                    nombre: user.nombre,
                    rol: user.role,
                    logeado: true,
                    token: token
                }

                return newState
            } else {
                let newState = {
                    ...state,
                    messagge: response
                }
                return newState
            }
        })
})


export default usuarios_reducer