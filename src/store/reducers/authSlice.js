import { createSlice } from "@reduxjs/toolkit";
import { register } from "../actions/authAction";

const initialState = {
    user: null,
    isLoading: false
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(register.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(register.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user = action.payload
        })
        builder.addCase(register.rejected, (state)=>{
            state.isLoading = false
        })
    }
})

export default authSlice.reducer