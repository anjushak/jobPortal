import React, { useContext, useState } from 'react'
import logo from "../assets/1.jpg"
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom"
import "../styles/Login.css"
import { api } from '../../axios';
import { setToken } from '../../localstorage/Localdb';
import { MyContext } from '../..';

const Login = () => {
  const {isAuthorized,setAuthorized,setUser} = useContext(MyContext)
  const [login,setlogin] = useState({email:"",password:"",role:""})
  const handleUpdate=(e)=>{
   setlogin({...login,[e.target.name]:e.target.value})
  }
  const navigate=useNavigate()
  const loginSubmit=async (e)=>{
    e.preventDefault();
    api.post('/job/login',login,{
      headers:{
        "content-type":"application/json",},
        withCredentials:true,
    }).then((res)=>{
        console.log(res)
       
          const data=res.data;
          setToken(data.token)
          toast.success(data.message);
          setAuthorized(true);
          setUser();
          navigate('/');
      

    }).catch((err)=>{
      console.log(err.message);
      toast.error("Login failed. Please check your credentials.");
    })
  }

  return (

    <section className='authpage'>

       <div className='logincontainer'>
        <div className='header'>
         
        <img src={logo} alt="" />
        <h3>Sign in</h3>
        </div>
        <form onChange={handleUpdate}>
          <div className="inputtag">
            <label>Login As</label>
            <div>
            <select value={login.role} name='role' >
                  <option value="" style={{fontSize:"15px"}}>Select Role</option>
                  <option value="Employer" style={{fontSize:"15px"}}>Employer</option>
                  <option value="Job seeker" style={{fontSize:"15px"}}>Job seeker</option>
                </select>
            </div>
          </div>
          <div className="inputtag">
            <label >Email Address</label>
            <div>
              <input type="text" placeholder='enter email' value={login.email} name='email'/>
            </div>
          </div>
          <div className="inputtag">
            <label >Password</label>
            <div>
              <input type="password" placeholder='enter password'  value={login.password} name='password'/>
            </div>
          </div>
          <button type='submit' onClick={loginSubmit}>Login</button>
          <Link to={"/register"}>Register Now</Link>
        </form>
       </div>
    </section>
   
  )
}

export default Login