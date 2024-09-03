import React from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import Home from '../Home/Home'
import Footer from '../Layout/Footer'
import Navbar from '../Layout/Navbar'
import Jobs from '../Job/Jobs'
import Jobdetails from '../Job/Jobdetails'
import Userprofile from '../Applications/Userprofile'
import Application from '../Applications/Application'
import Myapplications from '../Applications/Myapplications'
import Notfound from '../Notfound/Notfound'
import About from '../Home/About'
import Howworks from '../Home/Howworks'

const UserRoute = () => {
  return (
    <div>
        <BrowserRouter>
       
   <Routes>
     <Route path='/login' element={<Login/>}></Route>
     <Route path='/register' element={<Register/>}></Route>
     <Route path='/' element={<> <Navbar /> <Home/><Footer/></>}></Route>
     <Route path='/aboutus' element={<><Navbar /><About/><Howworks/><Footer/></>}></Route>
     <Route path='/job/getall' element={<><Navbar /><Jobs/></>}></Route>
     <Route path='/job/:id' element={<><Navbar /><Jobdetails/></>}></Route>
     <Route path='/profile/:id' element={<Userprofile/>}></Route>
     <Route path='/application/:id' element={<><Navbar /><Application/></>}></Route>
     <Route path='/applications/me' element={<><Navbar /><Myapplications/></>}></Route>  
     <Route path='*' element={<Notfound/>}></Route>
     
    
     
   </Routes>
  
   <Toaster/>
   
   </BrowserRouter>
    </div>
  )
}

export default UserRoute