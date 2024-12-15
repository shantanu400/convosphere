
import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import SignUp from './comonents/SignUp';
import HomePage from './comonents/HomePage';
import Login from './comonents/Login';


const router=createBrowserRouter([
  {path:"/",element:<HomePage/>},
  {path:"/register", element:<SignUp/>},
  {path:"/login", element:<Login/>}
])

function App() {
  return (
   <div className='p-4 h-screen flex items-center justify-center'>
    <RouterProvider router={router}/>
   </div>
  );
}

export default App;
