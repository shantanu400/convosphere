// const express=require('express')
// const dotenv=require('dotenv');
// const connectDB=require('./config/database.js')
// const userRouter=require('./routes/userRouter.js');
// const messageRouter=require('./routes/messageRouter.js')
// const cookieParser = require('cookie-parser');
// const cors=require('cors')
// const socketIo=require('socket.io')
// const http=require('http')

// dotenv.config({})
// connectDB().catch((err)=>{
//     console.log("error in index.js mongDB call", err)
// })
// const app=express();
// app.use(express.urlencoded({extended:true}))
// app.use(express.json());
// app.use(cookieParser())
// const corsOptions={
//     origin:'http://localhost:3000',
//     credentials:true
// }
// app.use(cors(corsOptions))
// app.use("/api/v1/user",userRouter);
// app.use("/api/v1/message",messageRouter)
// app.on('error', (err) => {
//     console.error(`Express server error: ${err}`);
//   });


  

// const server=http.createServer(app);
// const io=socketIo(server,{
//     cors:{
//         origin:'http://localhost:3000',
//         methods:['GET','POST']
//     }

// });
// const userSocketMap={};
// io.on('connection',(socket)=>{
//     const userId=socket.handshake.query.userId;
//     if(userId!==undefined){
//         userSocketMap[userId]=socket.id;
//     }


//     io.emit('getOnlineUsers',Object.keys(userSocketMap));

//     socket.on('disconnect',()=>{
//         console.log('Disconnected user is:', socket.id);
//         delete userSocketMap[userId];
//         io.emit('getOnlineUSers',Object.keys(userSocketMap));
//     })
    

//     console.log('client connected to server',socket.id);
// })

// const getReceiverSocketId=(receiverId)=>{
//     return userSocketMap[receiverId];
// }

// const PORT=process.env.PORT || 3000
// server.listen(PORT,()=>{
//     console.log(`server listen at port ${PORT}`)
// })

// module.exports={io,getReceiverSocketId};


const express=require('express')
const dotenv=require('dotenv');
const connectDB=require('./config/database.js')
const userRouter=require('./routes/userRouter.js');
const messageRouter=require('./routes/messageRouter.js')
const geminiRouter=require('./routes/geminiRoutes.js')
const cookieParser = require('cookie-parser');
const cors=require('cors')
global.Headers = require('node-fetch').Headers;  // added because it was showing error that 'Headers is not defined' and is needed by @google/generative-ai so globally assign this so that it can be available everywhere
global.fetch = require('node-fetch');  // added because it was showing error that 'fetch is not defined' and is needed by @google/generative-ai so globally assign this so that it can be available everywhere
const http=require('http')
const { startServer, getIO, getReceiverSocketId } = require('./socket/socket');

dotenv.config({})
connectDB().catch((err)=>{
    console.log("error in index.js mongDB call", err)
})

const app=express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser())

const corsOptions={
    // origin:'http://localhost:3000',
    origin:'https://convosphere-gold.vercel.app',
    credentials:true
}
const server=http.createServer(app);
startServer(server);
console.log("now commit")


app.use(cors(corsOptions))
app.use("/api/v1/user",userRouter);
app.use("/api/v1/message",messageRouter)


app.on('error', (err) => {
    console.error(`Express server error: ${err}`);
});



const PORT=process.env.PORT || 3000
server.listen(PORT,()=>{
    console.log(`server listen at port ${PORT}`)
})
module.exports = app;