import React, { useState } from 'react'
import { AuthButton } from '../../../components/shared/button'
import { Link, useNavigate } from 'react-router-dom'
import { AuxAuthText, BlackText, GrayText } from '../../../components/shared/typograph'
import { Api } from '../../../utils/data'
import SuccessModal from '../../../components/shared/Modals/SuccessModal'
import { Copy } from 'iconsax-react'

const ApiDoc = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  return (
    <>
      <SuccessModal
        openModal={open}
        handleCancel={()=>setOpen(false)}
        handleOk={()=>setOpen(false)}
        handleContinue={()=>{
          setOpen(false)
          navigate('/dashboard/api-docs')
        }}

      >
        <BlackText style={'font-bold text-[20px]'} text={'Reset Successfully'}/>
        <GrayText style={'text-center'} text={'You have successfully reset apikey for member with username mywhatsapp.'}/>
      </SuccessModal>


    <div className='space-y-8'>
      <div className='md:px-[4rem]'>
        <div className='rounded-md border border-[red] p-1'>
            <p  className='text-[red] text-[12px] text-center'>API keys give direct access to your account, so be sure to protect them. Never share your keys with anyone, and store them only in secure places, connecting your keys to 3rd-party websites could compromise your account security.</p>
        </div>
      </div>
      <div className='border-b'>
        <p>Base URL <Link to={'/login'}> <AuxAuthText text={'https://api.msgme.ng'}/></Link></p>
      </div>

      <div>
        <span className='font-mont font-semibold'>API Key</span>
        <div className='w-full flex items-center border rounded-md h-[50px] pl-4 mb-6'>
            <input disabled placeholder='HMnaF3vNonzCKMrHbE2kUyjRURWGp8Wc4srTzNPjGkYFXv3JFtxcl2F8TZ77uYdjkZGyskHw48ckoaYAApSZdjdjahdrhteiehrihfh' className='outline-none font-mont w-[90%] h-full' type="text"  value={''}  />
            <button style={{backgroundColor:'rgba(120, 74, 248, 0.2)'}} className='flex justify-center items-center text-[#784AF8] w-[10%] h-full font-semibold font-mont'><span className='hidden lg:block'>Copy</span> <Copy/></button>
        </div> 
        <AuthButton handleClick={()=>setOpen(true)} value={'Reset API Key'}/>
      </div>
      <div>
        {
            Api.map((i, id)=><APIFormat body={i.body} response={i.response} title={i.title}/>)
        }
      </div>
    </div>    
    </>

  )
}

export default ApiDoc


const APIFormat = ({body, response, title})=>{
    return(
        <div className='font-mont'>
            <div className='border-b'>
                <p>{title} <Link to={'/login'}> <AuxAuthText text={'https://api.msgme.ng'}/></Link></p>
            </div>
            <div>

            </div>
                <div>
                    <p>Body</p>
                    <div>
                        <p className='bg-[#F5F5F5] text-[#6F6F6F] p-3  text-[14px]'>{body}</p>
                        
                    </div>
                </div>
                <div>
                    <p>Response</p>
                    <div>
                        <p className='bg-[#F5F5F5] text-[#6F6F6F] p-3  text-[14px]'>{response}</p>
                        
                    </div>
                </div>
        </div>
    )
}