import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setMessage } from "../redux/messageSlice"

const useGetRealTimeMessage = () => {

    const dispatch=useDispatch();
    const {socket}=useSelector(store=>store.socket);
    const {message}=useSelector(store=>store.message);

 
    useEffect(() => {
    socket?.on('newMessage',(newMessage)=>{
      dispatch(setMessage([...message,newMessage]))
    })
    }, [socket,setMessage,message])
    
    
   
   
  
}

export default useGetRealTimeMessage