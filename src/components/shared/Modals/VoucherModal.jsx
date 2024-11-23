
import React, { useState } from 'react'
import FormInput from '../FormInput';
import { AuthButton } from '../button';
import { Modal } from 'antd';
import useForm from '../../../hooks/useForm';
import SuccessModal from './SuccessModal';
import { BlackText, GrayText } from '../typograph';

const initialState = {
  code: ''
}

const VoucherModal = ({ openModal, handleOk, handleCancel }) => {

  const {values, handleChange, resetForm, errors} = useForm(initialState)
  const [secondModalOpen, setSecondModalOpen] = useState(false);

  const [disable, setDisable] = useState(false);

  const handleSubmit = (e) =>{
      e.preventDefault()
      setDisable(true)
  }

  return (
    <>
      <SuccessModal
        openModal={secondModalOpen}
        handleCancel={()=>setSecondModalOpen(false)}
        handleOk={()=>setSecondModalOpen(false)}
        handleContinue={()=>setSecondModalOpen(false)}
      >
        <div className='flex justify-center items-center flex-col'>
          <BlackText
              style="font-[700] text-center"
              text="Voucher Redeemed Successfully"
            />
            <p className={`font-mont text-[#475569] text-center`}> You account has been successfully funded with added  
                    <GrayText style={' text-center font-bold inline'} text={` NGN 20,000.`}/>
                  </p> 
    
                   
        </div>

      </SuccessModal>

      <Modal className='basic-modal' title={'Voucher'} open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <div  className='flex justify-center items-center flex-col gap-6 md:px-[2rem]'>
          <img src="/images/vouch.png" alt="good-luck" />
          
          <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-full space-y-8 font-mont'>
            <div className='w-full'>
              <FormInput
                  label={'Voucher Code'}
                  type={'text'}
                  name={'code'} 
                  value={values.code}
                  onChange={handleChange}
                  placeholder={'e.g sdladj'}
                  error={errors?.code}
              />      
              <small className='font-mont text-[10px] text-[#EB5757] '>Please note that once this voucher is redeemed, it cannot be used again.</small>      
            </div>


            <AuthButton handleClick={()=>{
              setSecondModalOpen(true)
              handleCancel()
              }} inactive={!values.code || disable} value={'Continue Transaction'}/>

        </form>

        </div>
      </Modal>
    </>
  )
}

export default VoucherModal
