import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import SuccessModal from '../SuccessModal';
import useForm from '../../../../hooks/useForm';
import FormInput from '../../FormInput';
import { toast } from 'react-toastify';
import { getMyRecord } from '../../../../store/actions';

const PreviewElectricityOrderModal = ({billId, children, title, openModal, handleOk, handleCancel, provider,acctNo,email,amount, imgUrl }) => {
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

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const res = await dispatch(approveBill(billId));
      console.log(res)
      if (res.payload.statusCode){
        dispatch(getMyRecord('today'))
        handleProceed();
      }else{
        toast.error(res.payload.message)
        handleCancel()
      }
    } catch (error) {
      toast.error('Something went wrong')
      handleCancel()
    }
    resetForm();
  };

  const handleReject = async(e) => {
    e.preventDefault();
    const params = {
      billId,
      paylaod:{
        rejectionReason:values.desc
      }
      
    }

    try {
      const res = await dispatch(rejectdPaymentBill(params));
      console.log(res)
      if (res.payload.statusCode){
        toast.success(res.paylaod.message)
        dispatch(getMyRecord('today'))
        handleReturn();
      }else{
        toast.error(res.payload.message)
        handleCancel()
      }
    } catch (error) {
      toast.error('Something went wrong')
      handleCancel()
    }

    console.log('Form submitted:', values);
    // setOpenedFailed(false);
    handleCancel?.(); 
    resetForm();
  };


  return (
    <>
           <SuccessModal
        title={`Electricity Transaction performed successfully`}
        openModal={secondModalOpen}
        handleContinue={() => {setSecondModalOpen(false); handleOk?.();}}
        handleCancel={() => {setSecondModalOpen(false); handleOk?.();}}
        handleOk={() => {setSecondModalOpen(false); handleOk?.();}}
      />
            <Modal
        className="basic-modal"
        title="Electricity Order Failed"
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
              onClick={handleReject}
              className="bg-[#219653] rounded-[8px] text-white py-[10px] px-11 text-[14px] md:text-[16px] font-[500] leading-[24px]"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>


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
            <button onClick={handleProceed} className='bg-[#219653] rounded-[8px] text-white py-[10px] px-11 text-[14px] md:text-[16px] font-[500] leading-[24px]'>Completed</button>
            <button onClick={handleReturn} className='bg-[red] rounded-[8px] text-white py-[10px] px-11 text-[14px] md:text-[16px] font-[500] leading-[24px]'>Failed</button>
          </div>          
        </div>

      </Modal>
    </>
  );
};
export default PreviewElectricityOrderModal;