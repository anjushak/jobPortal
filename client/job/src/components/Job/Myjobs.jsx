import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { MyContext } from '../..';
import toast from 'react-hot-toast';
import { api } from '../../axios';
import { getToken } from '../../localstorage/Localdb';

const Myjobs = () => {
   
    const [jobs,setjobs] = useState([])
    const {isAuthorized,setAuthorized}=useContext(MyContext)

    useEffect(() => {
      const fetchJobs = async () => {
          const config = {
              headers: {
                  'x-auth-token': getToken()
              }
          };
          const res = await api.get('/employee/myjobs', config);
          setjobs(res.data);
      };

      fetchJobs();
  }, []);
  return (
    <div>
              <h1>My Jobs</h1>
            <ul>
                {jobs.map(job => (
                    <li key={job._id}>{job.title}</li>
                    
                ))}
            </ul>

    </div>

  )
}

export default Myjobs