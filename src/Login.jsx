import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Login() {
    let [userName,setUserName] = useState("")
    let [password,setPassword] = useState("")
    let [nameAlert,setNameAlert] = useState(false)
    let [passAlert,setPassAlert] = useState(false)
    
    let navigate = useNavigate()

    useEffect(()=>{
     if(JSON.parse(window.localStorage.getItem("loginStatus"))){
        navigate("/home")
     }
    },[])

    const validate = async (e)=>{
        try {
            e.preventDefault()
        if(userName.length > 0 && password.length > 0){
            let tokenRes = await axios.get('https://api.themoviedb.org/3/authentication/token/new?api_key=f2eedd0ef7a8665b0ae82eb6445a77e7')
            let token = tokenRes.data.request_token
            window.localStorage.setItem("token",token)
            let values = {
                username : userName,
                password,
                request_token:token
            }
            let loginRes = await axios.post("https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=f2eedd0ef7a8665b0ae82eb6445a77e7",values)
            let login = loginRes.data.success
            if (login) {
                toast.success("Logged in successfully",{toastId:Math.random()})
                window.localStorage.setItem("loginStatus",login)
                navigate("/home")
            }
            
            
        }else{
            if(userName.length === 0) setNameAlert(true)
            if(password.length === 0) setPassAlert(true)
        }
        } catch (error) {
            toast.error(error.response.data.status_message,{toastId:Math.random()})
        }
    }

  return (
    <div>
        <Navbar/>
        <div className="login-bg">
            <div className="signin">
                <p className="sign-t">Sign in</p>
                <p className="desc-t">Sign in to your Self Service Portal</p>
                <form onSubmit={(e) => validate(e)}>
                    <div className={nameAlert ? `` : `form-name`}>
                    <input type="text" id='name' className="field"
                     placeholder='User name' 
                     onChange={(e)=>{setUserName(e.target.value);setNameAlert(false)}}
                    />
                    {nameAlert ? <span className='text-alert'>User name is required</span> : null}
                    </div>
                    <div className={passAlert ? `pass-alert-m` : `form-pass`}>
                    <input type="password" id='pass' className="field"
                     placeholder='Password' 
                     onChange={(e)=>{setPassword(e.target.value);setPassAlert(false)}}
                     />
                    {passAlert ? <span className='text-alert'>Password is required</span> : null}
                    </div>
                    <div>
                        <input type="submit" className='submit' value="log in"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login