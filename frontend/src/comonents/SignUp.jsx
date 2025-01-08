import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import convo_logo from "../convo_logo.png";
import backgroundImage from "../background.png";


const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender: "",
  });
  const handlecheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        user,
        {
          header: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.status) {
        navigate("/login");
        toast.success(res.data.message);
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {/* <div>
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
      </div> */}

      <div className="min-h-screen my-39 bg-gray-100 text-gray-900 flex justify-center w-full p-10 ">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <img src={convo_logo} className="w-mx-auto" />
            </div>
            <div className="-mt-6 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">
                  <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-0 rounded-full">
                      <svg className="w-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">Sign Up with Google</span>
                  </button>
                </div>

                <div className="my-2 border-b text-center -mt-2">
                  <div className="leading-none px-8 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign Up with Username and Password
                  </div>
                </div>

                <div className="mx-auto max-w-xs">
                  <form onSubmit={onSubmitHandle}>
                    <input
                      className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-4 md:mb-6 lg:mb-8"
                      value={user.fullname}
                      onChange={(e) => {
                        setUser({ ...user, fullname: e.target.value });
                      }}
                      id="Fullname"
                      type="text"
                      placeholder="fulllname"
                    />
                    <input
                      className="w-full -mt-80 px-8  py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                      value={user.username}
                      onChange={(e) => {
                        setUser({ ...user, username: e.target.value });
                      }}
                      id="Username"
                      type="text"
                      placeholder="username"
                    />
                    <input
                      className="w-full mt-1.5 px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      value={user.password}
                      onChange={(e) => {
                        setUser({ ...user, password: e.target.value });
                      }}
                      id="password"
                      type="password"
                      placeholder="Password"
                    />
                    <input
                      className="w-full mt-1.5 px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      value={user.confirmpassword}
                      onChange={(e) => {
                        setUser({ ...user, confirmpassword: e.target.value });
                      }}
                      id="cpassword"
                      type="password"
                      placeholder="Confirm Password"
                    />

                    <div className="flex items-center my-2">
                      <div className="flex items-center">
                        <p>Male:</p>
                        <input
                          checked={user.gender === "male"}
                          onChange={() => handlecheckbox("male")}
                          type="checkbox"
                          className="checkbox mx-2"
                        ></input>
                      </div>

                      <div className="flex items-center">
                        <p>Female:</p>
                        <input
                          checked={user.gender === "female"}
                          onChange={() => handlecheckbox("female")}
                          type="checkbox"
                          className="checkbox mx-2"
                        ></input>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-1 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-">Sign Up</span>
                    </button>
                    
                  </form>
                  <div className="flex items-center">
                    <p className="text-center my-1 mt-0">
                      Don't have an account?
                      <Link to="/Login">Login</Link>
                    </p>
                  </div>
                  <p className="mt-0 text-xs text-gray-600 text-center">
                    I agree to abide by ConvoSphere
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>
                    and its
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-green-100 text-center hidden lg:flex">
            <div
              className="m-8 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
