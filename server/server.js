const express=require('express')
require('./config/db')
const cors=require('cors')
const userroute=require('./routes/userRoute')
const jobroute=require('./routes/jobRoute')
const bodyParser=require("body-parser")
const {auth}=require('./middileware/auth')
const app=express()
app.use(bodyParser.json())
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    methods:"*",
    credentials:true
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/job',userroute)
app.use('/employee',jobroute)
app.get('/protected', auth, (req, res) => {
    res.send(`Hello ${req.user.role}`);
  });
app.listen(4000,console.log('server running'))