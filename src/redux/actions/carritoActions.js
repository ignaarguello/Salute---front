import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Api/Api";

const traer_carrito = createAsyncThunk('traer_carrito', async(id) => {
    try{
        const res = await axios.get(`${BASE_URL}/carrito?usuarioId=${id}`)
        // console.log("traer carrito",res);
        return res.data.data
    } catch(error){
        console.log(error.message);
    }
})

const eliminar_prod_carrito = createAsyncThunk('eliminar_prod_carrito', async(id) => {
    try{
        const res = await axios.delete(`${BASE_URL}/carrito/${id}`)
        return res
    } catch(error){
        console.log(error.message);
    }
})

const agregar_producto = createAsyncThunk('agregar_producto', async(data) => {
    try{
        const res = await axios.post(`${BASE_URL}/carrito`, data)
        // console.log(res);
        return {
            response: res.data,
            success: true
        }
    } catch(error){
        console.log(error)
        return{
            success: false,
            response: error.message
        }
    }
})


const carritoActions = {
    traer_carrito,
    eliminar_prod_carrito,
    agregar_producto,
}

export default carritoActions