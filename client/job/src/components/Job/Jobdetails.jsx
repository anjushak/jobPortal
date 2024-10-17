import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MyContext } from './../../index';
import { api } from '../../axios';
import { FaEye, FaEyeSlash, FaLocationArrow } from 'react-icons/fa';
import { GoArrowRight } from 'react-icons/go';

const Jobdetails = () => {
  const { id } = useParams();
  const [job, setjob] = useState(null);
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(MyContext);

  useEffect(() => {
   
    const fetchJob = async () => {
      try {
        const res = await api.get(`/employee/singlejob/${id}`, { withCredentials: true });
        if (res.data && res.data) {
          setjob(res.data.singlejob);
        } else {
          navigate('/notfound');
        }
      } catch (err) {
        navigate('/notfound');
      }
    };

    const checkApplication=async ()=>{
      try{
        const res=await api.get(`/applicant/check/${id}`,{},{withCredentials:true});
        console.log('Application check response:', res.data);
        if (res.data.isApplied) {
          setApplied(true);
        } else {
          setApplied(false);
        }

      }catch(err){
        console.log('error applying this job',err.response?.data?.message || err.message);
  
        
      }
      
    }

    fetchJob();
    checkApplication();
  }, [id, navigate]);

 

  if (!job) {
    return <div>Job details not available</div>;
  }
  
  return (
    <div className='job-details'>
      <div className='detail-header'>
        <div className='logo'><img src={job.companylogo} alt='Company Logo' /></div>
        <div className='header-info'>
          <h2>{job.title}</h2>
          <p>{job.companyName}</p>
          <p>{job.category} | <span style={{color:"black"}}>Posted on:</span> {new Date(job.jobPostedOn).toLocaleDateString()} |<span style={{color:"red"}}>Deadline: </span> {new Date(job.deadline).toLocaleDateString()}</p>
          
        </div>
      </div>
      <div className='detail-content'>
        <div className='job-summary'>
          <h3>Job Details</h3>
          <p>{job.description}</p>
        </div>
        <div className='job-info'>
         
          <div className='location'><p> <span style={{color:"brown"}}><FaLocationArrow /></span> {job.location},{job.city},{job.country} </p></div>
         <div className='salaryinfo'><p> salary:  <span className="currency-symbol">₹</span>{job.salary} / month</p></div> 
        </div>
      </div>
      {user && user.role !== "Employer" ? (
        applied ?( <button className='apply-button' disabled>Already applied</button>):(  <Link  to={`/application/${job._id}`} state={{ job }} className='apply-button'>Apply For Job <GoArrowRight  /></Link>)
           
      ):(<Link to={`/updatejob/${job._id}`} className='apply-button'>Update Job</Link>)}
       
    </div>
  );
};

export default Jobdetails;