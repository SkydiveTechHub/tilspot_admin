import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const ConfirmModal = ({children, title, openModal, handleOk, handleCancel, handleProceed, handleReturn, proceedText, returnText, imgUrl }) => {

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}

      <Modal className='basic-modal' title={title} open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <div  className='flex items-center justify-center gap-6 md:px-[2rem] flex-col w-full '>
          {imgUrl && <img src="" alt="" />}
          
          {children}

          <div className='flex items-center justify-between w-full'>
            <button onClick={handleProceed} className='bg-[#219653] rounded-[8px] text-white py-[10px] px-11 text-[14px] md:text-[16px] font-[500] leading-[24px]'>{proceedText}</button>
            <button onClick={handleReturn} className='bg-[#F2C94C] rounded-[8px] text-white py-[10px] px-11 text-[14px] md:text-[16px] font-[500] leading-[24px]'>{returnText}</button>
          </div>          
        </div>

      </Modal>
    </>
  );
};
export default ConfirmModal;