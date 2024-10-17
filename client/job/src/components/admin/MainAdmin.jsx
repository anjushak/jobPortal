import React, { useEffect, useState } from 'react'
import "../styles/Admin.css"
import { useNavigate } from 'react-router-dom';
import { api } from '../../axios';
import { FaArrowRightLong } from 'react-icons/fa6';
import Application from './../Applications/Application';
const MainAdmin = () => {
  const navigate = useNavigate();
  const [user,setuser] = useState(0);
  const [employee,setemployee]=useState(0);
  const [jobseeker, setjobseeker] = useState(0);
  const [jobs, setjobs] = useState();
  const [applications, setapplications] = useState(0);
  useEffect(() => {
   api.get('/job/usercount').then(res=>{setuser(res.data.count)})
   .catch(err=>{
    console.log('there was a error in fetching count',err);
   })

    api.get('/job/ecount').then(res=>{setemployee(res.data.count)})
   .catch(err=>{
    console.log('there was a error in fetching count',err);
   })
  
   api.get('/job/jcount').then(res=>{ console.log(res.data); setjobs(res.data.count)  })
   
    .catch(err=>{
      console.log('there was error is fetching count',err);
    })


    api.get('/employee/jobcount').then(res=>{setjobseeker(res.data.count)})
    .catch(err=>{
      console.log('there was error is fetching count',err);
    })
    api.get('/applicant/applcount').then(res=>{setapplications(res.data.count)})
    .catch(err=>{
      console.log('there was error is fetching count',err);
    })
    
  
  
  }, []);

  
  
  const panels = [
    { title: 'Total Users', count: user, color: '#00c0ef',route:"/admin/allusers" },
    { title: 'Total Jobs', count: jobs, color: '#f39c12',route:'/admin/getalljobs' },
    { title: 'Total Applications', count: applications, color: '#00a65a',route:'/admin/applications' },
    { title: 'Total JobSeekers', count: jobseeker, color: '#f56954' },
    { title: 'Total Employers', count: employee, color: '#db33d8  ' },
    
  ];

  return (

    <div  className='controlpanel'>
         <h1 className="dashboard-title">Admin Dashboard</h1>
         <p style={{color:"black",fontSize:"20px",textAlign:"center",fontFamily:"serif"}}>Welcome to the admin dashboard. Here you can manage users, jobs, and applications.</p>
         <div className='panelcontainer'>
             {panels.map((pannel,index)=>(
              
              <div className='panel' key={index} style={{backgroundColor:pannel.color}}>
                <h2>{pannel.count}</h2>
               <p>{pannel.title}</p>
              {pannel.route &&( <button className='info-btn' onClick={()=>navigate(pannel.route)} >More info <FaArrowRightLong /></button>)} 
              </div>

             ))}
         </div>
    </div>
  )
}

export default MainAdmin