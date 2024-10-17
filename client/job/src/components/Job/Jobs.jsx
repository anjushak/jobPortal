import React, { useEffect, useState } from 'react'
import { api } from '../../axios';
import "../styles/jobs.css"
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FaLocationArrow } from "react-icons/fa6";
import { GoArrowRight } from "react-icons/go";
import { CiSearch } from 'react-icons/ci';
import { FiFilter } from 'react-icons/fi'; 
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salaryfilter,setsalaryfilter] = useState("");
  const [locationfilter,setlocationfilter] = useState("");
  const [cateogryfilter,setcategoryfilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [searchLetter, setSearchLetter] = useState("");
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/employee/getjobs'); 
        if (res.data.success) {
          const activeJobs = res.data.jobs.filter((job) => !job.disabled);
          setJobs(activeJobs.reverse());
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
  const filterJobs = jobs.filter((job) =>{
  const matchtitle=  job.title.toLowerCase().startsWith(searchLetter.toLowerCase())
  const matchesSalary = salaryfilter ? job.salary >= salaryfilter : true;
  const matchesCategory = cateogryfilter ? job.category === cateogryfilter : true;
  const matchesLocation = locationfilter ? job.city.toLowerCase() === locationfilter.toLowerCase() : true;
  return matchtitle && matchesCategory &&matchesLocation && matchesSalary
});

 

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
            placeholder="Search by job title"
            value={searchLetter}
            onChange={(e) => setSearchLetter(e.target.value)}
          />
          <CiSearch className='search-icon' />
        </div>

        <div className="filter-container">
          <button onClick={() => setShowFilters(!showFilters)} className="filter-button">
            <FiFilter /> 
          </button>
          {showFilters && (
            <div className="filters">
              <select value={salaryfilter} onChange={(e) => setsalaryfilter(e.target.value)}>
                <option value="">Select Salary</option>
                <option value="20000">₹20,000+</option>
                <option value="30000">₹30,000+</option>
                <option value="40000">₹40,000+</option>
                <option value="50000">₹50,000+</option>
              </select>

              {/* <select value={cateogryfilter} onChange={(e) => setcategoryfilter(e.target.value)}>
                <option value="">Select Category</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
               
              </select> */}

             
              <select value={locationfilter} onChange={(e) => setlocationfilter(e.target.value)}>
                <option value="">Select Location</option>
                <option value="Kozhikode">Kozhikode</option>
                <option value="Kochi">Kochi</option>
                <option value="Chennai">Chennai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                {/* Add more categories as needed */}
              </select>

            </div>
          )}
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
                  <p style={{color:"blue"}}>deadline:<span style={{color:"black"}}>{new Date(job.deadline).toLocaleDateString()}</span></p>
                
                 
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