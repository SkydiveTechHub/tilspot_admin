import React, { useEffect, useState } from 'react'
import { BlackText, GrayText } from '../../../components/shared/typograph'
import { PryButton } from '../../../components/shared/button'
import InstanceView from './InstanceView'
import AddGovernmentProvider from '../../../components/shared/Modals/government/AddGovernmentProvider'
import AddStaffModal from '../../../components/shared/Modals/staff/AddStaffModal'
import { useDispatch, useSelector } from 'react-redux'
import { getAllStaffs } from '../../../store/actions'

const StaffPage = () => {
  const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [hasData, setHasData] = useState(false)
    const {staffs} = useSelector((state)=>state.staff)

    useEffect(()=>{
      if (!staffs){
        dispatch(getAllStaffs())
      }else{
        setHasData(true)
      }
    },[staffs])


  return (
    <>
            <AddStaffModal
                openModal={open}
                handleCancel={()=>setOpen(false)}
                handleOk={()=>setOpen(false)}
            />   
        {
          hasData?
          <InstanceView  data={staffs}/>
          :
          <div className='h-screen'>


              <div className='w-full h-[80%] flex justify-center items-center flex-col gap-4'>
      
                  <img src="/images/layers.png" alt="" />
                  <BlackText style={'font-[600]'} text='No Operator Available'/>
                  <GrayText style={'md:w-[40%] text-center text-[12px]'} text={'You haven’t added any operator. Click the button below to add a operator!'}/>
      
                  <PryButton handleClick={()=>setOpen(true)} text={'Add Operator'}/>
      
              
      
              </div>        
          </div>
        } 
    </>


  )
}

export default StaffPage
