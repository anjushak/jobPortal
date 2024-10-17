const {Router}=require('express')
const myroute=Router()
const appcontroll=require('../controllers/applicationcontroll')
const {auth}=require('../middileware/auth')
const multer=require('multer')
const path=require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({ storage: storage });
  
  myroute.post('/apply', auth, upload.single('resume'), appcontroll.postapplication);
  myroute.get('/check/:id',auth, appcontroll.checkApplication);
  myroute.get('/employer/getapplications',auth, appcontroll.getEmpApplication);
  myroute.get('/jobseeker/getall',auth, appcontroll.getJobApplication);
  myroute.delete('/jobseeker/delete/:id',auth, appcontroll.deleteApplication);
  myroute.get('/employer/getsingle/:id',auth,appcontroll.getsingleApplication);
  myroute.post('/employer/accept/:id',auth,appcontroll.acceptapplication);
  myroute.post('/employer/reject/:id',auth,appcontroll.rejectapplication);
  myroute.get('/admin/getall',auth,appcontroll.getAllapplication);
  myroute.get('/applcount',appcontroll.applicationcount);
  
module.exports=myroute