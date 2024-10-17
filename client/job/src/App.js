import React,{useEffect,useContext, useState} from 'react';
import './App.css';
import { MyContext } from './index'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Register from './components/Auth/Register';
import Home from './components/Home/Home';

import Navbar from './components/Layout/Navbar';

import Footer from './components/Layout/Footer';

import toast, { Toaster } from 'react-hot-toast'
import Login from './components/Auth/Login';
import Notfound from './components/Notfound/Notfound';
import { getToken, getUser, removeToken } from './localstorage/Localdb';
import EmployeeRoutes from './components/Routes/EmployeeRoutes';
import UserRoute from './components/Routes/UserRoute';
import AdminRoutes from './components/Routes/AdminRoutes';


function App() {
 
const {isAuthorized,setAuthorized,setUser,user} = useContext(MyContext)
console.log('user:',user);

const [loading, setloading] = useState(false)
useEffect(() => {
  const token = getToken();
  if (token) {
    const decodedUser = getUser();
    if (decodedUser) {
      setAuthorized(true);
      setUser(decodedUser.sub);
    } else {
      setAuthorized(false);
      setUser(null);
    }
  } else {
    setAuthorized(false);
    setUser(null);
  }
  setloading(false);
}, [setAuthorized, setUser]);

if (loading) {
  return <div>Loading...</div>; 
}

if (user) {
  if (user.role === 'Employer') {
    return <EmployeeRoutes />;
  } else if (user.role === 'Admin') {
    return <AdminRoutes />;
  } else {
    return <UserRoute />;
  }
}



  return (
    <div >
     <BrowserRouter>
 
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<><Navbar/><Home /><Footer /></>} />
        
        <Route path='*' element={<Notfound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
    
    </div>
  );
}

export default App;

