import { createSlice } from "@reduxjs/toolkit";
import { createProvider, editProvider, getAllCategories, getMatch, getProviderByCategory, getZonesByLocation } from "../actions";


const initialState = {
    providers: null,
    matches:null,
    locationDetals: {
        location:null,
        zoneInfo:[]
    },
    categories: null,
    isLoading: false
}


const providerSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        checkCategory(state) {
            const saved_categories = JSON.parse(localStorage.getItem("categories"));
            if(saved_categories){
            state.categories = saved_categories;                
        }
            
          },
    },
    extraReducers: (builder) =>{

        builder.addCase(getAllCategories.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            state.categories = payload.data
            // console.log(payload)
            localStorage.setItem('categories', JSON.stringify(payload))
        })
        builder.addCase(getProviderByCategory.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            state.providers = payload.providers
        })
        builder.addCase(getMatch.fulfilled, (state, {payload})=>{
            state.matches = payload;
        })
        builder.addCase(createProvider.fulfilled, (state, {payload})=>{
            state.isLoading = false;
        })
        builder.addCase(editProvider.fulfilled, (state, {payload})=>{
            state.isLoading = false;
        })

        builder.addCase(getZonesByLocation.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            console.log(payload)
            state.locationDetals = payload.data
        })



    }
})
export const { checkCategory } = providerSlice.actions;
export default providerSlice.reducer