import axios from 'axios'

let baseURL = import.meta.env.VITE_PUBLIC_BASE_URL

const API = axios.create({
    baseURL: baseURL
})



API.interceptors.request.use((request) => {
    let token = localStorage.getItem('jwt')
    if (token) {
        request.headers.Authorization = `Token ${token}`
    }
    return request
})



API.interceptors.response.use((response) => {
    return Promise.resolve(response)
}, (error) => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('jwt')
        window.location.replace('/auth')
    }
    return Promise.reject(error)
})




export default API