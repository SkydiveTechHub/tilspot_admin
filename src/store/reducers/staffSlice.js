import { createSlice } from "@reduxjs/toolkit";
import { createStaff, getAllStaffs, getAllTransactions, getOperatorAllTransactions, getOperatorRecord, getOperatorTransactionsByStatus, getTransactionsByCategory, getUserStat } from "../actions";

const initialState = {
    staffs: null,
    usersStat:{
        users:{},
        bills:{}
    },
    operatorstat:null,
    isLoading: false,
    totalAmount:0,
    transactions:null,
    operatorTransactions:null,

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
            state.totalAmount = payload.totalAmount
            state.transactions = payload.transactions
        })
        builder.addCase(getTransactionsByCategory.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            state.totalAmount = payload.totalAmount
            state.transactions = payload.transactions
        })
        builder.addCase(getOperatorAllTransactions.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            state.totalAmount = payload.totalAmount
            state.operatorTransactions = payload.transactions
        })
        builder.addCase(getOperatorTransactionsByStatus.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            state.totalAmount = payload.totalAmount
            state.operatorTransactions = payload.transactions
        })

    }
})

export default staffSlice.reducer

