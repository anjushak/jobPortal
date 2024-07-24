import React, { useEffect, useState } from 'react'
import { api } from '../../axios';
import "../styles/jobs.css"
import toast from 'react-hot-toast';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/employee/getjobs'); 
        if (res.data.success) {
          console.log(res.data);
          setJobs(res.data.jobs);
        } else {
          toast.error('Failed to fetch jobs.');
        }
      } catch (err) {
        toast.error('An error occurred while fetching jobs.');
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='job-list'>
      <h3>POSTED JOBS</h3>
      <div className='job-items'>
        {jobs.length === 0 ? (
          <p>No jobs available</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className='job-item'>
              <h4>{job.title}</h4>
              <p><strong>Category:</strong> {job.category}</p>
              <p><strong>Country:</strong>{job.country}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Description:</strong> {job.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Jobs