import React from 'react'
import { CountdownTimer } from '../../../utils/tools';

const CustomMessages = () => {
    const targetDate = '2025-01-01T00:00:00'; 
  return (
    <div className='w-full h-[90vh] flex flex-col justify-center items-center space-y-20'>
      <div className='font-mont flex flex-col justify-center items-center'>
        <span className='font-[700] text-center text-[14px]'>COMING SOON</span>
        <h2 className='text-[40px] text-center text-[#5EAC24] font-[500]'>LAUNCHING SOON</h2>
      </div>
      <div className='w-[70%] border-t border-b px-10 py-[2rem] border-[gray]'>
      <CountdownTimer targetDate={targetDate} />
      </div>
    </div>
  )
}

export default CustomMessages
