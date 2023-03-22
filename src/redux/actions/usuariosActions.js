import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Api/Api";


const nuevo_usuario = createAsyncThunk('nuevo_usuario', async(data) =>{
    try{
        let res = await axios.post(`${BASE_URL}/usuarios/sign-up`, data)
        console.log(res.data.message);
        console.log(res.data);
        return {success:true, response: data}
    }catch(error){
        console.log(error)
        return { success:false, response:error.response.data.message}
    }
})


const ingreso_usuario = createAsyncThunk('ingreso_usuario', async(data) =>{
    try{
        let res = await axios.post(`${BASE_URL}/usuarios/sign-in`,data)
        // console.log(res.data.response)
        return {
            success: true,
            response: res.data.response
        }
    }catch(error){
        return { success:false, response:error.response.data.message}
    }
})



const usuariosActions = {
    nuevo_usuario,
    ingreso_usuario,
}

export default usuariosActions;