import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../..'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { api } from '../../axios'
import "../styles/application.css"
import { FiDelete, FiEye } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md'


const Myapplications = () => {
  const {user} = useContext(MyContext)
  const [applications, setApplications] = useState([])
  
  const {isAuthorized} = useContext(MyContext)

  const navigate=useNavigate();

  useEffect(() => {
       const fetchApplication=async ()=>{
        try{ 
              const res=await api.get('/applicant/jobseeker/getall',{withCredentials:true}).then((res)=>{
                console.log(res.data.applications);
                
                setApplications(res.data.applications);
            
                

              })
        }
        catch(err){
          toast.error('error occured while fetching application')
          console.log(err)
        }
       }
       fetchApplication();
  }, [isAuthorized]);
  const handleDelete = async (applicationId) => {
    try {
      const response= await api.delete(`/applicant/jobseeker/delete/${applicationId}`, { withCredentials: true });
      console.log('Delete response:', response);
      setApplications(applications.filter(application => application._id !== applicationId));
      toast.success('Application deleted successfully');
    } catch (err) {
      toast.error('Error occurred while deleting the application');
      console.error(err.message);
    }
  };
  

  return (
    <div className='my-applications'>
    <div className="my-container">
      <h1>MY APPLICATIONS</h1>
      {applications.length === 0 ? (
        <p>No applications found</p>
      ) :(
        <div className="myappl-list">
          <span className="summary-title">Total Applied Jobs:</span>
          <span className="summary-count">{applications.length}</span>
          <table className="applications-table">
            <thead>
              <tr>
                <th>Apply Date</th>
                <th>Company</th>
                <th>Job Title</th>
                <th>Job Salary</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application._id}>
                  <td>{new Date(application.appliedOn).toLocaleDateString()}</td>
                  <td>{application.jobId.companyName}</td>
                  <td>{application.jobId.title}</td>
                  <td>{application.jobId.salary}</td>
                  <td className={`status ${application.status.toLowerCase()}`}>{application.status}</td>
                 
                  <td><button style={{border:"none",backgroundColor:"white"}} onClick={()=>handleDelete(application._id)}><FiDelete style={{color:"black",fontSize:"20px"}}/></button></td>
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

export default Myapplications