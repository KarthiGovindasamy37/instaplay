import axios from "axios"
import { baseUrl } from "../Constants/URLconstants"

export const getTrendingData = (currentPage) =>{
  return axios.get(`${baseUrl}trending/movie/day?api_key=f2eedd0ef7a8665b0ae82eb6445a77e7&page=${currentPage}`)
}

export const getSearchData = (search,searchCurrentPage) =>{
  return axios.get(`${baseUrl}search/movie?api_key=f2eedd0ef7a8665b0ae82eb6445a77e7&language=en-US&query=${search}&page=${searchCurrentPage}&include_adult=false`)
}