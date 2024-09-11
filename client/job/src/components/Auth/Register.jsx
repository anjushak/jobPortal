import React, { useContext, useState } from 'react';
import { setToken } from '../../localstorage/Localdb';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../..';
import toast from 'react-hot-toast';
import { api } from '../../axios';
import banner from "../assets/job.webp"
import "../styles/Register.css";  

const Register = () => {
  const { isAuthorized, setAuthorized } = useContext(MyContext);
  const navigate = useNavigate();
  const [form, setform] = useState({ name: "", email: "", phoneno: "", password: "", role: "" });

  const updateform = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    api.post('/job/register', form, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      const data = res.data;
      setToken(data.token);
      toast.success(data.message);
      setform({ name: "", email: "", phoneno: "", password: "", role: "" });
      setAuthorized(true);
      navigate('/login');
    }).catch(err => {
      console.log(err);
      toast.error('Registration failed. Please try again.');
    });

    if (isAuthorized) {
      return;
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-image">
          <img src={banner} alt="Register" className='rgstrimage' /> 
        </div>
        <div className="register-form-container">
          <h1>Create Account</h1>
          <p>Please fill in the details below to create a new account.</p>
          <form onSubmit={handlesubmit} className="register-form">
            <div className="input-group">
              <label htmlFor="role">Register As</label>
              <select defaultValue={form.role} name="role" id="role" required onChange={updateform}>
                <option value="">Select role</option>
                <option value="Job seeker">Job seeker</option>
                <option value="Employer">Employer</option>
                
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={updateform}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="phoneno">Phone Number</label>
              <input
                type="tel"
                id="phoneno"
                name="phoneno"
                placeholder="Enter your phone number"
                value={form.phoneno}
                onChange={updateform}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={updateform}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={updateform}
                required
              />
            </div>
            <button type="submit" className="submit-button">Register</button>
          </form>
          <div className="login-link">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
