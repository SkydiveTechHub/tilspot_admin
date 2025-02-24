import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const ErrorModal = ({children, title, openModal, handleOk, handleCancel, handleContinue }) => {

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}

      <Modal className='basic-modal' title={title} open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <div  className='flex justify-center items-center flex-col gap-6 px-[2rem]'>
          {/* <img src="/images/Good Luck.png" alt="good-luck" /> */}
          {children}
          {/* <button className="font-mont btn-primary text-primary underline" onClick={() => {
            handleContinue()
            handleCancel()
            }}>
            Continue
          </button> */}
        </div>
      </Modal>
    </>
  );
};
export default ErrorModal;