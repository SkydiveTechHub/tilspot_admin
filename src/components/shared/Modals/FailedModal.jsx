import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const SuccessModal = ({ title, openModal, handleOk, handleCancel, handleSubmit }) => {

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}

<Modal
        className="basic-modal"
        title={`${title} Order Failed`}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex items-center justify-center gap-6 md:px-[2rem] flex-col w-full">
          <FormInput
            label="Reason"
            type="textarea"
            name="desc"
            value={values.desc}
            onChange={handleChange}
            placeholder="Describe why the transaction failed"
            error={errors?.desc}
          />

          <div className="flex items-center justify-center w-full">
            <button
              onClick={handleSubmit}
              className="bg-[#219653] rounded-[8px] text-white py-[10px] px-11 text-[14px] md:text-[16px] font-[500] leading-[24px]"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default SuccessModal;