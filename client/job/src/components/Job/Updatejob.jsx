import React, { useEffect, useState } from 'react'
import "../styles/postjob.css"
import { useNavigate, useParams } from 'react-router-dom'
import { getToken } from '../../localstorage/Localdb'
import { api } from '../../axios'
const Updatejob = () => {
    const navigate=useNavigate()
    const {id}=useParams();
    const [jobData, setJobdata] = useState({title:"",description:"",category:"",country:"",city:"",location:"",companylogo:"",salary:"",companyName:""})

  useEffect(() => {
    const fetchJobs = async () => {
       
        const res = await api.get(`/employee/singlejob/${id}`);
        setJobdata(res.data.singlejob);
    };

    fetchJobs();
}, [id]);

   const editJob=(e)=>{
       setJobdata({...jobData,[e.target.name]:e.target.value});
   }

   const handleEdit=()=>{
    api.put(`/employee/updatejob/${id}`,jobData).then((res)=>{
        navigate(`/job/${id}`)
    }).catch((err)=>{console.log(err)})
   }
  return (
    <div>
        <div className='job-post'>
     <div className="jobpost-container">
      <h3>UPDATE JOB</h3>
      <form onSubmit={(e)=>{e.preventDefault();
        handleEdit();
      }} 
      onChange={editJob}>
        <div className="postform">
          <input type="text" placeholder='title' name='title' value={jobData.title} />
          
          <select name="category" id="" value={jobData.category}>
            <option value="">Select Category</option>
            <option value="Graphic & Design">Graphic & Design</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Frontend Web Development">Frontend Web Development</option>
            <option value="MERN STACK Development">Mern Stack Development</option>
            <option value="Account & Finance">Account & Finance</option>
            <option value=" Artificial Intelligence"> Artificial Intelligence</option>
            <option value=" MEAN STACK Development">  MEAN STACK Development</option>
            <option value="Video Animation">Video Animation</option>
            <option value="Data Entry Operator">Data Entry Operator</option>
            <option value=""></option>
            <option value=""></option>
          </select>
        </div>
        <div className="postform">
          <input type="text"
          placeholder='Company name'
          name='company'
          value={jobData.companyName}
         
           />
         
           
        </div>
        <div className="postform">
          <input type="text"
          placeholder='Country'
          name='country'
          value={jobData.country}
        
           />
           <input type="text"
           placeholder='City' name='city' value={jobData.city}   />
           
        </div>
        <div className="postform">
          <input type="text"
          placeholder='CompanyLogo URL '
          name='logo'
          value={jobData.companylogo}
         
           />
         
        </div>
        <input type="text"
        placeholder='location'
        name='location' value={jobData.location}
       style={{fontSize:"17px",padding:"7px 4px",border:"none",background:"transparent",borderBottom:"1px solid gray"}}/>
            <div className="postform">
             
              <input type="number" placeholder='salary' name='salary' value={jobData.salary} />
            </div>
            <textarea name="description" id="" rows={10} placeholder='Job Description' value={jobData.description}></textarea>
            <button type='submit'>Update Job</button>
      </form>
     </div>
    </div>
    </div>
  )
}

export default Updatejob