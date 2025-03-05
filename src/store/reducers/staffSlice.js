import { createSlice } from "@reduxjs/toolkit";
import { createStaff, getAllStaffs, getAllTransactions, getOperatorRecord, getTransactionsByCategory, getUserStat } from "../actions";

const initialState = {
    staffs: null,
    usersStat:{
        users:{},
        bills:{}
    },
    operatorstat:null,
    isLoading: false,
    transactions:null
}


const staffSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{

        //   logout(state) {
        //     localStorage.clear();
        //     state.userInfo = {};
        //     state.token = "";
        //   },
    },
    extraReducers: (builder) =>{

        builder.addCase(getAllStaffs.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            state.staffs = payload
        })
        builder.addCase(getUserStat.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            state.usersStat = payload
        })
        builder.addCase(getOperatorRecord.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            
            state.operatorstat = payload
        })
        builder.addCase(createStaff.fulfilled, (state, {payload})=>{
            state.isLoading = false;
        })


        builder.addCase(getAllTransactions.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            console.log(payload)
            state.transactions = payload.transactions.undefined
        })
        builder.addCase(getTransactionsByCategory.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            console.log(payload)
            state.transactions = payload.transactions.undefined
        })

    }
})

export default staffSlice.reducer

