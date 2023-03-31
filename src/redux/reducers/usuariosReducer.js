import { createReducer } from "@reduxjs/toolkit";
import usuariosActions from '../actions/usuariosActions'

const { nuevo_usuario, ingreso_usuario, ingreso_token, cerrar_sesion } = usuariosActions

const initialState = {
    usuarios: [],
    nombre: '',
    apellido: '',
    foto: '',
    rol: '',
    logeado: false,
    token: '',
    usuarioId: ''
}

const usuarios_reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(nuevo_usuario.fulfilled, (state, action) => {
            if (action.payload.success) {
                return {
                    ...state,
                    usuarios: action.payload.response
                }
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
                    apellido: user.apellido,
                    foto: user.foto,
                    rol: user.rol,
                    logeado: true,
                    token: token,
                    usuarioId: user._id,
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
        .addCase(ingreso_token.fulfilled, (state, action) => {
            console.log(action)
            const { success, response } = action.payload
            if (success) {
                let { token, user } = response
                let newState = {
                    ...state,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    foto: user.foto,
                    rol: user.rol,
                    logeado: true,
                    token: token,
                    usuarioId: user.id,
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
        .addCase(cerrar_sesion.fulfilled, (state, action) => {
            const { success, response } = action.payload

            if (success) {
                localStorage.removeItem('token')
                let newState = {
                    ...state,
                    nombre: '',
                    foto: '',
                    rol: '',
                    usuarioId: '',
                    logeado: false,
                    token: ''
                }
                return newState
            } else {
                return console.log(response)
            }
        })
})


export default usuarios_reducer