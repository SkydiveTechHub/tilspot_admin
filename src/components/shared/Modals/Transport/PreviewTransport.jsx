import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import SuccessModal from '../SuccessModal';

const PreviewTransportOrderModal = ({children, title, openModal, handleOk, handleCancel, handleProceed, handleReturn, d_location, a_location, imgUrl, a_time, d_time, amount, date, ticket, f_name,l_name, email, phone }) => {
  const [secondModalOpen, setSecondModalOpen] = useState(false)
  const [openFailed, setOpenedFailed] = useState(false)
  return (
    <>
      <SuccessModal
        title={`Transport Transaction performed successfully`}
        openModal={secondModalOpen}
        handleContinue={()=>setSecondModalOpen(false)}
        handleCancel={()=>setSecondModalOpen(false)}
        handleOk={()=>setSecondModalOpen(false)}
      />

      <Modal className='basic-modal' title={'Transport Order'} open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <div  className='flex items-center justify-center gap-6 md:px-[2rem] flex-col w-full pt-6'>
          {imgUrl && <img src="" alt="" />}
          
          <div className='w-full grid grid-cols-2 gap-3'>
            <span className='text-[14px]'>Departure Location:</span>
            <span className='font-bold text-[16px]'>{d_location}</span>
            <span className='text-[14px]'>Arrival Location:</span>
            <span className='font-bold text-[16px]'>{a_location}</span>
            <span className='text-[14px]'>Date:</span>
            <span className='font-bold text-[16px]'>{date}</span>
            <span className='text-[14px]'>Time:</span>
            <span className='font-bold text-[16px]'>{d_time} - {a_time}</span>
            <span className='text-[14px]'>No of Ticket:</span>
            <span className='font-bold text-[16px]'>{ticket}</span>
            <span className='text-[14px]'>Amount:</span>
            <span className='font-bold text-[16px]'>{amount}</span>
          </div>
          <span className='py-1 w-full bg-slate-400 mt-4 rounded-md px-2'>Customer Details</span>
          <div className='w-full grid grid-cols-2 gap-3'>
            <span className='text-[14px]'>First Name:</span>
            <span className='font-bold text-[16px]'>{f_name}</span>
            <span className='text-[14px]'>Last Name:</span>
            <span className='font-bold text-[16px]'>{l_name}</span>
            <span className='text-[14px]'>Email:</span>
            <span className='font-bold text-[16px]'>{email}</span>
            <span className='text-[14px]'>Phone Number:</span>
            <span className='font-bold text-[16px]'>{phone}</span>
          </div>



          <div className='flex items-center justify-between w-full'>
            <button onClick={()=>setSecondModalOpen(true)} className='bg-[#219653] rounded-[8px] text-white py-[10px] px-11 text-[14px] md:text-[16px] font-[500] leading-[24px]'>Completed</button>
            <button onClick={()=>setOpenedFailed(true)} className='bg-[red] rounded-[8px] text-white py-[10px] px-11 text-[14px] md:text-[16px] font-[500] leading-[24px]'>Failed</button>
          </div>                
        </div>

      </Modal>
    </>
  );
};
export default PreviewTransportOrderModal;