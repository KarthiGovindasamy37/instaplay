import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Card from './components/Card'
import { toast } from 'react-toastify'
import axios from 'axios'

function Home() {

let [movieData,setMovieData] = useState([])
let [loading,setLoading] = useState(false)

  useEffect(()=>{
  getDashDetails()
  },[])

  const getDashDetails = async() =>{
try {
  setLoading(true)
  let res = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=f2eedd0ef7a8665b0ae82eb6445a77e7&page=1`)
  setMovieData(res.data.results)
  setLoading(false)
} catch (error) {
  toast.error(error.response.data.message)
}
  }

  console.log(movieData);
  return (

    <div className='home'>
        <Navbar/>
       <div className="class">
       <div className="poster">
            <img src="/assets/homePoster.svg" className='poster-img' />
        </div>
        <div className="home-bg">
            <p className="trending-t">Trending</p>
            {
              loading ? 
              <div className='loading'>Loading...</div>
              : 
              <div className="trending-page">
              {
                movieData.map(e =>{
                  return <Card e={e}/>
                })
              }
            </div>
            }
        </div>
       </div>
        
    </div>
  )
}

export default Home