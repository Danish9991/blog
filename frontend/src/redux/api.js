import axios from 'axios';

const API = axios.create({ baseURL : 'http://localhost:5000/api'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }
    return req;
})

export const signin = (formData) => API.post('/users/signin', formData);

export const signup = (formData) => API.post('/users/signup', formData);

export const googleSignIn = (data) => API.post('/users/googleSignIn', data);

export const createTour = (tourData) => API.post('/tours', tourData);

export const getTours = () => API.get('/tours');

export const getTour = (id) => API.get(`/tours/${id}`)

export const getToursByUser = () => API.get('/tours/userTour')

export const deleteTour = (id) => API.delete(`/tours/${id}`)

export const updatedTour = (id, updatedTourData) => API.put(`/tours/${id}`, updatedTourData)
