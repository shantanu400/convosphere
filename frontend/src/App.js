import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import SignUp from './comonents/SignUp';
import HomePage from './comonents/HomePage';
import Login from './comonents/Login';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { setSocket } from './redux/socketSlice';
import { setOnlineUser } from './redux/userSlice';


const router=createBrowserRouter([
  {path:"/",element:<HomePage/>},
  {path:"/register", element:<SignUp/>},
  {path:"/login", element:<Login/>}
])

function App() {
  const {authUser}=useSelector(store=>store.user);
  const {socket}=useSelector(store=>store.socket);
  
  const dispatch=useDispatch();
  

  useEffect(()=>{
    if(authUser){
    const socketio=io('http://localhost:8000',{
      query:{
        userId:authUser._id,
      }

    });
   dispatch(setSocket(socketio));

   socketio.on('getOnlineUsers',(onlineUser)=>{
    dispatch(setOnlineUser(onlineUser));
   })
    return ()=>socketio.close();
  }
  else{
    if(socket){
      socket.close();
      dispatch(setSocket(null));
    }
  }
  
    },[authUser]);

  return (
   <div className='p-4 h-screen flex items-center justify-center'>
    <RouterProvider router={router}/>
   </div>
  );
}

export default App;
