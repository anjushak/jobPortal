

const jobcollection=require("../model/jobModel")
const mongoose=require("mongoose")
const usercollection = require("../model/userModel")

const getAllJobs=async (req,res)=>{
    try{
        const jobs=await jobcollection.find({expired:false})
        console.log();
        return res.status(200).send({success:true,jobs})

    }
    catch(err){
        return res.status(500).send("internal server error")
    }
   

}



const postJob = async (req, res) => {
    try {
      const { title, description, category, country, city, location, salary} = req.body;
  
      console.log("Received job data:", req.body);
  
     
      if (!title || !description || !category || !country || !city || !location || !salary) {
        return res.status(400).send("Please provide full job details");
      }
      console.log("Authenticated user:", req.user);
      if (!req.user || !req.user._id) {
        console.log("Authenticated user:", req.user);
        return res.status(401).send({ success: false, message: "Unauthorized, user not found" });
    }

      
      const jobData = {
        title,
        description,
        category,
        country,
        city,
        location,
        salary:Number(salary),
        postedBy:req.user._id,
        
      };
  
     
  
      console.log("Job data to be saved:", jobData); 
  
    
  
      const job = await jobcollection.create(jobData);
  
      return res.status(200).send({ success: true, message: "Job posted successfully",job});
    } catch (err) {
      console.log("Error:", err.message);
      return res.status(500).send("Internal server error");
    }
  };

  const updateJob=async (req,res)=>{
    try{
         const {id}=req.params;
         const body=req.body;
         const job=await jobcollection.findById(id)
         if(!job){
          return res.status(400).send("oops job not found")
         }
        const updatedjob=await jobcollection.findByIdAndUpdate({_id:id},req.body,{new:true,runValidators:true})
         return res.status(200).send({success:true,message:"job updated!",updatedjob})
    }catch(err){
      return res.status(500).send("internal server error")
    }
  }
  const deleteJob=async (req,res)=>{
    try{
         const {id}=req.params;
         const deletejob=await jobcollection.findByIdAndDelete({_id:id})
         return res.status(200).send({deletejob,success:true,message:"Job deleted"})
    }catch(err){
      return res.status(500).send("internal server error")
    }
  }

  const singleJob=async (req,res)=>{
    try{
        const {id}=req.params;
        const singlejob=await jobcollection.findById(id);
        if(!singlejob){
          return res.status(400).send("job is not found")
        }
        return res.status(200).send({singlejob,success:true})
    }catch(err){
      return res.status(500).send("internal server error")
    }
  }
  
  // const getJobsByEmployee=async (req,res)=>{
  //   try{
  //     const {id}=req.params;
     
  //     const jobs=await jobcollection.find({id})
  //     if (!jobs) {
  //       return res.status(404).send({ message: 'Job not found' });
  //   }
  //     return res.status(200).send({success:true,jobs})
     
  //   }catch(err){
  //     console.log(err.message)
  //     return res.status(500).send("internal server error")
  //   }
  // }

  const getJobByEmployee = async (req, res) => {
    try {
        const jobs=await jobcollection.find({postedBy: req.user._id})
        return res.status(200).send(jobs)
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Internal server error");
    }
  };
  module.exports={getAllJobs,postJob,updateJob,deleteJob,singleJob,getJobByEmployee}