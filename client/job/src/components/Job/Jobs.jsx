import React, { useEffect, useState } from 'react'
import { api } from '../../axios';
import "../styles/jobs.css"
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FaLocationArrow } from "react-icons/fa6";
import { GoArrowRight } from "react-icons/go";
import { CiSearch } from 'react-icons/ci';
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [savedJobs, setSavedJobs] = useState(new Set()); 
  // const [searchTerm,setsearchTerm] = useState(" ")
  const [searchLetter, setSearchLetter] = useState("");
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/employee/getjobs'); 
        if (res.data.success) {
          const activeJobs = res.data.jobs.filter((job) => !job.disabled);
          setJobs(activeJobs);
          console.log(res.data);
         
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
  const filterJobs = jobs.filter((job) =>
    job.title.toLowerCase().startsWith(searchLetter.toLowerCase())
  );
 

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='jobspage'>
    <div className="jobscontainer">
      <h1>ALL JOBS</h1>
      <div className="search-bar">
          <input
            type="text"
            placeholder="Search by job"
            value={searchLetter}
            onChange={(e) => setSearchLetter(e.target.value)}
          />
         
            <CiSearch  className='search-icon'/>
        
        </div>
      <div className="jobsbanner">
        {filterJobs.length === 0 ? (
          <p>No jobs available</p>
        ) : (
          filterJobs.map((job) => (
            <div className="jobsmain" key={job._id}>
              <div className="jobheader">
                <div className="joblogo">
                  <img src={job.companylogo} alt="logo" />
                </div>
                <div className="jobinfo">
                  <h2>{job.title}</h2>
                  <p className="companyname">{job.companyName}</p>
                  <p><FaLocationArrow /> {job.city}</p>
                  <p className="salary">Salary:  <span className="currency-symbol">₹</span> {job.salary} / month</p>
                
                  {/* <p className="deadline">Deadline: {new Date(job.deadline).toLocaleDateString()}</p> */}
                </div>
              </div>
              <div className="jobdetails">
                <Link className="viewjob" to={`/job/${job._id}`}>View Job <GoArrowRight /></Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
  )
}

export default Jobs