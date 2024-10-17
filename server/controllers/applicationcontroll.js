const mongoose=require('mongoose')

const Application=require('../model/applicationModel')
const jobcollection=require('../model/jobModel')

const usercollection=require("../model/userModel")
const postapplication= async (req,res)=>{
    try{
           const {role}=req.user;
           if (role === "Employer") {
               return res.status(400).send({message:'Employer not allowed to access this resource.'})
          }
      
          const { name, email, phone, location, coverLetter, jobId } = req.body;
          const resume = {
            url: req.file.path,
            public_id:req.file.filename
          }
          const user = await usercollection.findById(req.user._id);
         
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    const job = await jobcollection.findById(jobId);
    if (!job) {
      return res.status(400).send({ message: 'Job not found' });
    }
          const applicationdata={
            name,
            email,
            phone,
            location,
            coverLetter,
            resume,
            jobId,
            employeeId: {
                role: 'Employer',
                user: job.postedBy
              },
              applicantId: {
                role: 'Job seeker',
                user: user._id
              }
          }
          console.log('application data to be saved',applicationdata);
          const newApplication=await Application.create(applicationdata);
          return res.status(201).send({ message: 'Application submitted successfully!', newApplication });

            
          
         
    }catch(err){
        console.log(err.message);
        return res.status(500).send('internal server error');
        
    }

}

const checkApplication=async (req,res)=>{
  try{
    const {id}=req.params;
    const userId=req.user._id;

    
    const application = await Application.findOne({ 'applicantId.user': userId, 'jobId': id });
    
    console.log('Application found:', application);
    if (application) {
      return res.status(200).send({ isApplied: true });
      
    } else {
      return res.status(200).send({ isApplied: false });
    }
  }
  catch(err){
    console.log(err.message);
    
    return res.status(500).send('internal server error')
  }

}

const getEmpApplication=async (req,res)=>{
  try{
        const {role}=req.user;
        if(role=="Job seeker"){
          return res.status(400).send({success:false,message:"Job seeker not allowed to access this"})
        }
        const {_id}=req.user;
        const applications=await Application.find({"employeeId.user":_id})
        .populate('jobId', 'title companyName location salary deadline jobPostedOn')
        .populate('applicantId.user', 'name email phone');
        console.log("Applications fetched:", applications);
        return res.status(200).send({success:true,applications})

  }catch(err){
    console.log(err.message);
    return res.status(500).send('internal server error')
    
  }

}
const getJobApplication=async (req,res)=>{
  try{
     const {role}=req.user;
     if(role==="Employer"){
      return res.status(400).send({succcess:false,message:"Employer not allowed to access this"})
     }
     const {_id}=req.user;
     const applications=await Application.find({"applicantId.user":_id}).populate('jobId', 'title companyName location salary deadline  jobPostedOn');
     return res.status(200).send({success:true,applications})

     }
  catch(err){
   console.log(err.message);3
   return res.status(500).send("internal server error");

   
  }

}
const getAllapplication=async (req,res)=>{
  try{
       const application=await Application.find();
       return res.status(200).send({success:true,application})

  }catch(err){
    console.log(err.message);
    return res.status(500).send("internal server error");
    
  }
}

const getsingleApplication=async (req,res)=>{
  try{
         const {id}=req.params;
         const userId=req.user._id;
         const application=await Application.findById(id)
         .populate('jobId', 'title companyName location salary deadline jobPostedOn')
         .populate('applicantId.user', 'name email phone')
         .populate('employeeId.user', 'name email phone');
         console.log('Fetched Application:', application);
         if(!application){
           return res.status(400).send({success:false,message:"application not foound"})

         }
         return res.status(200).send({succcess:true,application})
  }catch(err){
     console.log(err.message);
     return res.status(500).send("internal server error")
     
  }
}
const deleteApplication=async (req,res)=>{
  try{
      const {role}=req.user;
      if(role==="Employer"){
        return res.status(400).send({succcess:false,message:"Employer not allowed to access this"})
       }
       const {id}=req.params;
       const application=await Application.findByIdAndDelete(id);
       
       
       if(!application){
        return res.status(400).send('application not found!');

       }
      
       console.log(application);
       
       return res.status(200).send({success:true,message:"Application deleted!"})

  }catch(err){
    console.log(err.message);
    return res.status(500).send("internal server error")
  }
}
const acceptapplication=async (req,res)=>{
  try{
         const {id}=req.params;
         await Application.findByIdAndUpdate(id,{status:"Accepted"})
         return res.status(200).send({succcess:true,message:"Application accepted!"})
  }catch(err){
    console.log(err.message);
    return res.status(500).send("internal server error")

     
  }
}
const rejectapplication=async (req,res)=>{
  try{
         const {id}=req.params;
         await Application.findByIdAndUpdate(id,{status:"Rejected"})
         return res.status(200).send({succcess:true,message:"Application Rejected!"})
  }catch(err){
    console.log(err.message);
    return res.status(500).send("internal server error")

     
  }
}
const applicationcount=async (req,res)=>{
  try{
      const applcount=await Application.countDocuments();
      res.json({ count: applcount });
  
   }
  catch(err){
    console.log(err.message);
    return res.status(500).send("internal server error");
  }
}
module.exports={
  postapplication,
  checkApplication
  ,getEmpApplication,
  getJobApplication,
  deleteApplication,
  getsingleApplication,
  acceptapplication,
  rejectapplication,
  applicationcount,
  getAllapplication
};
