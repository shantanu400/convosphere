const socketIo = require("socket.io");
let io;
const userSocketMap = {};

const startServer = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "https://convosphere-gold.vercel.app",
      methods: ["GET", "POST"],
    },
  });

  io.on('connection',(socket)=>{
    const userId=socket.handshake.query.userId;
    if(userId!==undefined){
        userSocketMap[userId]=socket.id;
    }
    io.emit('getOnlineUsers',Object.keys(userSocketMap));
    socket.on('disconnect',()=>{
        console.log('Disconnected user is:', socket.id);
        delete userSocketMap[userId];
        io.emit('getOnlineUSers',Object.keys(userSocketMap));
    })
    console.log('client connected to server',socket.id);
  });
}

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

module.exports = { startServer, getIO, getReceiverSocketId };