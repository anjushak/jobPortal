
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const usercollection = require('../model/userModel')
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
        const {email,password,role}=req.body;
        if(!email || !password || !role){
         return res.status(400).send("please provide email,password and role")
        }
        
   const newuser=await usercollection.findOne({email:email}).select('+password')
   if(!newuser){
    return res.status(400).send('invalid email or password')
   }
   const hashpassword=newuser.password;
   const ispassword=await bcrypt.compare(password,hashpassword)
   
       
        
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
module.exports={register,login,view}