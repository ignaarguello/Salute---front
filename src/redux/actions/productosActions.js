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

const filtrar_productos = createAsyncThunk('filtrar_productos', async ({tipo,value}) => {
    let url = `${BASE_URL}/productos?nombre=${value}&tipo=${tipo}`
    try{
        const res = await axios.get(url)
        console.log("ACTION FILTRO-->",res.data);
        return{
            productos: res.data.response,
            tipo,
            nombre: value
        }
    } catch(error){
        console.log(error.message);
        return { payload: error}
    }
})








const productosActions = {
    traer_productos,
    filtrar_productos,
}


export default productosActions