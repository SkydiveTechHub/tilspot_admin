import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import appReducer from "./reducers/appSlice";
import  staffReducer from './reducers/staffSlice'
import providerReducer from './reducers/providerSlice'

const store = configureStore({
    reducer:{
        app: appReducer,
        auth: authReducer,
        staff: staffReducer,
        providers: providerReducer
    }
})

export default store