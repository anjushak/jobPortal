import React, { useContext, useState } from 'react'
import logo from "../assets/1.jpg"
import "../styles/Register.css"
import { setToken } from '../../localstorage/Localdb'
import { Link, useNavigate } from 'react-router-dom'
import { MyContext } from '../..'
import axios from 'axios'
import toast from 'react-hot-toast'
import { api } from '../../axios'
const Register = () => {
  const [validated, setValidated] = useState(false);
  const {isAuthorized,setAuthorized,user} =useContext(MyContext)
  const navigate=useNavigate()
  const [form, setform] = useState({name:"",email:"",phoneno:"",password:"",role:""})
  const updateform=(e)=>{
     setform({...form,[e.target.name]:e.target.value})
  }
  const handlesubmit=async (e)=>{
     e.preventDefault();
     api.post('/job/register',form,  {
      headers: {
        "Content-Type": "application/json",},
      withCredentials: true,
    }).then((res)=>{
      console.log(res);
      const data=res.data
      setToken(data.token)
      toast.success(data.message);
      setform("");
      setAuthorized(true);
      navigate('/login')
    }).catch(err=>{

      console.log(err);

      toast.error('Registration failed. Please try again.');
    })
   
  if(isAuthorized){
      return 
  }
  }
  return (

    <div>
      
      <section className='regauthpage  '>
      <div className="regcontainer">
        <div className="regheader">
          {/* <img src={logo} alt="" height={"50px"} width={"50px"}/> */}
          
          <h3>Create a new account</h3>

        </div>
        <form  onChange={updateform}>
          <div className="reginputtag">
            <label>Register As</label>
            <div>
              <select defaultValue={form.role} name="role" >
                <option value={""} style={{fontSize:"15px"}}>select role</option>
                <option value={"Job seeker"} style={{fontSize:"15px"}}>Job seeker</option>
                <option value="Employer" style={{fontSize:"15px"}}>Employer</option>
              </select>
            </div>
          </div>
          <div className="reginputtag">
              <label>Name</label>
              <div>
                <input type="text" placeholder='name' defaultValue={form.name} name='name'/>
                
              </div>
            </div>
            <div className="reginputtag">
              <label>Phone number</label>
              <div>
                <input type="number" placeholder='12345678'defaultValue={form.phoneno} name='phoneno'/>
               
              </div>
            </div>
            <div className="reginputtag">
              <label>Email Address</label>
              <div>
                <input type="text" defaultValue={form.email} name='email' placeholder='abc@gmail.com'/>
              
              </div>
            </div>
            <div className="reginputtag">
              <label>Password</label>
              <div>
                <input type="password" placeholder='password' defaultValue={form.password} name='password'/>
               
              </div>
            </div>
           <button type='submit' onClick={handlesubmit}>Register</button>
          <Link to={"/login"}>Sign in</Link>
        </form>
        </div>
       </section>
    </div>   
  

   
  )
}

export default Register