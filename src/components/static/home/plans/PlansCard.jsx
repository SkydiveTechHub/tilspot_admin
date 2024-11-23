import React from 'react'
import { BlackText, GrayText } from '../../../shared/typograph'

export const PlansCard1 = ({planName, planAmount, planFeatures, tagged, handleClick}) => {
  return (
    <div className={`space-y-6 ${!tagged? 'bg-white':'bg-gradient-to-r to-purple-500 from-blue-300'} relative shadow-md p-6 rounded-lg `}>
      {
        tagged &&
        <div className='bg-white p-1 absolute top-0 right-3 px-3 rounded-b-lg'><span className='font-mont text-[12px] text-transparent bg-clip-text bg-gradient-to-r font-bold to-purple-500 from-blue-300'>Most Popular</span></div>
      }
      
        <div>
          <span className='text-white py-1 text-[12px] px-2 rounded-full bg-[#FE9F73] font-mont text-[10px]'>{planName}</span>            
        </div>

      <BlackText style={`font-[700] text-[26px] font-mont ${tagged && 'text-white'}`} text={`#${planAmount}`}/>
        <ul className='space-y-2'>
            {
                planFeatures.map((i, id)=> <li className={`font-mont text-[14px] lg:text-[9px] ${tagged && 'text-white'}`} key={id}><img className='inline-flex pr-3' src={'/images/tick-mark.png'} alt="" />{i}</li>)
            }
        </ul>

        <div onClick={handleClick} className={ `font-mont p-[1px] rounded-md bg-gradient-to-r to-purple-500 from-blue-300 bg-[#4F4F4F]`}>
          <button className='rounded-md w-full h-full p-2 bg-white flex justify-center items-center'>
            <div className='flex gap-3 items-center justify-center'>
              <GrayText style="font-mont text-[16px] lg:text-[12px] font-[400] text-transparent bg-clip-text bg-gradient-to-r to-purple-500 from-blue-300 font-[600] text-center" text={`Start ${planName}`}/>
            </div>
          </button>
        </div> 

    </div>
  )
}

export const PlansCard2 = ({planName, planAmount, planFeatures, tagged, isSelected, handleClick}) => {
  return (
    <div onClick={handleClick} className={`space-y-6 bg white shadow-md p-6 rounded-lg min-w-[280px] `}>
        <div>
          <span className='text-white text-[12px] md:text-[10px] py-1 px-2 rounded-full bg-[#FE9F73]'>{planName}</span>            
        </div>

        <div className='w-full flex items-center  justify-between'>
          <BlackText style={'font-[700] text-[24px]'} text={`#${planAmount}`}/>
          <img src={isSelected? '/images/circle-check-filled.png':'/images/circle-check-outline.png'} alt="" />
        </div>

      
        <ul className='space-y-2'>
            {
                planFeatures.map((i, id)=> <li className='font-mont text-[12px] lg:text-[8px]' key={id}><img className='inline-flex pr-3' src={'/images/tick-mark.png'} alt="" />{i}</li>)
            }
        </ul>

    </div>
  )
}
