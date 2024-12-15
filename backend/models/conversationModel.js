const mongoose=require('mongoose')
const conversationSchema=new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
      ref:"Message"
    }]

},
{timestamps:true});
const conversation=mongoose.model("conversation",conversationSchema)
module.exports=conversation