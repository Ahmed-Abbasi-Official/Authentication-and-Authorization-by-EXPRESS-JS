const mongoose=require('mongoose')
const plm = require('passport-local-mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Authentication')

const userSchema=mongoose.Schema(
  {
    username:{
      type:String,
      required:true
    },
    name:{
      type:String,
      // required:true,
    },
    password:{
      type:String,
      required:true,
    },
    secret:String
  }
)

userSchema.plugin(plm)

module.exports = mongoose.model("User",userSchema);