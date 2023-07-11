import axios from "axios"
import { baseUrl } from "../Constants/URLconstants"




export const getToken = () =>{
  return axios.get(`${baseUrl}authentication/token/new?api_key=f2eedd0ef7a8665b0ae82eb6445a77e7`)
}

export const validateLogin = (payload) =>{
  return axios.post(`${baseUrl}authentication/token/validate_with_login?api_key=f2eedd0ef7a8665b0ae82eb6445a77e7`,payload)
}