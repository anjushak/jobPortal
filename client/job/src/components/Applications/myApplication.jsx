import React from 'react'
import { FaDownload, FaEnvelope, FaLocationArrow, FaPhone, FaUser } from 'react-icons/fa';

const ViewmyApplication = () => {
    
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
      <div className="card-title">Application Status</div>
      <div className="card-details" >
      {application.status}
      </div>
    </div>
    
    <div className="buttons">







      
      <button className="button button-edit" onClick={() =>{toast.success('Application Accepted'); handleAccept()} } disabled={action}>Accept</button>

      <button className="button button-back" onClick={() =>{toast('Back button clicked!');  navigate('/employee/applications');} }>Back</button>
    </div>
    </div>
  )
}

export default ViewmyApplication