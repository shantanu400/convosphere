
const jwt=require('jsonwebtoken')
// const dotenv=require('dotenv')
// dotenv.config({})
const isAuthenticated=async (req,res,next)=>{
    try{
        
        const token=req.cookies.token
        //console.log("lone 9 printing token", token)
    if(!token){
        return res.status(400).json({message:"User not authenticated"})
    }
    const decode=await jwt.verify(token,process.env.JWT_SECRET_KEY)
   // console.log("decode hai line 14",decode)
    if (!decode){
        return res.status(400).json({ message:"Invalid Token"});

    }
    req.id=decode.userId;
    //console.log("console control to another")
    next()
    }
    catch(err){
        console.log("err in is authenticated middleware",err)
    }
}
module.exports=isAuthenticated
