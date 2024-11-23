import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const BasicModal = ({children, title, openModal, handleOk, handleCancel }) => {

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}

      <Modal className='basic-modal' title={title} open={openModal} onOk={handleOk} onCancel={handleCancel}>
        {children}
      </Modal>
    </>
  );
};
export default BasicModal;