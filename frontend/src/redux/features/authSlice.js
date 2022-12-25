import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../api'

const initialState = {
    user : localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null,
    error : '',
    loading : false
}

export const login = createAsyncThunk('auth/login', 
 async({formValues, navigate, toast}, {rejectWithValue}) => {
    try {
        const response = await api.signin(formValues)
        toast.success('login successfully')
        navigate('/')
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
 }
)

export const register = createAsyncThunk('auth/register', 
 async({formValues, navigate, toast}, {rejectWithValue}) => {
    try {
        const response = await api.signup(formValues)
        toast.success('register successfully')
        navigate('/')
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
 }
)

export const googleSignIn = createAsyncThunk('auth/register', 
 async({data, navigate, toast}, {rejectWithValue}) => {
    try {
        const response = await api.googleSignIn(data)
        toast.success('google sign-in successfully')
        navigate('/')
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
 }
)

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setUser : (state, action) => {
          state.user = action.payload;
        },
        setLogout : (state, action) => {
            state.user = null;
            localStorage.removeItem('profile')
        }
    },
    extraReducers : {
        [login.pending] : (state, action) => {
            state.loading = true
        },
        [login.fulfilled] : (state, action) => {
            state.loading = false;
            localStorage.setItem('profile', JSON.stringify({...action.payload}))
            state.user = action.payload
        },
        [login.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [register.pending] : (state, action) => {
            state.loading = true
        },
        [register.fulfilled] : (state, action) => {
            state.loading = false;
            localStorage.setItem('profile', JSON.stringify({...action.payload}))
            state.user = action.payload
        },
        [register.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [googleSignIn.pending] : (state, action) => {
            state.loading = true
        },
        [googleSignIn.fulfilled] : (state, action) => {
            state.loading = false;
            localStorage.setItem('profile', JSON.stringify({...action.payload}))
            state.user = action.payload
        },
        [googleSignIn.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        }

    }
})

export const { setUser, setLogout } = authSlice.actions

export default authSlice.reducer;