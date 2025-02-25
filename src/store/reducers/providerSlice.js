import { createSlice } from "@reduxjs/toolkit";
import { createProvider, editProvider, getAllCategories, getAllJourney, getJourneyDetails, getMatch, getMyRecord, getProviderByCategory, getZonesByLocation } from "../actions";


const initialState = {
    providers: null,
    matches:null,
    journeyData:null,
    locationDetals: {
        location:null,
        zoneInfo:[]
    },
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
        builder.addCase(getAllJourney.fulfilled, (state, {payload})=>{
            console.log(payload)
            state.journeyData = payload.data;
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
        builder.addCase(getMyRecord.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            console.log(payload)
            state.operatorStatData = payload.responseData[0]
        })



    }
})
export const { checkCategory } = providerSlice.actions;
export default providerSlice.reducer