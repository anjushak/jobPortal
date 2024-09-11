import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import toast from 'react-hot-toast';
import { api } from '../../axios';
import { getToken } from '../../localstorage/Localdb';
import { FaLocationArrow } from "react-icons/fa6";
import "../styles/jobs.css"

import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Myjobs = () => {
   
    const [jobs,setjobs] = useState([])

    useEffect(() => {
      const fetchJobs = async () => {
          try {
            
              const res = await api.get('/employee/myjobs', {withCredentials:true});
              setjobs(res.data);
          } catch (err) {
              console.error('Error fetching jobs:', err);
              toast.error('Error fetching jobs. Please try again later.');
          }
      };

      fetchJobs();
  }, []);
  const toggleJobStatus = async (jobId, currentStatus) => {
    try {
      const res = await api.patch(`/employee/togglejob/${jobId}`);
      if (res.status === 200) {
        toast.success(res.data.message);
        setjobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === jobId ? { ...job, disabled: !currentStatus } : job
          )
        );
      } else {
        toast.error('Failed to update job status.');
      }
    } catch (err) {
      toast.error('An error occurred while updating job status.');
      console.error('Error updating job status:', err);
    }
  };
  const handleDisable = async (jobId, currentStatus) => {
    try {
      const res = await api.patch(`/employee/admin/togglejob/${jobId}`);
      if (res.status === 200) {
        toast.success(res.data.message);
        setjobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === jobId ? { ...job, disabled: !currentStatus } : job
          )
        );
      } else {
        toast.error('Failed to update job status.');
      }
    } catch (err) {
      toast.error('An error occurred while updating job status.');
      console.error('Error updating job status:', err);
    }
  };
  return (
 
  <div className='jobspage'>
  <div className="jobscontainer">
    <h1>MY POSTED JOBS</h1>
    <div className="jobsbanner">
      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        jobs.map((job) => (
          <div className="jobsmain" key={job._id}>
            <div className="jobheader">
              <div className="joblogo">
                <img src={job.companylogo} alt="logo" />
              </div>
              <div className="jobinfo">
                <h2>{job.title}</h2>
                <p>{job.category}</p>
                <p><FaLocationArrow /> {job.location}, {job.city}</p>
              </div>
             
            </div>
            <div className="jobdetails">
              <Link className="viewjob" to={`/job/${job._id}`}>View job</Link>
             
              {job.disabled ? (
                <FaEyeSlash onClick={() => toggleJobStatus(job._id, job.disabled)}  style={{fontSize:"19px",marginLeft:"10px"}}/>
                    
                  ) : (
                    <FaEye onClick={() => toggleJobStatus(job._id, job.disabled)} style={{fontSize:"19px",marginLeft:"10px"}}/>
                  )}
                
            </div>
          </div>
        ))
      )}
    </div>
  </div>
</div>

  )
}

export default Myjobs