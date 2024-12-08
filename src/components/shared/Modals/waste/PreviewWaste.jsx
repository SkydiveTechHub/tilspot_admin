import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import SuccessModal from '../SuccessModal';
import useForm from '../../../../hooks/useForm';
import FormInput from '../../FormInput';

const PreviewWasteOrderModal = ({
  title,
  openModal,
  handleOk,
  handleCancel,
  proceedText = 'Completed',
  returnText = 'Failed',
  imgUrl,
  provider,
  acctNo,
  amount,
}) => {
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [openFailed, setOpenedFailed] = useState(false);

  const initialState = {
    desc: '',
  };

  const { values, handleChange, resetForm, errors } = useForm(initialState);

  const handleProceed = () => {
    setSecondModalOpen(true);
    setTimeout(() => {
      handleOk?.();
    }, 200);
  };

  const handleReturn = () => {
    handleCancel?.(); // Call handleCancel if it's defined
    setOpenedFailed(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      console.log('Validation failed:', errors);
      return;
    }
    console.log('Form submitted:', values);
    setOpenedFailed(false);
    resetForm();
  };

  return (
    <>
      <SuccessModal
        title="Waste Transaction performed successfully"
        openModal={secondModalOpen}
        handleContinue={() => setSecondModalOpen(false)}
        handleCancel={() => setSecondModalOpen(false)}
        handleOk={() => setSecondModalOpen(false)}
      />

      <Modal
        className="basic-modal"
        title="Waste Order Failed"
        open={openFailed}
        onOk={() => setOpenedFailed(false)}
        onCancel={() => setOpenedFailed(false)}
      >
        <div className="flex items-center justify-center gap-6 md:px-[2rem] flex-col w-full">
          {imgUrl && <img src={imgUrl} alt="Failure reason" />}

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

      <Modal
        className="basic-modal"
        title="Waste Order"
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex items-center justify-center gap-6 md:px-[2rem] flex-col w-full">
          {imgUrl && <img src={imgUrl} alt="Transaction preview" />}

          <div className="w-full grid grid-cols-2 gap-3">
            <span className="text-[14px]">Provider:</span>
            <span className="font-semibold text-[16px]">{provider}</span>
            <span className="text-[14px]">Account Number:</span>
            <span className="font-semibold text-[16px]">{acctNo}</span>
            <span className="text-[14px]">Amount:</span>
            <span className="font-semibold text-[16px]">{amount}</span>
          </div>

          <div className="flex items-center justify-between w-full">
            <button
              onClick={handleProceed}
              className="bg-[#219653] rounded-[8px] text-white py-[10px] px-11 text-[14px] md:text-[16px] font-[500] leading-[24px]"
            >
              {proceedText}
            </button>
            <button
              onClick={handleReturn}
              className="bg-[red] rounded-[8px] text-white py-[10px] px-11 text-[14px] md:text-[16px] font-[500] leading-[24px]"
            >
              {returnText}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PreviewWasteOrderModal;
