import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
const HomePage = () => {
  return (
    <div className='flex justify-center p-6 sm:h-[450px] md:h-[540px] rounded-lg overflow-hidden  bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100 '>
<Sidebar/>
<MessageContainer/>

    </div>
    
  
  )
}
export default HomePage