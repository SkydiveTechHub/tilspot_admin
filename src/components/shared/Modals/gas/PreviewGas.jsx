import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const PreviewGasOrderModal = ({children, title, openModal, handleOk, handleCancel, handleProceed, handleReturn, proceedText, returnText, imgUrl, provider, acctNo, amount }) => {

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}

      <Modal className='basic-modal' title={'Gas Order'} open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <div  className='flex items-center justify-center gap-6 md:px-[2rem] flex-col w-full '>
          {imgUrl && <img src="" alt="" />}
          
          <div className='w-full grid grid-cols-2 gap-3'>
            <span  className='text-[14px]'>Provider:</span>
            <span  className='font-semibold text-[16px]'>{provider}</span>
            <span  className='text-[14px]'>Account Number:</span>
            <span  className='font-semibold text-[16px]'>{acctNo}</span>
            <span  className='text-[14px]'>Amount:</span>
            <span  className='font-semibold text-[16px]'>{amount}</span>
          </div>


          <div className='flex items-center justify-between w-full'>
            <button onClick={handleProceed} className='bg-[#219653] rounded-[8px] text-white py-[10px] px-11 text-[14px] md:text-[16px] font-[500] leading-[24px]'>Completed</button>
            <button onClick={handleReturn} className='bg-[red] rounded-[8px] text-white py-[10px] px-11 text-[14px] md:text-[16px] font-[500] leading-[24px]'>Failed</button>
          </div>                
        </div>

      </Modal>
    </>
  );
};
export default PreviewGasOrderModal;