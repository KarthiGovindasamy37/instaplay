import axios from "axios"
import { baseUrl } from "../Constants/URLconstants"

export const getMovieData = (id) =>{
  return axios.get(`${baseUrl}movie/${id}?api_key=f2eedd0ef7a8665b0ae82eb6445a77e7&language=en-US`)
}

export const getVideoData = (id) =>{
  return axios.get(`${baseUrl}movie/${id}/videos?api_key=f2eedd0ef7a8665b0ae82eb6445a77e7&language=en-US`)
}