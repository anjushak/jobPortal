const {Schema,model, default: mongoose}=require('mongoose')

const JobSchema=new Schema({
    title: {
        type:String,
        required:[true,"title is required"],
        minLength:[3,"title must contain at least 3 characters"],
        maxWidth:[30,"title cannot exceed 30 characters "]
    },
    description:{
        type:String,
        required:[true,"description is required"],
        minLength:[30,"description must contain at least 3 characters"],
        maxWidth:[500,"description cannot exceed 500 characters "]
    },
    category:{
        type:String,
        required:[true,"category is required"],
       
    },
    country:{
        type:String,
        required:[true,"country is required"]
    },
    city:{
        type:String,
        required:[true,"city is required"]
    },
    location:{
        type:String,
        required:[true,"location is required"],
        minLength: [5, "location must contian at least 5 characters!"]
    },
    salary: {
        type: Number,
        minLength:[4,"salary must contain atleast 4 digits"],
        maxLength:[9,"salary cannot exceed 9 digits"],
        required: [true, "Salary type is required"]
      },
      companylogo:{
        type:String,
        required:true
      },
      companyName:{
        type:String,
        required:true
      },
    disabled:{
        type:Boolean,
        default:false
    },
    jobPostedOn:{
        type:Date,
        default:Date.now,
    },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
},{
    timestamps:true
})
const jobcollection=model("jobs",JobSchema)
module.exports=jobcollection