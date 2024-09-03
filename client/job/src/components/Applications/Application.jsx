import React, { useContext, useState } from 'react'
import "../styles/application.css"
import { MyContext } from '../..'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../axios'
import toast from 'react-hot-toast'
const Application = () => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [coverLetter, setCoverLetter] = useState("");
   const [phone, setPhone] = useState("");
   const [location, setLocation] = useState("");
   const [resume, setResume] = useState(null);
  const {isAuthorized, user} = useContext(MyContext)

  const navigate=useNavigate();
 const handleFilechange=(e)=>{
  const resume=e.target.files[0];

  setResume(resume);
 };
 const {id:jobId}=useParams();

 const handleApplication=async (e)=>{
  e.preventDefault();
   
  if (!name|| !email || !phone || !location || !coverLetter || !resume) {
    toast.error('Please fill out all required fields');
    return;
  }

  const formData={name,email,phone,location,coverLetter,resume,jobId};
 
  
  
    api.post('/applicant/apply',formData,{
      withCredentials:true,
      headers:{'Content-Type': 'multipart/form-data'},
     
    })
    
    .then((res)=>{
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setLocation("");
      setResume("");
      toast.success(res.data.message,"you will be updated soon");
      
      console.log(res)
      navigate('/job/getall')
    }).catch((err)=>{
      console.error("Error posting job:", err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || 'An error occurred');
      })
   
      
  
   
 }

  return (
    <div className='application'>
        <div className='appl-container'>
           <h3>APPILCATION FORM</h3>
           <form  onSubmit={handleApplication}>
            <input type="text" placeholder='Your Name'  value={name} name='name' onChange={(e)=>setName(e.target.value)}/>
            <input type="email" placeholder='Your Email'value={email} name='email' onChange={(e)=>setEmail(e.target.value)}/>
            <input type="number" placeholder='Your Phone Number' value={phone} name='phone'onChange={(e)=>setPhone(e.target.value)}/>
            <input type="text" placeholder='Your Location' value={location} name='location'onChange={(e)=>setLocation(e.target.value)}/>
            <textarea name="coverLetter" id="" placeholder='Cover Letter...' value={coverLetter} onChange={(e)=>setCoverLetter(e.target.value)}></textarea>
            <div className='file-input'>

            <label htmlFor="" style={{textAlign:"start",}}>Select Resume</label>
            <input type="file" accept='.pdf , .jpg, .png'  style={{width:"100%"}} onChange={handleFilechange} />
            </div>
             <button type='submit'>Send Application</button>
           </form>
        </div>
    </div>
  )
}

export default Application