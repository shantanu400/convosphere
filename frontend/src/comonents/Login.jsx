import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const onSubmitHandle =async (e) => {
    e.preventDefault();
    try{
      const res= await axios.post('http://localhost:8000/api/v1/user/login',user,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      })
      if(res){
      navigate('/');
      dispatch(setAuthUser(res.data));
      }
    }
    
    catch(err){
      toast.error(err.response.data.message)
      console.log(err);
    }
    
  };
  return (
    <>
      <div className="">
        <div className="w-full p-6 bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
          <h1 className="text-3xl font-bold text-center">Login</h1>
          <form onSubmit={onSubmitHandle}>
            <label className="label p-2" htmlFor="Username">
              <span className="text"> Username:</span>
            </label>
            <input
              value={user.username}
              onChange={(e)=>setUser({ ...user, username: e.target.value })}
              id="Username"
              className="h-full input input-bordered h-10"
              type="text"
              placeholder="@krishna"
            ></input>

            <label className="label p-2" htmlFor="password">
              <span className="text"> Password:</span>
            </label>
            <input
              id="password"
              value={user.password}
              onChange={(e)=>setUser({ ...user, password:e.target.value })}
              className="h-full input input-bordered h-10"
              type="password"
              placeholder="######"
            ></input>

            <div className="flex items-center">
              <p className="text-center my-2">
                Don't have an account?<Link to="/register">SignUp</Link>
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-block btn-sm mt-2 border border-slate-700"
              >
                Login_here
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
