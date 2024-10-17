const { Router } = require('express');
const jobRoute = Router();
const jobController = require('../controllers/jobcontroll');
const {auth}=require('../middileware/auth')

jobRoute.get('/getjobs', jobController.getAllJobs);
jobRoute.get('/singlejob/:id', jobController.singleJob);
jobRoute.post('/postjob', auth, jobController.postJob);
jobRoute.put('/updatejob/:id', auth, jobController.updateJob);
jobRoute.patch('/togglejob/:id',jobController.togglejob);
jobRoute.delete('/delete/:id', auth, jobController.deleteJob);
jobRoute.get('/myjobs',auth,jobController.getJobByEmployee);

jobRoute.patch('/admin/toggle/:id',jobController.admintogglejob);
jobRoute.get('/jobcount',jobController.jobcount);

module.exports = jobRoute;