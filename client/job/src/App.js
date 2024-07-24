import React,{useEffect,useContext, useState} from 'react';
import './App.css';
import { MyContext } from './index'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Register from './components/Auth/Register';
import Home from './components/Home/Home';
import Jobs from './components/Job/Jobs';
import Jobdetails from './components/Job/Jobdetails';
import Application from './components/Applications/Application';
import Myapplications from './components/Applications/Myapplications';
import Postjob from './components/Job/Postjob';
import Myjobs from './components/Job/Myjobs';

import Navbar from './components/Layout/Navbar';

import Footer from './components/Layout/Footer';

import toast, { Toaster } from 'react-hot-toast'
import Login from './components/Auth/Login';
import Notfound from './components/Notfound/Notfound';
import Userprofile from './components/Applications/Userprofile';
import { getToken, removeToken } from './localstorage/Localdb';
import { jwtDecode } from 'jwt-decode';
import Employenav from './components/Layout/Employenav';


function App() {
 
const {isAuthorized,setAuthorized,setUser,user} = useContext(MyContext)

useEffect(() => {
  const token = getToken('token');
  if (token) {
    const decoded = jwtDecode(token);
    setAuthorized(true);
    setUser(decoded.sub);
  }
}, []);




  return (
    <div >
    <BrowserRouter>
   
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/' element={<> {user && user.role === 'Employer' ?  <Employenav /> :<Navbar /> }<Home/><Footer/></>}></Route>
      <Route path='/job/getall' element={<Jobs/>}></Route>
      <Route path='/applicant/:id' element={<Jobdetails/>}></Route>

      <Route path='/profile/:id' element={<Userprofile/>}></Route>
      <Route path='/job/post' element={<Postjob/>}></Route>
      <Route path='/job/me' element={<Myjobs/>}></Route>
      <Route path='/application/:id' element={<Application/>}></Route>
      <Route path='/applicant/me' element={<Myapplications/>}></Route>
       
      <Route path='*' element={<Notfound/>}></Route>
      
     
      
    </Routes>
   
    <Toaster/>
    
    </BrowserRouter>
    
    </div>
  );
}

export default App;

