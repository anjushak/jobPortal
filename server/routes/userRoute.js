const {Router}=require('express')
const usercontroll=require("../controllers/usercontroll")
const {auth}=require("../middileware/auth")
const userroute=Router();
userroute.post('/register',usercontroll.register);
userroute.post('/login',usercontroll.login);
userroute.get('/profile/:id',usercontroll.view)


userroute.get('/admin/allusers',auth,usercontroll.getallusers);
userroute.patch('/admin/block/:id',auth,usercontroll.blockuser);
userroute.patch('/admin/unblock/:id',auth,usercontroll.unblockuser);
userroute.get('/usercount',usercontroll.usercount)
userroute.get('/ecount',usercontroll.employeecount)
userroute.get('/jcount',usercontroll.jobseekercount);
userroute.put('/updateprofile/:id',usercontroll.updateprofile);
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