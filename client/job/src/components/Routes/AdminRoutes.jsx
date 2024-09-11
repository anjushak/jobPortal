import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Viewusers from '../admin/Viewusers'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import Home from '../Home/Home'
import Footer from '../Layout/Footer'
import Jobs from '../Job/Jobs'
import Jobdetails from '../Job/Jobdetails'
import Notfound from '../Notfound/Notfound'
import { Toaster } from 'react-hot-toast'
import { MyContext } from '../..'
import Allapplications from '../admin/Allapplications'
import AllJobs from '../admin/AllJobs'
import MainAdmin from '../admin/MainAdmin'
import Admindashboard from '../admin/Admindashboard'


const AdminRoute = ({ children }) => {
    const { user } = useContext(MyContext);
  
    if (!user || user.role !== 'Admin') {
      return <Navigate to="/login" />;
    }
  
    return children;
  };
  
const AdminRoutes = () => {
  return (
    <div>
        <BrowserRouter>
      
   <Routes>
     <Route path='/login' element={<Login/>}></Route>
     <Route path='/register' element={<Register/>}></Route>
     <Route path='/' element={<> <Admindashboard/><MainAdmin/></>}></Route>
     <Route path='/admin/allusers' element={<><AdminRoute> <Admindashboard/><Viewusers/></AdminRoute></>}></Route>
     <Route path='/admin/getalljobs' element={<> <Admindashboard/><AllJobs/></>}></Route> 
     <Route path='/admin/applications' element={<> <Admindashboard/><Allapplications/></>}> </Route>
     <Route path='*' element={<Notfound/>}></Route>
     
    
     
   </Routes>
  
   <Toaster/>
   
   </BrowserRouter>
    </div>
  )
}

export default AdminRoutes