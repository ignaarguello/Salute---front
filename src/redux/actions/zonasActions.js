import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Api/Api";

const traer_zonas = createAsyncThunk('traer_zonas', async() => {
    try{
        const res = await axios.get(`${BASE_URL}/zonas?order=asc`)

        return res.data.response
    } catch(error){
        console.log('Error de zonas:', error.message);
    }
})

const crear_zona = createAsyncThunk('crear_zona', async(data) => {
    try{
        const res = await axios.post(`${BASE_URL}/zonas`, data)

        return res
    } catch(error){
        console.log('Error al crear zona:', error.message);
    }
})


const zonasActions = {
    traer_zonas,
    crear_zona,
}

export default zonasActions