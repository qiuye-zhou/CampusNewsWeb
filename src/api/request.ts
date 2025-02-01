import axios from 'axios'
import { API_URL } from '../constants/env'
import { TokenKey } from '../utils/token'

axios.defaults.withCredentials = true // 允许跨域携带cookie信息

// create an axios instance
const httpApi = axios.create({
    baseURL: API_URL,
    timeout: 5000
})

// request interceptor
httpApi.interceptors.request.use(
    config => {
        config.headers.set('Authorization', localStorage.getItem(TokenKey))
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// response interceptor
httpApi.interceptors.response.use(
    response => {
        return response
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default httpApi
