import {  createSlice } from '@reduxjs/toolkit'



const initialState = {
    error: "",
    loading: false,
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
      startLoad(state) {
        state.loading = true;
        state.error = null;
      },
      stopLoad(state) {
        state.loading = false;
      },
  
      setError(state, { payload }) {
        state.error = payload;
      },
  
      clearError(state) {
        state.error = "";
      },
  },
})

export const { startLoad, stopLoad, setError, clearError } = appSlice.actions

export default appSlice.reducer