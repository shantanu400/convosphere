import React from 'react'
import Messages from './Messages'
import SendInput from './SendInput'
import { useSelector } from 'react-redux'
import { MdOutlineVideoCall } from "react-icons/md";
import { MdOutlineAddIcCall } from "react-icons/md";

const MessageContainer = () => {
    const {selectedUser,onlineUser}=useSelector(store=>store.user)
    const authUser=useSelector(store=>store.user.authUser)
    const isOnline = onlineUser && onlineUser.includes(selectedUser?._id);
  return (
    <>
      {selectedUser !== null ? (
    <div className='md:min-w-[550px] flex flex-col'>
    <div className=' flex gap-2 items-center rounded-lg bg-green-400 px-4 py-2 mb-2 text-white'>
        <div className={`avatar ${isOnline? 'online':''}`}> 
            <div className='w-12 rounded-full'>
                <img src={selectedUser?.profilephoto}></img>
            </div>
        </div>
        <div className='flex flex-col flex-1'> 
            <div className='flex justify-between gap-2'>
                <p>{selectedUser?.fullname}</p>
                <div style={{display:'flex'}} className="gap-2">
  <button><MdOutlineVideoCall className='text-3xl'/></button>
  <button><MdOutlineAddIcCall className='text-3xl'/></button>
</div>
            </div>
        </div>
    </div>
  
    <Messages/>
    <SendInput/>
    
</div>
  )
  : (
    <div className="flex flex-col justify-center items-center h-full w-full flex-1 bg-white text-center hidden lg:flex md:min-w-[550px] ">
      
      <h1 className="text-4xl text-gray-600 font-bold text-center">
        Hi, {authUser?.fullName}
      </h1>
      <h1 className="text-2xl text-gray-600 text-center">
        Let's Start a Conversation
      </h1>
    </div>
  )}
</>
);
};

export default MessageContainer