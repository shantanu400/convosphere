import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOtherUsers } from '../redux/userSlice'


const useGetOtherUsers = () => {
    const dispatch=useDispatch()
    const {selectedUser}=useSelector(store=>store.user);
  return (
    useEffect(() => {
        const fetchOtherUsers=async ()=>{
            try{
                axios.defaults.withCredentials = true
                const res=await axios.get('http://localhost:8000/api/v1/user/')

                dispatch(setOtherUsers(res.data))
                
                
            }
            
            catch(err){
                console.log('error in fetching other user',err)
            }

        }
        fetchOtherUsers();
    }, [selectedUser])
  )
}

export default useGetOtherUsers