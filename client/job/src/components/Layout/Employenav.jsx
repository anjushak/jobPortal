import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import toast from 'react-hot-toast';
import { removeToken } from '../../localstorage/Localdb';
import { GiHamburgerMenu } from "react-icons/gi";
import { MyContext } from '../..';
import logo from "../assets/1.jpg"
import "../styles/Nav.css"
import { AiOutlineLogout } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
function Employenav() {
 
      const [show, setshow] = useState(false)
  const {isAuthorized,setAuthorized,user} =useContext(MyContext)
  const navigate=useNavigate();
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
    <div className="navbar-show">
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
              <Link to={`/employee/applications`} onClick={()=>setshow(false)}>
               VIEW APPLICATIONS
             
              </Link>
             </li>
            
  
              
                <li>
                <Link to={'/job/post'} onClick={()=>setshow(false)}>
                POST NEW JOB
                </Link>

                </li>
                <li>
               <Link to={`/job/getall`} onClick={()=>setshow(false)}>
                 VIEW ALL JOBS
                </Link>
               </li>
               <li>
               <Link to={`/job/me`} onClick={()=>setshow(false)}>
                 VIEW JOBS
                </Link>
               </li>
               <li>{!isAuthorized? <Link to={"/login"} >SIGN UP/SIGN IN</Link>:<Link to={`/profile/${user?._id}`} onClick={()=>setshow(false)}>
              
              <CiUser  style={{fontSize:"30px"}}/>
              </Link>}
             
               </li>   
               
               
               
           
          <button ><AiOutlineLogout  onClick={logout} /></button>
            
             
        </ul>

        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setshow(!show)} />
        </div>
      </div>
    </div>
  )
}

export default Employenav