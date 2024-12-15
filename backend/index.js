const express=require('express')
const dotenv=require('dotenv');
const connectDB=require('./config/database.js')
const userRouter=require('./routes/userRouter.js');
const messageRouter=require('./routes/messageRouter.js')
const cookieParser = require('cookie-parser');
const cors=require('cors')
dotenv.config({})
connectDB().catch((err)=>{
    console.log("error in index.js mongDB call", err)
})
const app=express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser())
const corsOptions={
    origin:'http://localhost:3000',
    credentials:true
}
app.use(cors(corsOptions))
app.use("/api/v1/user",userRouter);
app.use("/api/v1/message",messageRouter)
app.on('error', (err) => {
    console.error(`Express server error: ${err}`);
  });


const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`server listen at port ${PORT}`)
})