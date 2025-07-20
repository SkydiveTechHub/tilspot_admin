import { createSlice } from "@reduxjs/toolkit";
import { createProvider, editProvider, getAllCategories, getAllJourney, getLocations, getMatch, getMyRecord, getPlansByProvider, getProviderByCategory, getServiceByCategory, getZonesByLocation } from "../actions";


const initialState = {
    providers: null,
    services:null,
    matches:null,
    journeyData:null,
    locations:null,
    locationDetals: {
        location:null,
        zoneInfo:[]
    },
    internetPlans:null,
    operatorStatData:null,
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
            // 
            localStorage.setItem('categories', JSON.stringify(payload))
        })
        builder.addCase(getPlansByProvider.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            state.internetPlans = payload.data.options[0].options
        })
        builder.addCase(getProviderByCategory.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            state.providers = payload.providers
        })
        builder.addCase(getLocations.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            state.locations = payload.locations
        })
        builder.addCase(getMatch.fulfilled, (state, {payload})=>{
            state.matches = payload;
        })
        builder.addCase(getAllJourney.fulfilled, (state, {payload})=>{
            
            state.journeyData = payload.data;
        })
        builder.addCase(getServiceByCategory.fulfilled, (state, {payload})=>{
            
            state.services = payload.data;
        })
        builder.addCase(createProvider.fulfilled, (state, {payload})=>{
            state.isLoading = false;
        })
        builder.addCase(editProvider.fulfilled, (state, {payload})=>{
            state.isLoading = false;
        })

        builder.addCase(getZonesByLocation.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            
            state.locationDetals = payload.data
        })
        builder.addCase(getMyRecord.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            
            state.operatorStatData = payload.responseData[0]
        })



    }
})
export const { checkCategory } = providerSlice.actions;
export default providerSlice.reducer