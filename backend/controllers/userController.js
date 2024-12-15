const mongoose = require("mongoose");
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
const register = async (req, res) => {
  try {
    const { username, password, confirmpassword, fullname, gender } = req.body;
    if (
      !username ||
      !password ||
      !confirmpassword ||
      !fullname ||
      !gender
    ) {
      return res.status(400).json({ message: "all feild are mandatory" });
    }
    if (password != confirmpassword) {
      return res
        .status(400)
        .json({ message: "password not matched with confirm password" });
    }
    const User = await Users.findOne({ username });
    if (User) {
      return res.status(400).json({ message: "user already present" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const maleprofielphoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleprofielphoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    await Users.create({
      fullname,
      username,
      password: hashedpassword,
      profilephoto: gender === "male" ? maleprofielphoto : femaleprofielphoto,
      gender,
    });
    return res.status(200).json({message:"User registered successfully", status:true})
  } catch (err) {
    console.log("Error in register", err);
  }
};

const login=async (req,res)=>{
  try{
    const {username,password}=req.body;
    //console.log(" line 45 login",username, password)
  if(!username|| !password){
    return res.status(400).json({message:"All feilds are mandatory"})
  }
  const user=await Users.findOne({username})
  if(!user){
    return res.status(400).json({
      message:"user not found", 
      success:"false"
    })
  }
  const ispasswordmatched= await bcrypt.compare(password,user.password)
  if(!ispasswordmatched){
 return res.status(400).json({
  message:"password is wrong",
  success:false
 })

  }
  const tokenData={
    userId:user._id
  }
  const token= await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
  return res.status(200).cookie('token',token,{maxAge:1*24*60*60*1000,httpOnly:true ,secure: true,sameSite: 'None',}).json({
    _id:user._id,
    fullname:user.fullname,
    username:user.username,
    profilephoto:user.profilephoto
  })
  }
  catch(err){
    console.log('error in login controller',err)
  }
}

const logout=async (req,res)=>{
  try{
    return res.status(200).cookie("token",'',{maxAge:0}).json({
      message:"loggedout successfully"
    })
  }catch(err){
    console.log("error in logout",err)
  }
}

const getOtherUsers=async (req,res)=>{
  try{
    //console.log("get user reached controller line 90")
    const loggedInUserId=req.id
    const otherUsers= await Users.find({_id:{$ne:loggedInUserId}}).select("-password")
    
    return res.status(200).json(otherUsers)
  
  }catch(err){
    console.log("error in find all user",err)
  }
}
module.exports={
  register,
  login,
  logout,getOtherUsers
}
