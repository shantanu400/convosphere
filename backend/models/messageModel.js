const mongoose=require('mongoose')
const Schema=mongoose.Schema

const messageSchema=new Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:"true"
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        require:"true"
    },
    message:{
        type:String,
        require: true
    }
},
{timestamps:true});

const Message=mongoose.model("Message",messageSchema)
module.exports=Message