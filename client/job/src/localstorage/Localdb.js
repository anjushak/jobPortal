import { jwtDecode } from "jwt-decode"

export const setToken=(token)=>{
    localStorage.setItem("_token_",token)
}

export const removeToken=()=>{
    localStorage.removeItem("_token_")
}

export const getToken=()=>{
    const token=localStorage.getItem("_token_")
    return token
}
export const  getUser=()=>{
    const token=getToken()
    const res=jwtDecode(token)
}