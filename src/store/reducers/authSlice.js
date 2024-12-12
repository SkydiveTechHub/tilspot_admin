import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../actions/authAction";

const initialState = {
    user: null,
    isLoading: false
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        checkAuth(state) {
            const userInfo = JSON.parse(localStorage.getItem("userData"));
            const userToken = (localStorage.getItem("token"));
            if(userInfo){
            state.user = userInfo;                
        }


            if(userToken){
               state.token = userInfo.token; 
            }
            
          },

          logout(state) {
            localStorage.clear();
            state.userInfo = {};
            state.token = "";
          },
    },
    extraReducers: (builder) =>{
        builder.addCase(register.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(register.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            console.log(payload)
            state.user = payload
        })
        builder.addCase(register.rejected, (state)=>{
            state.isLoading = false
        })
        builder.addCase(login.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(login.fulfilled, (state, {payload})=>{
            localStorage.setItem('userData', JSON.stringify(payload.data.user))
            localStorage.setItem('token', payload.data.user.token)
            localStorage.setItem('role', payload.data.user.role)
            state.isLoading = false;
            state.user = payload.data.user
        })
        builder.addCase(login.rejected, (state)=>{
            state.isLoading = false
        })
    }
})
export const { checkAuth, logout } = authSlice.actions;
export default authSlice.reducer