const { getIO } = require("../socket/socket.js");

const conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const { getReceiverSocketId } = require("../socket/socket");
const { getResult } = require("./geminiAiController.js");
const { generate } = require("../gemini/gemini.js");

const sendMessage = async (req, res) => {
  try {
    const io = getIO();

    let senderId = req.id;
    let receiverId = req.params.id;
    const { messagenew } = req.body;
    let prompt=messagenew;

    let gotConversation = await conversation.findOne({
      participants: { $all: [senderId, receiverId] }, //mongoos dvb operator
    });

    if (!gotConversation) {
      gotConversation = await conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message: messagenew,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }

    await Promise.all([gotConversation.save(), newMessage.save()]);
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(200).json({ newMessage });
    //Gemini Implementaion

    if(receiverId === `677a9c8cf6f5ef7a88f823a3`) {
      let temp = senderId;
      senderId = receiverId;
      receiverId = temp;
      console.log("receiverId in this is chat ai is", receiverId);
      prompt = prompt ? prompt : "Hi how are you?";

      const chatCompletion =await generate(prompt);
      // console.log("in msgcontroller line 52",chatCompletion)
      let gotConversation = await conversation.findOne({
        participants: { $all: [senderId, receiverId] }, //mongoos dvb operator
      });

      if (!gotConversation) {
        gotConversation = await conversation.create({
          participants: [senderId, receiverId],
        });
      }
      const newMessage = await Message.create({
        senderId,
        receiverId,
        message: chatCompletion,
      });

      if (newMessage) {
        gotConversation.messages.push(newMessage._id);
      }

      await Promise.all([gotConversation.save(), newMessage.save()]);
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
      return res.status(200).json({ newMessage });
    }
  } catch (err) {
    console.log("error in message conversation", err);
  }
};
const getMessages = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    // console.log("in msgcont line41", receiverId,senderId)
    const Conversation = await conversation
      .findOne({
        participants: { $all: [senderId, receiverId] },
      })
      .populate("messages");
    //console.log("messages are",Conversation)
    return res.status(200).json(Conversation?.messages);
  } catch (err) {
    console.log("error in messages", err);
  }
};


module.exports = {
  sendMessage,
  getMessages,
};
