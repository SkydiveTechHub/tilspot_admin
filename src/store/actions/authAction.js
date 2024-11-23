import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
    'auth/register',
    async (data, thunkAPI)=>{
        console.log(data)
        try {
            const res = await axios.post('', data) 
            return res
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)
export const login = createAsyncThunk(
    'auth/login',
    async (data, thunkAPI)=>{
        console.log(data)
        try {
            const res = await axios.post('', data) 
            return res
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)