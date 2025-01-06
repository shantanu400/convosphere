import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux';

const OtherUsers = () => {
  useGetOtherUsers();

  const {otherUsers,searchedUser}=useSelector(store=>store.user)
  if(!otherUsers && !searchedUser){
    return
  }

  
  return (
    <div className='overflow-auto flex-1'>
      

      { searchedUser && searchedUser !=""  && searchedUser!=[] ? 
      
          <OtherUser key={searchedUser[0]._id} user={searchedUser[0]}/>
        :
        otherUsers?.map((user)=>{
          return (
            <OtherUser key={user._id} user={user}/>
          )
        })

      }
      
     
    </div>
  )
}

export default OtherUsers