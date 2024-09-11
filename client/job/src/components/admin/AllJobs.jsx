import React, { useEffect, useState } from 'react'
import { api } from '../../axios';
import toast from 'react-hot-toast';
import "../styles/Admin.css"
import { MdDeleteForever } from 'react-icons/md';
const AllJobs = () => {
    const [jobs,setjobs] = useState("")
    useEffect(() => {
        const fetchJobs = async () => {
          try {
            const res = await api.get('/employee/getjobs'); 
            if (res.data.success) {
              const activeJobs = res.data.jobs.filter((job) => !job.disabled);
              setjobs(activeJobs);
              console.log(res.data);
             
            } else {
              toast.error('Failed to fetch jobs.');
            }
          } catch (err) {
            toast.error('An error occurred while fetching jobs.');
            console.error('Error fetching jobs:', err);
          } 
        };
    
        fetchJobs();
      }, []);
      const remove=(id)=>{
        api.delete(`/employee/delete/${id}`).then((res)=>{
          console.log(res);
          const dele=jobs.filter(item=>item._id!==id)
          setjobs(dele)
        }).catch((err)=>{
          console.log(err);
          
        })
}
  return (
    <div>
      <div className='all-users'>
    <div className="users-container">
      <h1 className="users-title">ALL JOBS</h1>
      {jobs.length === 0 ? (
        <p className="no-users">No users found</p>
      ) : (
        <div className="users-list">
          <span className="users-subtitle">Total Jobs:  {jobs.length}</span>
         
          <table className="users-table">
            <thead>
              <tr>
                <th>logo</th>
                <th>Company Name</th>
                <th>Job Title</th>
                <th>Category</th>
                <th>City</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td><img src={job.companylogo} alt="" width={"50px"}/></td>
                  <td>{job.companyName}</td>
                  <td>{job.title}</td>
                  <td>{job.category}</td>
                  <td>{job.city}</td>
                  <td>{job.salary}</td>
                  <td><MdDeleteForever   onClick={()=>remove(job._id)}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
    </div>
  )
}

export default AllJobs