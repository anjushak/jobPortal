import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../..'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import logo from "../assets/1.jpg"
import "../styles/Nav.css"
import { GiHamburgerMenu } from "react-icons/gi";
import { removeToken } from '../../localstorage/Localdb'
import { IoMdLogOut } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { CiUser } from "react-icons/ci";

const Navbar = () => {
  const [show, setshow] = useState(false)
  const {isAuthorized,setAuthorized,user} =useContext(MyContext)
  const navigate=useNavigate()
  useEffect(() => {
    
    console.log('User role:', user && user?.role);
    console.log(user);
  }, [isAuthorized, user]);
  const logout= async () => {
    try{

       removeToken()
       toast.success('logout successfully');
       setAuthorized(false);
       navigate("/login");
    }catch(error){
    toast.error(error.data.message);
    isAuthorized(true)
    }
  };
  return (
    <div className=  'navbar-show'>
  

      <div className='navcontainer'>
        <div className="navlogo">
          <img src={logo} alt="" />
        </div>
        <ul className={!show ?"menu":"show-menu menu"}>
             <li>
              <Link to={'/'} onClick={()=>setshow(false)}>
              HOME
              </Link>
             </li>
             <li>
             <Link to={'/aboutus'} onClick={()=>setshow(false)}>
              ABOUT US
              </Link>
             </li>
             <li>
              <Link to={'/job/getall'} onClick={()=>setshow(false)}>
              ALL JOBS
              </Link>
             </li>
             <li>
              <Link to={'/applications/me'} onClick={()=>setshow(false)}>
              MY APPLICATIONS
              </Link>
             </li>
            

             <li>{!isAuthorized? <Link to={"/login"} >SIGN UP/SIGN IN</Link>:<Link to={`/profile/${user?._id}`} onClick={()=>setshow(false)}>
              
             <CiUser style={{fontSize:"30px",fontWeight:"200px"}}/>
             </Link>}
            
              </li>   
              
         
           <button onClick={logout} style={{background:""}}><LuLogOut /></button>

             
        </ul>

        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setshow(!show)} />
        </div>
      </div>
    </div>

  )
}

export default Navbar