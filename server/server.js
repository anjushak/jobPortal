const express=require('express')
require('./config/db')
const cors=require('cors')
const userroute=require('./routes/userRoute')
const jobroute=require('./routes/jobRoute')
const applicantroute=require('./routes/ApplicationRoute')
const bodyParser=require("body-parser")
const {auth}=require('./middileware/auth')
const path = require('path');
const app=express()
app.use(bodyParser.json())
app.use(express.json())
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/job',userroute)
app.use('/employee',jobroute)
app.use('/applicant',applicantroute)
app.get('/protected', auth, (req, res) => {
    res.send(`Hello ${req.user.role}`);
  });
app.listen(4000,console.log('server running'))