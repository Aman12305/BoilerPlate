import axios from 'axios'

const baseURL = process.env.REACT_APP_APIURL

const API = axios.create({ baseURL: baseURL})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('Profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req;
})

export const logIn = (data) => API.post('/user/login', data);
export const signUp = (data) => API.post('/user/signin', data);