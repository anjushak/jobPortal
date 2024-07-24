const {Router}=require('express')
const usercontroll=require("../controllers/usercontroll")
const {auth}=require("../middileware/auth")
const authorize=require("../middileware/authorize")
const userroute=Router();
userroute.post('/register',usercontroll.register);
userroute.post('/login',usercontroll.login);
userroute.get('/profile/:id',usercontroll.view)


module.exports=userroute