import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import SuccessModal from '../SuccessModal';
import FormInput from '../../FormInput';
import useForm from '../../../../hooks/useForm';

const PreviewParkingOrderModal = ({billId, title, openModal, handleOk, handleCancel, provider, zone, location, price, duration, phone, imgUrl, reg }) => {
  const [secondModalOpen, setSecondModalOpen] = useState(false)
  const [openFailed, setOpenedFailed] = useState(false)

  const initialState = {
    desc: '',
  };

  const { values, handleChange, resetForm, errors } = useForm(initialState);

  const handleProceed = () => {
    setSecondModalOpen(true);
  };

  const handleReturn = () => {
    setOpenedFailed(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form submitted:', values);
    setOpenedFailed(false);
    handleCancel?.(); 
    resetForm();
  };
  return (
    <>
      <SuccessModal
        title={`Parking Transaction performed successfully`}
        openModal={secondModalOpen}
        handleContinue={() => {setSecondModalOpen(false); handleOk?.();}}
        handleCancel={() => {setSecondModalOpen(false); handleOk?.();}}
        handleOk={() => {setSecondModalOpen(false); handleOk?.();}}
      />

      <Modal
        className="basic-modal"
        title="Parking Order Failed"
        open={openFailed}
        onOk={() => setOpenedFailed(false)}
        onCancel={() => setOpenedFailed(false)}
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

      <Modal className='basic-modal' title={'Parking Order'} open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <div  className='flex items-center justify-center gap-6 md:px-[2rem] flex-col w-full '>
          {imgUrl && <img src="" alt="" />}
          
          <div className='w-full grid grid-cols-2 gap-3'>
            <span className='text-[14px]'>Provider:</span>
            <span className='font-bold text-[16px]'>{provider}</span>
            <span className='text-[14px]'>Location:</span>
            <span className='font-bold text-[16px]'>{location}</span>
            <span className='text-[14px]'>Zone:</span>
            <span className='font-bold text-[16px]'>{zone}</span>
            <span className='text-[14px]'>Duration:</span>
            <span className='font-bold text-[16px]'>{duration}</span>
            <span className='text-[14px]'>Price:</span>
            <span className='font-bold text-[16px]'>{price}</span>
            <span className='text-[14px]'>Reg Number:</span>
            <span className='font-bold text-[16px]'>{reg}</span>
            <span className='text-[14px]'>Phone Number:</span>
            <span className='font-bold text-[16px]'>{phone}</span>
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
export default PreviewParkingOrderModal;