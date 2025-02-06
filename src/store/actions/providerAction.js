import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoad, stopLoad } from "../reducers/appSlice";
import providerService from "../services/providerService";

export const getAllCategories = createAsyncThunk(
    'provider/get_all_categories',
    async (_, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.GetAllCategories()
            console.log(res)
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
export const getServiceByCategory = createAsyncThunk(
    'provider/get_service_by_categories',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.GetServicebyCategory(data)
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
    async (_, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.GetMatch()
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        } finally{
            dispatch(stopLoad())
        }
    }
)
export const getMatchTickets = createAsyncThunk(
    'provider/get_match_tickets',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.GetMatchTickets(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        } finally{
            dispatch(stopLoad())
        }
    }
)
export const getAllJourney = createAsyncThunk(
    'provider/get_all_journey',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.GetAllJourney(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        } finally{
            dispatch(stopLoad())
        }
    }
)
export const getJourneyDetails = createAsyncThunk(
    'provider/get_journey_details',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.GetJourneyDetials(data)
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
export const editMatch = createAsyncThunk(
    'provider/edit_match',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.EditMatch(data)
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
export const deleteService = createAsyncThunk(
    'provider/delete_service',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.DeleteService(data)
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
export const deleteMatch = createAsyncThunk(
    'provider/delete_match',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.DeleteMatch(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        }finally{
            dispatch(stopLoad())
        }
    }
)
export const deleteTicket = createAsyncThunk(
    'provider/delete_ticket',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.DeleteTicket(data)
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
export const setFees = createAsyncThunk(
    'provider/set_fees',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.SetFees(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        }finally{
            dispatch(stopLoad())
        }
    }
)
export const approveBill = createAsyncThunk(
    'provider/approve_bill',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.ApproveBill(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        }finally{
            dispatch(stopLoad())
        }
    }
)
export const rejectdPaymentBill = createAsyncThunk(
    'provider/reject_bill',
    async (data, {dispatch, rejectWithValue })=>{
        dispatch(startLoad())
        try {
            const res = await providerService.RejectBill(data)
            return res
        } catch (error) {
            return rejectWithValue(error.response.data)
        }finally{
            dispatch(stopLoad())
        }
    }
)