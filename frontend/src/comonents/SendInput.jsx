import axios from 'axios';
import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../redux/messageSlice';
const SendInput = () => {
  const [messagenew,setMessagenew]=useState("");
    const dispatch=useDispatch();
    const {selectedUser}=useSelector(store=>store.user);
    const {message}=useSelector(store=>store.message)
    const handleSubmit=async (e)=>{
      e.preventDefault();
      try{
        const res=await axios.post(`http://localhost:8000/api/v1/message/send/${selectedUser?._id}`,{messagenew},{
          headers:{
            'Content-type':'application/json'
          },
          withCredentials:true
        })
        
        res.then(response => {
          dispatch(setMessage([...message, response?.data?.newMessage]));
        });
       
      }
      catch(err){
        console.log("error on sending msg",err);
      }
    setMessagenew("");

    }
  return (
    <form onSubmit={handleSubmit} className='px-4 my-3'>
    <div className='w-full relative'>
        <input onChange={(e)=>setMessagenew(e.target.value)} value={messagenew} type='text' placeholder='send a messages...' className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'/>
    
        <button type='submit' className='absolute right-0 top-0 mt-4 mr-2'>
        <IoSend/>
    
    </button>
    </div>

   </form>
  )
}

export default SendInput