import React, { useState } from 'react'
import { BlackText, GrayText } from '../../../components/shared/typograph'
import { PryButton } from '../../../components/shared/button'
import NewInstanceModal from '../../../components/shared/Modals/NewInstanceModal'

const HelpPage = () => {
    const [open, setOpen] = useState(false)

  return (
    <div className='h-screen'>
        <div className='w-full h-[80%] flex justify-center items-center flex-col gap-4'>

            <img src="/images/help.png" alt="" />
            <BlackText style={'font-[600] text-[20px]'} text='Welcome to our help center'/>
            <GrayText style={'w-[40%] text-center text-[12px]'} text={'Need Assistance?'}/>            
            <GrayText style={'w-[80%] text-center text-[12px]'} text={`"For detailed support and FAQs, click the link below. You’ll be redirected to our Help Center, where you can find answers and contact our support team."`}/>



            <button className="font-mont btn-primary text-primary underline" onClick={() => {
            }}>
            Click here to Continue
          </button>

          

        </div>        
    </div>

  )
}



export default HelpPage
