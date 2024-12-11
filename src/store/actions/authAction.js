import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { startLoad, stopLoad } from "../reducers/appSlice";
import AuthService from "../services/authService";

export const register = createAsyncThunk(
    'auth/register',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await AuthService.Register(data)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        } finally{
            dispatch(stopLoad())
        }
    }
)
export const login = createAsyncThunk(
    'auth/login',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await AuthService.Login(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        }finally{
            dispatch(stopLoad())
        }
    }
)