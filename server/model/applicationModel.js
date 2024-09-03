const {Schema,model, default: mongoose}=require('mongoose')
const applicationSchema=new Schema({
 name:{
    type:String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
 },
 email:{
    type:String,
    required: [true, "Please enter your Email!"],
    minLength: [3, "Email must contain at least 3 Characters!"],
    maxLength: [30, "Email cannot exceed 30 Characters!"],
 },
 coverLetter: {
    type: String,
    required: [true, "Please provide a cover letter!"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  location:{
    type:String,
    required: [true, "Please enter your Location!"],
  },
  resume:{
    public_id:{
     type:String,
     required:true,
    },
    url:{
        type:String,
        required:true,
      },
  },
  applicantId:{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,

    },
    role:{
        type:String,
        enum:["Employer","Job seeker"],
        required:true,
    }
  },
  employeeId:{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,

    },
    role:{
        type:String,
        enum:["Employer","Job seeker"],
        required:true,
    }
  },
  appliedOn:{
    type:Date,
    default:Date.now
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jobs',
    required: true
  },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' }
},{timestamps:true})
const Application=model('Application',applicationSchema);
module.exports=Application