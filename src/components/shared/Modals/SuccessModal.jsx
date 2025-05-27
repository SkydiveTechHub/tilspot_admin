import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { PryButton } from '../button';

const SuccessModal = ({children, title, openModal, handleOk, handleCancel, handleContinue }) => {

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}

      <Modal className='basic-modal' title={title} open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <div  className='flex justify-center items-center flex-col gap-6 px-[2rem]'>
          <img src="/images/Good Luck.png" alt="good-luck" />
          {children}
          <PryButton className="font-mont btn-primary text-white" text={'Continue'} handleClick={() => {
            handleContinue()
            handleCancel()
            }}/>
        </div>
      </Modal>
    </>
  );
};
export default SuccessModal;