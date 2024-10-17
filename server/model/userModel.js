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
        require:[true,'phoneno is require'],
        validate: {
            validator: function (v) {
              return /^\+?[1-9]\d{1,14}$/.test(v); // Regex for international phone number format
            },
            message: props => `${props.value} is not a valid phone number!`,
          },
    },
    email:{
        type:String,
        required:[true,'Email is Require'],
        unique:true,
        validate: {
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email!`,
          },
    },
    password:{
        type:String,
        required:[true,'Password is Require'],
        select:false,
        validate: [{
            validator: function (v) {
              return v.length >= 8; // Password must be at least 6 characters
            },
            message: 'Password must be at least 6 characters long!',

          },
        {
            validator: function (v) {
                return /[A-Z]/.test(v); // At least one uppercase letter
              },
              message: 'Password must contain at least one uppercase letter!',
        },
    {
        validator: function (v) {
            return /[a-z]/.test(v); // At least one lowercase letter
          },
          message: 'Password must contain at least one lowercase letter!',

    },
   {
    validator: function (v) {
        return /\d/.test(v); // At least one digit
      },
      message: 'Password must contain at least one digit!',
    }]
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