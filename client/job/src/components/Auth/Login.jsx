import React, { useContext, useState } from 'react'
import logo from "../assets/1.jpg"
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom"
import "../styles/Login.css"
import { api } from '../../axios';
import { setToken } from '../../localstorage/Localdb';
import { MyContext } from '../..';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import banner from "../assets/job.webp"

const Login = () => {
  const {setAuthorized,setUser} = useContext(MyContext)
  
  const [login,setlogin] = useState({email:"",password:""})
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
          setAuthorized(new Date());
          setUser(data.newuser);         
           navigate('/');
      

    }).catch((err)=>{
      const errorMessage = err.response?.data || "Login failed. Please check your credentials.";
      console.log(errorMessage);
      if (errorMessage === 'Your account is blocked. Please contact support.') {
        toast.error("Your account is blocked. Please contact support.");
      } else {
        toast.error(errorMessage);
      }
    })
  }
  const [ showPassword, setShowPassword ] = useState(false);
  return (

    <section className='login-page'>
    <div className='login-split'>
      <div className='login-image-container'>
        <img src={banner} alt="Welcome" className='login-image' />
      </div>
      <div className='login-form-container'>
        <div className='login-header'>
          <h2>Welcome To HirePulse! </h2>
          <p>Please enter your details</p>
        </div>
        <form onChange={handleUpdate} onSubmit={loginSubmit}>
          <div className="input-tag">
            <label>Email</label>
            <input 
              type="text" 
              placeholder='Enter email' 
              value={login.email} 
              name='email'
              required 
            />
          </div>
          <div className="input-tag">
            <label>Password</label>
            <div className='password-container'>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder='Enter password' 
                value={login.password} 
                name='password'
                required 
              />
              <span 
                className='password-toggle' 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="form-actions">
           
            
          </div>
          <button type='submit' className='login-button'>Log In</button>
         
          <p className='register-text'>Don't have an account? <Link to="/register" className='register-link'>Sign up</Link></p>
        </form>
      </div>
    </div>
  </section>
    
   
  )
}

export default Login