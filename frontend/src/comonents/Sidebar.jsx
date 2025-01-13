import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import OtherUsers from "./OtherUsers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setSearchedUser } from "../redux/userSlice";
import { RiChatNewFill } from "react-icons/ri";

const  Sidebar=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {otherUsers,searchedUser}=useSelector(store=>store.user);
   

    const [searchingUser,setSearchingUser]=useState("");
    const searchHandler = (e) => {
        e.preventDefault();
        if (searchingUser === "") {
            dispatch(setSearchedUser(null));
        } else {
            let gotUser = otherUsers?.find(user => user.fullname.toLowerCase().includes(searchingUser.toLowerCase()))
            if (gotUser) {
                dispatch(setSearchedUser([gotUser]))
            } else {
                toast.error("User Not Found")
            }
        }
    }
const logoutHandle=async ()=>{

    
    try{
        const res=await axios.get('https://humanbot-connect-app.onrender.com/api/v1/user/logout')
        
        toast.success(res.data.message)
        navigate('/login')
        dispatch(setAuthUser(null));
        

    }
    catch(err){
        console.log("having error in line 14 sidebar", err)
    }
}

    return(
        
        <div className="border-r border-slate-503 p-4 flex flex-col ">
            
          
<button class="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg bsolute -top-5 mt-1 mr-2">
ConvoSphere
</button>


                {/* <h1 className="absolute top-0 mt-1 mr-2 text-green-500 font-bold text-2xl">ConvoSphere</h1> */}
            
            <form  onSubmit={searchHandler} action="" className="flex items-center gap-2 ">

                <input value={searchingUser} onChange={(e)=>setSearchingUser(e.target.value)} className="input input-bordered rounded-md" type="text" placeholder="Search..."/>

                <button type="submit" className="btn bg-zinc-100 text-white">
                <FcSearch className="w-6 h-6 outline-none" />
                </button>
                
            </form>
            <div className="divider px-3"></div>
            <OtherUsers/>
            <div className="flex items-center ">
                <button className="btn  bg-green-400" onClick={logoutHandle}>Logout</button>
               
               <RiChatNewFill className="text-green-400 absolute left-64  text-5xl"/>
              
            </div>

        </div>
        
    )

}
export default Sidebar