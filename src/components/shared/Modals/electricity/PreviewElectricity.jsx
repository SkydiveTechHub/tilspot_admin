import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import SuccessModal from '../SuccessModal';

const PreviewElectricityOrderModal = ({children, title, openModal, handleOk, handleCancel, handleProceed, handleReturn, provider,acctNo,email,amount, imgUrl }) => {
  const [secondModalOpen, setSecondModalOpen] = useState(false)
  const [openFailed, setOpenedFailed] = useState(false)
  return (
    <>
           <SuccessModal
        title={`Electricity Transaction performed successfully`}
        openModal={secondModalOpen}
        handleContinue={()=>setSecondModalOpen(false)}
        handleCancel={()=>setSecondModalOpen(false)}
        handleOk={()=>setSecondModalOpen(false)}
      />

      <Modal className='basic-modal' title={'Electricity Order'} open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <div  className='flex items-center justify-center gap-6 md:px-[2rem] flex-col w-full '>
          {imgUrl && <img src="" alt="" />}
          
          <div className='w-full grid grid-cols-2 gap-3'>
            <span className='text-[14px]'>Provider:</span>
            <span className='font-bold text-[16px]'>{provider}</span>
            <span className='text-[14px]'>Email Address:</span>
            <span className='font-bold text-[16px]'>{email}</span>
            <span className='text-[14px]'>{acctNo}</span>
            <span className='font-bold text-[16px]'>Amount:</span>
            <span className='text-[14px]'>Amount:</span>
            <span className='font-bold text-[16px]'>{amount}</span>
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
export default PreviewElectricityOrderModal;