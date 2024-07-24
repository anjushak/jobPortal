import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../..'
import { api } from '../../axios'
import toast from 'react-hot-toast';
import "../styles/postjob.css"
import { useNavigate } from 'react-router-dom';


const Postjob = () => {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salary,setSalary] = useState("");

  const {isAuthorized,user} = useContext(MyContext)
  const navigate=useNavigate();
  useEffect(() => {
    if (!isAuthorized || (user.role !== "Employer")) {
      navigate('/');
    }
  }, [isAuthorized, user, navigate]);

  const handleJobpost=(e)=>{
    e.preventDefault();
    // if(salaryType==="fixed salary"){
    //       setSalaryFrom("");
    //       setSalaryTo("");
    // }else if(salaryType==="ranged salary"){
    //     setFixedSalary("")
    // }
    if (!title || !description || !category || !country || !city || !location || !salary) {
      toast.error('Please fill out all required fields');
      return;
    }
    // if (salaryType === 'Fixed Salary' && !fixedsalary) {
    //   toast.error('Please provide a fixed salary');
    //   return;
    // }
    // if (salaryType === 'Ranged Salary' && (!salaryFrom || !salaryTo)) {
    //   toast.error('Please provide a salary range');
    //   return;
    
    const jobData = 
    { title, description, category, country, city, location, salary } ;
    
    api.post('/employee/postjob',jobData,{
      withCredentials:true,
      headers:{"Content-Type":"application/json"}
    })
    .then((res)=>{
      toast.success(res.data.message)
      console.log(res)
      navigate('/')
    }).catch((err)=>{
      console.error("Error posting job:", err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || 'An error occurred');
      })

   

  }
  return (
    <div className='job-post'>
     <div className="jobpost-container">
      <h3>POST NEW JOB</h3>
      <form onSubmit={handleJobpost}>
        <div className="postform">
          <input type="text" placeholder='title' name='title' value={title}    onChange={(e) => setTitle(e.target.value)}/>
          <select name="category" id="" value={category}    onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Graphic & Design">Graphic & Design</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Frontend Web Development">Frontend Web Development</option>
            <option value="MERN STACK Development">MERN STACK Development</option>
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
          placeholder='Country'
          name='country'
          value={country}
          onChange={(e) => setCountry(e.target.value)}
           />
           <input type="text"
           placeholder='City' name='city' value={city}    onChange={(e) => setCity(e.target.value)}/>
           
        </div>
        <input type="text"
        placeholder='location'
        name='location' value={location}
        onChange={(e) => setLocation(e.target.value)} style={{fontSize:"17px",padding:"7px 4px",border:"none",background:"transparent",borderBottom:"1px solid gray"}}/>
            <div className="postform">
             
              <input type="number" placeholder='salary' name='salary' value={salary} onChange={(e) =>setSalary(e.target.value)}/>
            </div>
            <textarea name="description" id="" rows={10} placeholder='Job Description' value={description}    onChange={(e) => setDescription(e.target.value)}></textarea>
            <button type='submit'>Create Job</button>
      </form>
     </div>
    </div>
  )
}

export default Postjob
