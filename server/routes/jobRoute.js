const { Router } = require('express');
const jobRoute = Router();
const jobController = require('../controllers/jobcontroll');
const {auth}=require('../middileware/auth')

// Public routes
jobRoute.get('/getjobs', jobController.getAllJobs);
jobRoute.get('/singlejob/:id', jobController.singleJob);

// Protected routes
jobRoute.post('/postjob', auth, jobController.postJob);
jobRoute.put('/updatejob/:id', auth, jobController.updateJob);
jobRoute.delete('/delete/:id', auth, jobController.deleteJob);
jobRoute.get('/myjobs',auth,jobController.getJobByEmployee)

module.exports = jobRoute;