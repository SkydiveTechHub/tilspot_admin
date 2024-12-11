import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import appReducer from "./reducers/appSlice";

const store = configureStore({
    reducer:{
        app: appReducer,
        auth: authReducer
    }
})

export default store