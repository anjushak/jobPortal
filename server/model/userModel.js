const {mongoose}=require('mongoose')
const {Schema,model}=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')
jwt=require('jsonwebtoken')
const userSchema=new Schema({
    name:{
        type:String,
        required:[true,'Name is Require'],
        minLength: [3, "Name must contain at least 3 Characters!"],
        maxLength: [30, "Name cannot exceed 30 Characters!"]
    },
    phoneno:{
        type:Number,
        require:[true,'phoneno is require']
    },
    email:{
        type:String,
        required:[true,'Email is Require'],
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:[true,'Password is Require'],
        select:false
    },
     role: {
        type: String,
        required: [true, "Please select a role"],
        enum: ["Job seeker", "Employer","Admin"],
      },
      createdAt: {
        type:Date,
        default:Date.now
      },
      savedJobs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'jobs',
        default: []
      },
      Blocked:{type:Boolean, default:false}
},
{
    timestamps:true
})
const usercollection=model('users',userSchema)

module.exports=usercollection