import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from '../../Api/Api'



const traer_productos = createAsyncThunk('traer_productos', async () => {
    try {

        const res = await axios.get(`${BASE_URL}/productos`)

        return res.data.response

    } catch (error) {
        console.log('Error ocurrido:', error)
    }
})








const productosActions = {
    traer_productos
}


export default productosActions