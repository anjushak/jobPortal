import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../..';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../../localstorage/Localdb';
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../assets/1.jpg"
import "../styles/sidenav.css"
import { FaRegUserCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { IoMdLogOut } from 'react-icons/io';


const AdminNav = () => {
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
    // <div className="navbar-show">
    //   <div className='navcontainer'>
    //     <div className="navlogo">
    //       <img src={logo} alt="" />
    //     </div>
    //     <ul className={!show ?"menu":"show-menu menu"}>
    //          <li>
    //           <Link to={'/'} onClick={()=>setshow(false)}>
    //           HOME
    //           </Link>
    //          </li>
             
    //          <li>
    //           <Link to={`/admin/applications`} onClick={()=>setshow(false)}>
    //            VIEW ALL APPLICATIONS
             
    //           </Link>
    //          </li>
            
  
              
    //             <li>
    //             <Link to={'/admin/getall'} onClick={()=>setshow(false)}>
    //             VIEW ALL JOBS
    //             </Link>

    //             </li>
    //            <li>
    //            <Link to={`/admin/allusers`} onClick={()=>setshow(false)}>
    //              VIEW USERS
    //             </Link>
    //            </li>
    //            <li>{!isAuthorized? <Link to={"/login"} >SIGN UP/SIGN IN</Link>:<></>}
              
              

             
    //            </li>   
               
               
               
           
    //       <button onClick={logout}><IoMdLogOut /></button>
            
             
    //     </ul>

    //     <div className="hamburger">
    //       <GiHamburgerMenu onClick={() => setshow(!show)} />
    //     </div>
    //   </div>
    // </div>
    <div className='admin-nav'>
      

    </div>
  )
}

export default AdminNav

