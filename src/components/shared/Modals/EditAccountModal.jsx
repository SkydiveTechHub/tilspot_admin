import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import FormInput from '../FormInput';
import useForm from '../../../hooks/useForm';
import { BlackText } from '../typograph';

const initialState = {
  firstName:'',
  lastName:'',
  email: '',
  phone: '',
  address:""
}


const PersonalInfoModal = ({children, title, openModal, handleOk, handleCancel }) => {
  const {values, handleChange, resetForm, errors} = useForm(initialState)

  const  handleSubmit = (e)=>{
    e.preventDefault()
  }
  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}

      <Modal className='basic-modal basic-modal-medium' title={title} open={openModal} onOk={handleOk} onCancel={handleCancel}>
        ``<div className='w-full flex justify-between items-center  my-8 '>
                    <BlackText style={'font-bold'} text={'Edit Profile'}/>

                    <button onClick={handleSubmit} className='rounded-md px-6 py-2 bg-transparent border font-mont border-primary text-primary font-semibold flex '>
                        Save Changes
                    </button>
                    
                </div>
              <form className="space-y-6">
                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <FormInput
                        label={'First name'}
                        type={'text'}
                        name={'firstName'} 
                        value={values.firstName}
                        onChange={handleChange}
                        placeholder={'John'}
                        error={errors?.firstName}
                    />                
                    <FormInput
                        label={'Last name'}
                        type={'text'}
                        name={'lastName'} 
                        value={values.lastName}
                        onChange={handleChange}
                        placeholder={'Doe'}
                        error={errors?.lastName}
                    />
                    <FormInput
                            label={'Email'}
                            type={'email'}
                            name={'email'} 
                            value={values.email}
                            onChange={handleChange}
                            placeholder={'Enter your username'}
                            error={errors?.email}
                    />            
                    <FormInput
                            label={'Phone'}
                            type={'phone'}
                            name={'phone'} 
                            value={values.email}
                            onChange={handleChange}
                            placeholder={'Enter your username'}
                            error={errors?.email}
                    />            
                </div>

                    <FormInput
                            label={'Address'}
                            type={'textarea'}
                            name={'address'} 
                            value={values.address}
                            onChange={handleChange}
                            placeholder={'Enter your address'}
                            error={errors?.address}
                    /> 

              </form>

      </Modal>
    </>
  );
};
export default PersonalInfoModal;