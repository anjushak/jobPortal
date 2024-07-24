import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MyContext } from '../..';
import { api } from '../../axios';
import { getToken } from './../../localstorage/Localdb';
import "../styles/Nav.css"
const Userprofile = () => {
  const {id}=useParams();

  const { isAuthorized, setAuthorized } = useContext(MyContext);
    const [profile, setprofile] = useState(null);
    const navigate=useNavigate()
  
    useEffect(() => {
      if (!id) return;
  
      const fetchProfile = async () => {
        try {
          const token = getToken();
          if (!token) {
            setAuthorized(false);
            navigate('/login');
            return;
          }
  
          const res = await api.get(`/job/profile/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log(res.data);
          setprofile(res.data);
          
        } catch (err) {
          if (err.response && err.response.status === 401) {
            setAuthorized(false);
            // navigate('/login');
          } else {
            
            
          }
        }
      };
  
      fetchProfile();
    }, [id, setAuthorized, navigate]);
  
  return (
    <div className='profilebanner'>
        {profile ? (
        <>
               <h2>User Details</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={profile.name} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={profile.email} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="text" id="phone" value={profile.phoneno} readOnly />
        </div>
       
      </form>

        </>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  )
}

export default Userprofile