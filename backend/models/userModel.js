const mongoose=require('mongoose')
const Schema=mongoose.Schema
const userSchema=new Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilephoto:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        enum:["male","female"],
        required:true
    }

},
{timestamps:true});

const Users=mongoose.model("Users",userSchema)
module.exports=Users
