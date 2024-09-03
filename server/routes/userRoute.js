const {Router}=require('express')
const usercontroll=require("../controllers/usercontroll")
const {auth}=require("../middileware/auth")
const authorize=require("../middileware/authorize")
const userroute=Router();
userroute.post('/register',usercontroll.register);
userroute.post('/login',usercontroll.login);
userroute.get('/profile/:id',usercontroll.view)
userroute.post('/savejob/:jobId', auth, usercontroll.saveJob); 
userroute.get('/savedjobs',auth,usercontroll.viewSavejob);
userroute.delete('/unsave/:jobid',auth,usercontroll.unSavejob);
userroute.get('/admin/allusers',auth,usercontroll.getallusers);
userroute.patch('/admin/block/:id',auth,usercontroll.blockuser);
userroute.patch('/admin/unblock/:id',auth,usercontroll.unblockuser);
userroute.get('/getuser',auth,(req,res)=>{
    try{
        if(!req.user){
            return res.status(400).send({message:"user not found"})
        }
       return res.status(200).send({user:req.user})
    }
    catch(err){

    }
})
module.exports=userroute