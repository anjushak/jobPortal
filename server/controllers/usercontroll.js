
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const usercollection = require('../model/userModel')
const jobs=require('../model/jobModel')
const register=async (req,res)=>{
    try{
     const {name,phoneno,email,password,role}=req.body;
    
     console.log(req.body,password);
     const existingUser = await usercollection.findOne({ email });
     if (existingUser) {
     return res.status(400).send({ message: 'User already exists' });
   }
   const hashedpassword=await bcrypt.hash(password,10);
     const response=await usercollection.create({
        name,
        phoneno,
        email,
        password:hashedpassword,
        role
     })
    
    
     if(response?._id){
     
        const token=jwt.sign({id:response._id,role:response.role},process.env.JWT_KEY,{expiresIn:"7d"})
        console.log(token);
        return res.status(200).send({ token, user: response });
        
    }
   
    
    }catch(err){
        console.log('register error:',err.message);
        return res.status(500).send({message:"internal server error"})
        
    }
}
const login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
         return res.status(400).send("please provide email,password and role")
        }
        
   const newuser=await usercollection.findOne({email}).select('+password');
   if(!newuser){
    return res.status(400).send('invalid email or password')
   }

   if (newuser.Blocked) {
    return res.status(403).send('Your account is blocked. Please contact support.');
}

   const ispassword=await bcrypt.compare(password,newuser.password);
   console.log('Password valid:', ispassword);
   if (!ispassword) {
    return res.status(400).send('Invalid email or password');
}

  
    const token=jwt.sign({sub:newuser},process.env.JWT_KEY,{expiresIn:"7d"})
    
    return res.status(200).send({token:token,newuser})
 }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message:"internal server error"})
    }
}

const view=async (req,res)=>{
    try{
        const id=req.params.id;
        const userprofile=await usercollection.findById(id);
        if(!userprofile){
            return res.status(400).send("user not found")
        }
        return res.status(200).send(userprofile);

    }catch(err){
        return res.status(500).send("internal server error")
    }
   

}
const saveJob=async (req,res)=>{
    try{
       const userid=req.user._id;
       const {jobId}=req.params;
       const user= await usercollection.findById(userid);
       if (!user) {
        return res.status(404).send({ success: false, message: 'User not found' });
       }
       if(user.savedJobs.includes(jobId)){
        return res.status(400).send({success: false, message:'job already saved'})
       }
       user.savedJobs.push(jobId);
       await user.save()
       return res.status(200).send({success: true, message:'job saved successfully'});
    }catch(err){
      console.log(err.message);
      return res.status(500).send('internal server error')
    }
  }
  const viewSavejob = async (req, res) => {
    try {
      const userid = req.user._id;
      const user = await usercollection.findById(userid).populate('savedJobs');
      if (!user) {
        return res.status(404).send({ success: false, message: 'User not found' });
      }
      return res.status(200).send({ success: true, jobs: user.savedJobs });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Internal server error');
    }
  };
  const unSavejob = async (req, res) => {
    try {
      const userid = req.user._id;
      const { jobId } = req.params; 
  
      console.log(`User ID: ${userid}, Job ID: ${jobId}`); 
  
      const user = await usercollection.findById(userid);
      if (!user) {
        return res.status(404).send({ success: false, message: 'User not found' });
      }
  
      console.log(`Saved Jobs: ${user.savedJobs}`); 
  
      
      let jobIdObjectId;
      try {
        jobIdObjectId = new mongoose.Types.ObjectId(jobId);
      } catch (err) {
        return res.status(400).send({ success: false, message: 'Invalid Job ID format' });
      }
  
      console.log(`Converted Job ID: ${jobIdObjectId}`); 
  
     
      const savedJobExists = user.savedJobs.some(savedJobId => savedJobId.equals(jobIdObjectId));
      if (savedJobExists) {
        user.savedJobs.pull(jobIdObjectId);
        await user.save();
  
        console.log('Job unsaved successfully'); 
        return res.status(200).send({ success: true, message: 'Job unsaved successfully' });
      }
  
      console.log('Job not found in saved jobs'); 
      return res.status(400).send({ success: false, message: 'Job not found in saved jobs' });
    } catch (err) {
      console.error('Unsave job error:', err);
      return res.status(500).send({ success: false, message: 'Internal server error' });
    }
  };

  const getallusers=async (req,res)=>{
    try{
       const users=await usercollection.find();
       return res.status(200).send({success:true,users});
    }catch(err){
      console.log(err.message);
      return res.status(500).send('internal server error')
      
    }
  }
const blockuser=async (req,res)=>{
  try{
     const {id}=req.params;
     const user=await usercollection.findByIdAndUpdate(id,{Blocked: true},{new: true});
     if(!user){
      return res.status(404).send({success:false,message:"user not found"})
     }
     return res.status(200).send({success:true,user})

  }catch(err){
    console.log(err.message);
    return res.status(500).send("internal server error");
    
  }
}

const unblockuser=async (req,res)=>{
  try{
       const {id}=req.params;
       const user=await usercollection.findByIdAndUpdate(id,{Blocked: false},{ new:true});
       if(!user){
        return res.status(404).send({success:false,message:"user not found"})
       }
  }catch(err){
    console.log(err.message);
    return res.status(500).send('internal server error')
    
  }
}


 
const usercount=async (req,res)=>{
  try{
        const userrcount=await usercollection.countDocuments({role:{ $ne: 'Admin'}});
        res.json({ count: userrcount });

  }catch(err){
    console.log(err.message);
    return res.status(500).send('internal server error')    
  }
}

const employeecount=async (req,res)=>{
  try{
        const ecount=await usercollection.countDocuments({role:'Employer'});
        res.json({ count: ecount });

  }catch(err){
    console.log(err.message);
    return res.status(500).send('internal server error')    
  }
}
const jobseekercount=async (req,res)=>{
  try{
        const jcount=await usercollection.countDocuments({role:'Job seeker'})
        res.json({count:jcount})
  }catch(err){
    console.log(err.message);
    return res.status(500).send('internal server error')
    
  }
}
module.exports={register,login,view,saveJob,viewSavejob,unSavejob,getallusers,blockuser,unblockuser,usercount,employeecount,jobseekercount}