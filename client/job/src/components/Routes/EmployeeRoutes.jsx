import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Employenav from '../Layout/Employenav'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import Home from '../Home/Home'
import Footer from '../Layout/Footer'
import Jobs from '../Job/Jobs'
import Jobdetails from '../Job/Jobdetails'
import Myjobs from '../Job/Myjobs'
import Applications from '../Applications/Applications'
import ApplicationDetail from '../Applications/ApplicationDetail'
import Notfound from '../Notfound/Notfound'
import { Toaster } from 'react-hot-toast'
import Updatejob from '../Job/Updatejob'
import Userprofile from '../Applications/Userprofile'
import Postjob from '../Job/Postjob'

const EmployeeRoutes = () => {
  return (
    <div>
        <BrowserRouter>
   
   <Routes>
     <Route path='/login' element={<Login/>}></Route>
     <Route path='/register' element={<Register/>}></Route>
     <Route path='/' element={<> <Employenav/> <Home/><Footer/></>}></Route>
     <Route path='/job/getall' element={<> <Employenav/><Jobs/></>}></Route>
   
     <Route path='/job/:id' element={<> <Employenav/><Jobdetails/></>}></Route>
     <Route path='/updatejob/:id' element={<Updatejob/>}></Route>
     <Route path='/profile/:id' element={<Userprofile/>}></Route>
     <Route path='/job/post' element={<> <Employenav/><Postjob/></>}></Route>
     <Route path='/job/me' element={<> <Employenav/><Myjobs/></>}></Route>
     <Route path='/employee/applications' element={<><Employenav/><Applications/></>}></Route>
     <Route path='/applications/details/:id' element={<><Employenav/><ApplicationDetail/></>}></Route>
      
     <Route path='*' element={<Notfound/>}></Route>
     
    
     
   </Routes>
  
   <Toaster/>
   
   </BrowserRouter>
    </div>
  )
}

export default EmployeeRoutes