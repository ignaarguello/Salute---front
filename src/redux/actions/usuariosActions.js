import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Api/Api";


const nuevo_usuario = createAsyncThunk('nuevo_usuario', async (data) => {
    try {
        let res = await axios.post(`${BASE_URL}/usuarios/sign-up`, data)
        console.log(res.data.message);
        console.log(res.data);
        return { success: true, response: data }
    } catch (error) {
        console.log(error)
        return { success: false, response: error.response.data.message }
    }
})


const ingreso_usuario = createAsyncThunk('ingreso_usuario', async (data) => {
    try {
        let res = await axios.post(`${BASE_URL}/usuarios/sign-in`, data)
        // console.log(res.data.response)
        return {
            success: true,
            response: res.data.response
        }
    } catch (error) {
        return { success: false, response: error.response.data.message }
    }
})

const ingreso_token = createAsyncThunk('ingreso_token', async (token) => {
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    try {
        let res = await axios.post(`${BASE_URL}/usuarios/token`, null, headers)
        return {
            success: true,
            response: {
                user: res.data.response.user,
                token
            }
        }
    } catch (error) {
        return { success: false, response: error.response.data.message }
    }
})

const cerrar_sesion = createAsyncThunk('cerrar_sesion', async (token) => {
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }

    try {
        let user = await axios.put(`${BASE_URL}/usuarios/sign-out`, null, headers)
        return {
            success: true,
            response: user.data.message
        }
    } catch (error) {
        return {
            success: false,
            response: error.response.data.message
        }
    }  
})




    const usuariosActions = {
        nuevo_usuario,
        ingreso_usuario,
        ingreso_token,
        cerrar_sesion,
    }

    export default usuariosActions;