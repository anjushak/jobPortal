import axios, {} from "axios"
import { getToken } from "./localstorage/Localdb"

export const api=axios.create({
    baseURL:"http://localhost:4000"
})


api.interceptors.request.use(config=>{
    const token=getToken()||null
    config.headers.Authorization=`Bearer ${token}`
    return config
})