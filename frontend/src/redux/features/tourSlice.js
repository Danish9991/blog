import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../api'

const initialState = {
    tour : {},
    tours : [],
    userTours : [],
    error : '',
    loading : false
}

export const createTour = createAsyncThunk('tour/createTour', 
  async({ updatedTourData, navigate, toast}, {rejectWithValue}) => {

    try {
        const response = await api.createTour(updatedTourData)
        toast.success('tour added successfully')
        navigate('/')
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})

export const getTours = createAsyncThunk('tour/getTours', 
  async(_, {rejectWithValue}) => {
    try {
        const response = await api.getTours();
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})

export const getTour = createAsyncThunk('tour/getTour', 
  async(id, {rejectWithValue}) => {
    try {
        const response = await api.getTour(id);
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})

export const getToursByUser = createAsyncThunk('tour/getToursByUser', 
  async(_, {rejectWithValue}) => {
    try {
        const response = await api.getToursByUser();
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})

export const deleteTour = createAsyncThunk('tour/deleteTour', 
  async({id, navigate, toast}, {rejectWithValue}) => {
    try {
        const response = await api.deleteTour(id);
        toast.success("tour delete successfylly")
        // navigate('/');
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})

export const updateTour = createAsyncThunk('tour/updateTour', 
  async({id, updatedTourData, navigate, toast}, {rejectWithValue}) => {
    try {
        const response = await api.updatedTour(id, updatedTourData);
        toast.success("tour updated successfylly")
        navigate('/dashboard');
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})



const tourSlice = createSlice({
    name : 'tour',
    initialState,
    extraReducers : {
        [createTour.pending] : (state, action) => {
            state.loading = true
        },
        [createTour.fulfilled] : (state, action) =>{
            state.loading = false
            state.tours = [action.payload]
        },
        [createTour.rejected] : (state, action) => {
            state.loading = false
            state.error = action.payload.message;
        },
        [getTours.pending] : (state, action) => {
            state.loading = true
        },
        [getTours.fulfilled] : (state, action) =>{
            state.loading = false
            state.tours = action.payload
        },
        [getTours.rejected] : (state, action) => {
            state.loading = false
            state.error = action.payload.message;
        },
        [getTour.pending] : (state, action) => {
            state.loading = true
        },
        [getTour.fulfilled] : (state, action) =>{
            state.loading = false
            state.tour = action.payload
        },
        [getTour.rejected] : (state, action) => {
            state.loading = false
            state.error = action.payload.message;
        },
        [getToursByUser.pending] : (state, action) => {
            state.loading = true
        },
        [getToursByUser.fulfilled] : (state, action) =>{
            state.loading = false
            state.userTours = action.payload
        },
        [getToursByUser.rejected] : (state, action) => {
            state.loading = false
            state.error = action.payload.message;
        },
        [deleteTour.pending] : (state, action) => {
            state.loading = true
        },
        [deleteTour.fulfilled] : (state, action) =>{
            state.loading = false
            console.log(action.meta.arg);
            const {arg : {id}} = action.meta
            state.userTours = state.userTours.filter((tour) => tour._id !== id)
            state.tours = state.tours.filter((tour) => tour._id !== id)
        },
        [deleteTour.rejected] : (state, action) => {
            state.loading = false
            state.error = action.payload.message;
        },
        [updateTour.pending] : (state, action) => {
            state.loading = true
        },
        [updateTour.fulfilled] : (state, action) =>{
            state.loading = false
            console.log(action);
            const {arg : {id}} = action.meta
                state.userTours = state.userTours.map((item) => item._id === id ? action.payload : item)
                state.tours = state.tours.map((item) => item._id === id ? action.payload : item)
        },
        [updateTour.rejected] : (state, action) => {
            state.loading = false
            state.error = action.payload.message;
        },

    }
})

export default tourSlice.reducer;