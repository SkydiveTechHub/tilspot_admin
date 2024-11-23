import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import FormInput from '../FormInput';
import useForm from '../../../hooks/useForm';
import { BlackText } from '../typograph';
import { AuthButton } from '../button';
import { Link } from 'react-router-dom';

const initialState = {
  old_password:'',
  new_password: '',
  c_new_password: '',
}


const PasswordChangeModal = ({children, title, openModal, handleOk, handleCancel }) => {
  const {values, handleChange, resetForm, errors} = useForm(initialState)

  const  handleSubmit = (e)=>{
    e.preventDefault()
  }
  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}

      <Modal className='basic-modal' title={title} open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <div className='w-full flex justify-between items-center my-8'>
                    <BlackText style={'font-bold'} text={'Change Password'}/>
                    
                </div>
          <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center space-y-8 font-mont'>
            <FormInput
                type={'password'}
                name={'old_password'} 
                label={'Old Password'}
                value={values.password}
                onChange={handleChange}
                placeholder={'Enter Old password'}
            />
            <FormInput
                type={'password'}
                name={'new_password'} 
                label={'New Password'}
                value={values.password}
                onChange={handleChange}
                placeholder={'Enter New password'}
            />
            <FormInput
                type={'password'}
                name={'c_new_password'} 
                label={'Confirm New Password'}
                value={values.c_new_password}
                onChange={handleChange}
                placeholder={'Confirm new password'}
            />
            <AuthButton inactive={errors.old_password || errors.c_password || errors.password} value={'Change Password'}/>
            {/* <Link to={'/login'}> <AuxAuthText text={'Return to Login'}/></Link> */}

            {/* <p className='text-center'>Remember Password?<Link to={'/login'}> <AuxAuthText text={'Log in'}/></Link></p> */}

        </form>
      </Modal>
    </>
  );
};
export default PasswordChangeModal;