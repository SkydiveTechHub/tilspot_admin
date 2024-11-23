import React, { useState } from 'react'
import { BlackText, GrayText } from '../../../components/shared/typograph'
import { PryButton } from '../../../components/shared/button'
import InstanceView from './InstanceView'
import AddCableProvider from '../../../components/shared/Modals/cable/AddCableProvider'

const CablePage = () => {
    const [open, setOpen] = useState(false)
    const [hasData, setHasData] = useState(true)

  return (
    <>
            <AddCableProvider
                openModal={open}
                handleCancel={()=>setOpen(false)}
                handleOk={()=>setOpen(false)}
            />   
        {
          hasData?
          <InstanceView/>
          :
          <div className='h-screen'>


              <div className='w-full h-[80%] flex justify-center items-center flex-col gap-4'>
      
                  <img src="/images/layers.png" alt="" />
                  <BlackText style={'font-[600]'} text='No Provider Available'/>
                  <GrayText style={'md:w-[40%] text-center text-[12px]'} text={'You haven’t added any Provider. Click the button below to start connectivity through whatsapp'}/>
      
                  <PryButton handleClick={()=>setOpen(true)} text={'Add Cable Provider'}/>
      
              
      
              </div>        
          </div>
        } 
    </>


  )
}

export default CablePage
