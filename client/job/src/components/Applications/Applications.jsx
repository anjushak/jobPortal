import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../..'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../../axios';
import { FiDownload, FiEye } from 'react-icons/fi';

const Applications = () => {
  const {user}=useContext(MyContext);
  const [applications, setapplications] = useState([]);
  const navigate=useNavigate();
  const { isAuthorized } = useContext(MyContext);

  useEffect(() => {
     const fetchApplications=async ()=>{
      try{ 
            const res=await api.get('/applicant/employer/getapplications',{withCredentials:true}).then((res)=>
            {
              console.log(res.data);
              setapplications(res.data.applications);
            })
           
            
           
      }catch(err){
        console.log(err.message);
        
        toast.error('error occured while fetching applications')
      }
     }
     fetchApplications();
  }, [isAuthorized])
  
  // const getResumeUrl = (url) => {
  //   return `http://localhost:4000/${url}`;
  // };


  const viewDetails = (applicationId) => {
    navigate(`/applications/details/${applicationId}`);
  };
  return (
    <div className='my-applications'>
    <div className="my-container">
      <h1>APPLICATIONS FOR JOBS</h1>
      {applications.length === 0 ? (
        <p>No applications found</p>
      ) :(
        <div className="myappl-list">
          <span className="summary-title">Total Applications:</span>
          <span className="summary-count">{applications.length}</span>
          <table className="applications-table">
            <thead>
              <tr>
              <th>Apply Date</th>
                <th>Job Title</th>
                 <th>Name</th>
                 <th>Email</th>
                 <th>Phone No</th>
                 <th>Location</th>
                 {/* <th>Cover Letter</th> */}
                 <th>Action</th>
                


              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application._id}>
                  <td>{new Date(application.appliedOn).toLocaleDateString()}</td>
                  <td>{application.jobId.title}</td>
                  <td>{application.applicantId.user.name}</td>
                  <td>{application.applicantId.user.email}</td>
                  <td>{application.phone}</td>
                
                  <td>{application.location}</td>
               
                 <td className={`status ${application.status.toLowerCase()}`}>{application.status}</td>
                <td><Link to={`/applications/details/${application._id}`}><button className='view-detail-btn'> <FiEye /> View Details</button></Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
  )
}

export default Applications