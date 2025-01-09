import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoad, stopLoad } from "../reducers/appSlice";
import AuthService from "../services/authService";
import staffService from "../services/staffService";

export const getAllBills = createAsyncThunk(
    'staff/get_all_bills',
    async (_, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await staffService.GetAllBills()
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        } finally{
            dispatch(stopLoad())
        }
    }
)
export const getAllStaffs = createAsyncThunk(
    'staff/get_all_staff',
    async (_, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await staffService.GetAllStaff()
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        } finally{
            dispatch(stopLoad())
        }
    }
)
export const getAdminGlobalRecord = createAsyncThunk(
    'staff/get_global_record',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await staffService.GetGlobalRecord(data)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        } finally{
            dispatch(stopLoad())
        }
    }
)
export const getOperatorRecord = createAsyncThunk(
    'staff/get_operator_record',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await staffService.GetOperatorRecord(data)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        } finally{
            dispatch(stopLoad())
        }
    }
)
export const getOperatorPeriodicRecord = createAsyncThunk(
    'staff/get_operator_periodic_record',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await staffService.GetOperatorPeriodicRecord(data)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        } finally{
            dispatch(stopLoad())
        }
    }
)
export const getMyRecord = createAsyncThunk(
    'staff/get_my_Record',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await staffService.GetMyRecord(data)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        } finally{
            dispatch(stopLoad())
        }
    }
)
export const getUserStat = createAsyncThunk(
    'staff/get_user_stat',
    async (_, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await staffService.GetUserStat()
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        } finally{
            dispatch(stopLoad())
        }
    }
)

export const createStaff = createAsyncThunk(
    'staff/createStaff',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await staffService.CreateStaff(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        }finally{
            dispatch(stopLoad())
        }
    }
)