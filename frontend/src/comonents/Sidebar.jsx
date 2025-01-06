import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import OtherUsers from "./OtherUsers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setSearchedUser } from "../redux/userSlice";


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
        const res=await axios.get('http://localhost:8000/api/v1/user/logout')
        
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
            <form  onSubmit={searchHandler} action="" className="flex items-center gap-2 ">
                <input value={searchingUser} onChange={(e)=>setSearchingUser(e.target.value)} className="input input-bordered rounded-md" type="text" placeholder="Search..."/>

                <button type="submit" className="btn bg-zinc-400 text-white">
                <FcSearch className="w-6 h-6 outline-none" />
                </button>
                
            </form>
            <div className="divider px-3"></div>
            <OtherUsers/>
            <div>
                <button className="btn" onClick={logoutHandle}>Logout</button>
            </div>

        </div>
        
    )

}
export default Sidebar