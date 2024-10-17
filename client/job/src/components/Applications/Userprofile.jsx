import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MyContext } from '../..';
import { api } from '../../axios';
import { getToken } from './../../localstorage/Localdb';
import "../styles/Nav.css"
import { FaSave, FaUserEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';
const Userprofile = () => {
  const {id}=useParams();

  const { setAuthorized } = useContext(MyContext);
    const [profile, setprofile] = useState(null);
    const [edit,setedit] = useState(false)
    const [formData, setFormData] = useState({
      name: '',
      role: '',
      email: '',
      phoneno: '',
    });
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
          setFormData({
            name: res.data.name,
            role: res.data.role,
            email: res.data.email,
            phoneno: res.data.phoneno,
          });
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

    const handleupdate=async ()=>{
      try{
          const token=getToken();
          await api.put(`/job/updateprofile/${id}`,FormData,{headers:{Authorization:`Bearer ${token}`}})
          toast.success("profile updated succesfully")
          setedit(false);
      }catch(err){
        toast.error('Error updating profile')
        console.log(err);
        
      }
    }
    const handlechange=(e)=>{
      setFormData({...formData,[e.target.id]:e.target.value})
    }
  
  return (
    <div className='profile-page'>
        {profile ? (
        <div className='profile-container'>
           <h2>{edit ? "Edit Profile" : "User Details"}</h2>
      <form>
        <div className="profile-info">
          <div className="profile-item">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={formData.name}  onChange={handlechange} readOnly={!edit} />
          </div>
          <div className="profile-item">
          <label htmlFor="phone">Role:</label>
          <input type="text" id="role" value={formData.role} onChange={handlechange} readOnly={!edit} />
          
        </div>
       
        <div className="profile-item">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={formData.email}  onChange={handlechange} readOnly={!edit} />
        </div>
        <div className="profile-item">
          <label htmlFor="phone">Phone:</label>
          <input type="text" id="phone" value={formData.phoneno}  onChange={handlechange} readOnly={!edit} />
          
        </div>
       
        </div>
      </form>
         {/* <p style={{marginLeft:"270px",fontWeight:"bold",marginTop:"20px"}}>Update Profile<Link><FaUserEdit style={{marginLeft:"5px"}}  onClick={}/></Link></p> */}
        {edit ?(
            <button className="save-btn" onClick={handleupdate}>
            Save <FaSave />
          </button>
        ):(
          <button className="edit-btn" onClick={() => setedit(true)}>
            Edit Profile <FaUserEdit />
          </button>
        )}
         </div>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
   
  )
}

export default Userprofile