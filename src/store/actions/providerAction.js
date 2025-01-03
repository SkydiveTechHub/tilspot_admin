import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoad, stopLoad } from "../reducers/appSlice";
import providerService from "../services/providerService";

export const getAllCategories = createAsyncThunk(
    'provider/get_all_categories',
    async (_, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.GetAllCategories()
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        } finally{
            dispatch(stopLoad())
        }
    }
)
export const getProviderByCategory = createAsyncThunk(
    'provider/get_provider_by_categories',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.GetProviderbyCategory(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        } finally{
            dispatch(stopLoad())
        }
    }
)
export const getPlansByProvider = createAsyncThunk(
    'provider/get_plans_by_provider',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.GetPlanByProvider(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        } finally{
            dispatch(stopLoad())
        }
    }
)
export const getLocations = createAsyncThunk(
    'provider/get_Locations',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.GetAllLocations(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        } finally{
            dispatch(stopLoad())
        }
    }
)
export const getMatch = createAsyncThunk(
    'provider/get_match',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.GetMatch(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        } finally{
            dispatch(stopLoad())
        }
    }
)
export const getZonesByLocation = createAsyncThunk(
    'provider/get_zones_by_Location',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.GetZoneByLocation(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        } finally{
            dispatch(stopLoad())
        }
    }
)
export const createProvider = createAsyncThunk(
    'provider/create_provider',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.CreateProvider(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        }finally{
            dispatch(stopLoad())
        }
    }
)
export const createLocation = createAsyncThunk(
    'provider/create_Location',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.CreateLocation(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        }finally{
            dispatch(stopLoad())
        }
    }
)
export const createJorney = createAsyncThunk(
    'provider/create_Journey',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.CreateJourney(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        }finally{
            dispatch(stopLoad())
        }
    }
)
export const createZone = createAsyncThunk(
    'provider/create_Zone',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.CreateZone(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        }finally{
            dispatch(stopLoad())
        }
    }
)
export const createMatch = createAsyncThunk(
    'provider/create_match',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.CreateMatch(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        }finally{
            dispatch(stopLoad())
        }
    }
)
export const createInternetPlans = createAsyncThunk(
    'provider/create_plans',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.CreateInternetPlans(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        }finally{
            dispatch(stopLoad())
        }
    }
)
export const editProvider = createAsyncThunk(
    'provider/edit_provider',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.EditProvider(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        }finally{
            dispatch(stopLoad())
        }
    }
)
export const editLocation = createAsyncThunk(
    'provider/edit_Location',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.EditLocation(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        }finally{
            dispatch(stopLoad())
        }
    }
)
export const editJourney = createAsyncThunk(
    'provider/edit_Journey',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.EditJourney(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        }finally{
            dispatch(stopLoad())
        }
    }
)
export const editZone = createAsyncThunk(
    'provider/edit_zone',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.EditZone(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        }finally{
            dispatch(stopLoad())
        }
    }
)
export const deleteProvider = createAsyncThunk(
    'provider/delete_provider',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.DeleteProvider(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        }finally{
            dispatch(stopLoad())
        }
    }
)
export const deleteLocation = createAsyncThunk(
    'provider/delete_location',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.DeleteLocation(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        }finally{
            dispatch(stopLoad())
        }
    }
)
export const deleteZone = createAsyncThunk(
    'provider/delete_zone',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.DeleteZone(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        }finally{
            dispatch(stopLoad())
        }
    }
)
export const enableOrDisableCategory = createAsyncThunk(
    'provider/enableOrDisableCategory',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.EnableOrDisableCategory(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        }finally{
            dispatch(stopLoad())
        }
    }
)