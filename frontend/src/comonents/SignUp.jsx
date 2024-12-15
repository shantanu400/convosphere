import axios from "axios";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate=useNavigate();
    const [user,setUser]=useState({
        fullname:"",
        username:"",
        password:"",
        confirmpassword:"",
        gender:""
    })
    const handlecheckbox=(gender)=>{
        setUser({...user,gender})
    }

    const onSubmitHandle=async (e)=>{
        e.preventDefault(); 
        try{
            const res= await axios.post('http://localhost:8000/api/v1/user/register',user,{
                header:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            })
            if(res.data.status){
              navigate('/login');
              toast.success(res.data.message)

            }
            console.log(res)

        }
        catch(err){
            console.log(err)
        }
        
    }
  return (
    <>
      <div>
        <div className="w-full p-6 bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
          <h1 className="text-3xl font-bold text-center">SignUp</h1>
          <form onSubmit={onSubmitHandle}>
            <label className="label p-2 "htmlFor="Fullname">
              <span className="text"> Fullname:</span>
            </label>
            <input
            value={user.fullname}
            onChange={(e)=>{setUser({...user,fullname:e.target.value})}}
              id="Fullname"
              className="h-full input input-bordered h-10"
              type="text"
              placeholder="krishna"
            ></input>

            <label className="label p-2"htmlFor="Username">
              <span className="text"> Username:</span>
            </label>
            <input
            value={user.username}
            onChange={(e)=>{setUser({...user,username:e.target.value})}}
              id="Username"
              className="h-full input input-bordered h-10"
              type="text"
              placeholder="@krishna"
            ></input>

            <label className="label p-2"htmlFor="password">
              <span className="text"> Password:</span>
            </label>
            <input
            value={user.password}
            onChange={(e)=>{setUser({...user,password:e.target.value})}}
              id="password"
              className="h-full input input-bordered h-10"
              type="password"
              placeholder="######"
            ></input>

            <label className="label p-2"htmlFor="cpassword">
              <span className="text"> Confirm Password:</span>
            </label>
            <input
            value={user.confirmpassword}
            onChange={(e)=>{setUser({...user,confirmpassword:e.target.value})}}
              id="cpassword"
              className="h-full input input-bordered h-10"
              type="password"
              placeholder="######"
            ></input>
            <div className="flex items-center my-4">
              <div className="flex items-center">
                <p>Male:</p>
                <input
                checked={user.gender==="male"}
                onChange={()=>handlecheckbox("male")}
                  type="checkbox"
                  
                  className="checkbox mx-2"
                ></input>
              </div>

              <div className="flex items-center">
                <p>Female:</p>
                <input
                checked={user.gender==="female"}
                onChange={()=>handlecheckbox("female")}
                  type="checkbox"
                
                  className="checkbox mx-2"
                ></input>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-center">
                Alredy have an account?<Link to="/Login">Login</Link>
              </p>
            </div>

            <div>
              <button type="submit" className="btn btn-block btn-sm mt-2 border border-slate-700">
                SignUp
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
