import React, { useEffect, useState } from 'react';
import FormInput from '../../FormInput';
import { AuthButton } from '../../button';
import useForm from '../../../../hooks/useForm';
import { Modal } from 'antd';
import SuccessModal from '../SuccessModal';
import { useDispatch } from 'react-redux';
import { createStaff, getAllStaffs } from '../../../../store/actions';
import { toast } from 'react-toastify';

const initialState = {
  lname: '',
  fname: '',
  role: '',
  email: '',
  password: '',
  c_password: '',
};

const AddStaffModal = ({  openModal, handleOk, handleCancel }) => {
  const dispatch = useDispatch()
  const [active, setActive] = useState(false);
  const [more, setMore] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);

  const { values, handleChange, resetForm, errors } = useForm(initialState);

  const handleSubmit =async (e) => {
    e.preventDefault();
    const params={
      first_name: values.fname,
      last_name: values.lname,
      email: values.email,
      password: values.password,
    }
    try {
      const res = await dispatch(createStaff(params))
      if(res.payload.statusCode){
        handleOk();
        setSecondModalOpen(true)
        resetForm();
        dispatch(getAllStaffs())
      }else{
        toast.error(res.payload.message)
        handleCancel()
      }
    } catch (error) {
      toast.error('Something went wrong')
      resetForm();
      handleCancel()
    }
    
  };

  const validate = () => {
    setActive(!!values.instance_name);
  };

  useEffect(() => {
    validate();
  }, [values]); 

  return (
    <>
      <SuccessModal
        title={'Staff has been added Successfully'}
        openModal={secondModalOpen}
        handleContinue={()=>setSecondModalOpen(false)}
        handleCancel={()=>setSecondModalOpen(false)}
        handleOk={()=>setSecondModalOpen(false)}
      />
      <Modal
        className="basic-modal"
        title={'Add Staff'}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className='mt-6 space-y-6' onSubmit={handleSubmit}>
          <FormInput
            label="First Name"
            type="text"
            name="fname"
            value={values.fname}
            onChange={handleChange}
            placeholder="Enter First Name"
            error={errors?.fname}
  
          />
          <FormInput
            label="Last Name"
            type="text"
            name="lname"
            value={values.lname}
            onChange={handleChange}
            placeholder="Enter Last name"
            error={errors?.lname}
  
          />
          <FormInput
            label="Email Address"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter email"
            error={errors?.email}
  
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter email"
            error={errors?.password}
  
          />
          <FormInput
            label="Confirm Password"
            type="password"
            name="c_password"
            value={values.c_password}
            onChange={handleChange}
            placeholder="Enter email"
            error={errors?.c_password}
  
          />

          <AuthButton inactive={Object.keys(errors).length !== 0 && true }  value="Add Staff" />
        </form>
      </Modal>    
    </>

  );
};

export default AddStaffModal;
