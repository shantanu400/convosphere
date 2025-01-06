
const { GoogleGenerativeAI } =require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: `your name is Your Companion.you are very efficient and have experience of giving quality information of 10 years . you reply perfect information  
    in all field of work. you can access real-time information. you keep your answer limited to 70 words maximum`

 });


 let history = [
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ];
  
  const generate=async (prompt)=>{
    try{
      history.push({
        role: 'user',
        parts: [{ text: prompt }],
      });
  
      const chat = model.startChat({ history });
  
      let result = await chat.sendMessage(prompt);
     
  
      // Add the model's response to the history
      history.push({
        role: 'model',
        parts: [{ text: result.response.text() }],
      });
  
      return result.response.text();
    }
    catch(err){
      console.log("error in generate function",err)
    }
  }
  
  module.exports={generate}