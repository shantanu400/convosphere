const conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const {messagenew} = req.body;
   

    let gotConversation = await conversation.findOne({
      participants:{$all:[senderId,receiverId]} , //mongoos dvb operator
    });
   
    if (!gotConversation) {
      gotConversation = await conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message:messagenew,
    });
    
    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }
   
    await gotConversation.save()
   
    return res.status(200).json({ newMessage});
  } catch (err) {
    console.log("error in message conversation", err);
  }
};
const getMessages=async (req,res)=>{
  try{
    const senderId=req.id;
  const receiverId=req.params.id;
 // console.log("in msgcont line41", receiverId,senderId)
  const Conversation=await conversation.findOne({
    participants:{$all:[senderId,receiverId]}
  }).populate("messages");
  //console.log("messages are",Conversation)
  return res.status(200).json(Conversation?.messages)
  }

  catch(err){
    console.log("error in messages",err)
  }
}

module.exports = {
  sendMessage,
  getMessages
};
