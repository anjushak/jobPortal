import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../axios';
import { FiCheck, FiDownload, FiX } from 'react-icons/fi';
import { FaUser, FaEnvelope, FaPhone, FaLinkedin, FaBriefcase, FaBuilding, FaMapMarkerAlt, FaDollarSign, FaLocationArrow, FaDownload } from 'react-icons/fa';
import "../styles/application.css"

const ApplicationDetail = () => {
   
    const {id}=useParams();
    const [application, setapplication] = useState([])
    const [action,Setaction] = useState(false)
    const navigate=useNavigate();
    useEffect(() => {
        const fetchApplicationDetails = async () => {
          try {
            const res = await api.get(`/applicant/employer/getsingle/${id}`, { withCredentials: true });
            setapplication(res.data.application);
          } catch (err) {
            console.error(err.message);
            toast.error('Error occurred while fetching application details');
          }
        };
    
        fetchApplicationDetails();
      }, [id]);
      const handleAccept = async () => {
        try {
          await api.post(`/applicant/employer/accept/${id}`, {}, { withCredentials: true });
          toast.success('Application accepted');
          navigate('/employee/applications'); 
          Setaction(true);
        } catch (err) {
          console.error(err.message);
          toast.error('Error occurred while accepting application');
        }
      };
      const handleReject = async () => {
        try {
          await api.post(`/applicant/employer/reject/${id}`, {}, { withCredentials: true });
          toast.success('Application rejected');
          navigate('/employee/applications'); 
          Setaction(true)
        } catch (err) {
          console.error(err.message);
          toast.error('Error occurred while rejecting application');
        }
      };
      const getResumeUrl = (url) => {
        return `http://localhost:4000/${url}`;
      };

  return (
<div className="detailcontainer">
<div className="header">Application Details</div>
<div className="subheading">Application ID: {application?._id} | Date Applied: {new Date(application.appliedOn).toLocaleDateString()}</div>

<div className="card">
  <div className="card-title">Applicant Information</div>
  <div className="card-details">
    <FaUser /> {application.applicantId?.user.name} <br />
    <FaEnvelope /> {application.applicantId?.user.email} <br />
    <FaPhone /> {application.phone} <br />
    <FaLocationArrow /> {application.location}

  </div>
  <div className="card">
        <div className="card-title">Cover Letter</div>
        <div className="card-content">
          {application.coverLetter}
        </div>
      </div>

      <div className="card">
        <div className="card-title">Resume</div>
        <a className="card-link" href={getResumeUrl(application.resume?.url)} target="_blank" rel="noopener noreferrer">
          <FaDownload /> Download Resume
        </a>
      </div>
</div>

<div className="card">
  <div className="card-title">Job Information</div>
  <div className="card-details">
    <FaBriefcase /> {application.jobId ? application.jobId.title : 'N/A'} <br />
    <FaBuilding />{application.jobId ? application.jobId.companyName : 'N/A'} <br />
    <FaMapMarkerAlt /> {application.jobId ? application.jobId.location : 'N/A'} <br />

  
  </div>
</div>

<div className="card">
  <div className="card-title">Application Status</div>
  <div className="card-details" >
  {application.status}
  </div>
</div>

<div className="buttons">
  <button className="button button-edit" onClick={() =>{toast.success('Application Accepted'); handleAccept()} } disabled={action}>Accept</button>
  <button className="button button-delete" onClick={() => {toast.error('Application Rejected'); handleReject()}} disabled={action}>Reject</button>
  <button className="button button-back" onClick={() =>{toast('Back button clicked!');  navigate('/employee/applications');} }>Back</button>
</div>
</div>
  )
}

export default ApplicationDetail