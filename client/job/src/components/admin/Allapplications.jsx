import React, { useContext, useEffect, useState } from 'react'
import "../styles/Admin.css"
import { MyContext } from '../..'
import { api } from '../../axios';
const Allapplications = () => {
const {user}=useContext(MyContext)
const [application,setapplication] = useState([])
useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get('/applicant/admin/getall');
        setapplication(response.data.application.reverse())
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    if (user && user.role === 'Admin') {
      fetchApplications();
    }
  }, [user]);
  return (
    <div className='all-users'>
    <div className="users-container">
      <h1 className="users-title">ALL APPLICATIONS</h1>
      {application.length === 0 ? (
        <p className="no-users">No Applications found</p>
      ) : (
        <div className="users-list">
          <span className="users-subtitle">Total applications: {application.length}</span>
         <div className="tablewrapper">
         <table className="users-table">
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Applicant Email</th>
                <th>Phone Number</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {application.map((disp) => (
                <tr key={disp._id}>
                  <td>{disp.name}</td>
                  <td>{disp.email}</td>
                  <td>{disp.phone}</td>
                  <td>{disp.location}</td>
                  <td>{disp.status}</td>
                
                  
                </tr>
              ))}
            </tbody>
          </table>
         </div>
         
        </div>
      )}
    </div>
  </div>
  )
}

export default Allapplications