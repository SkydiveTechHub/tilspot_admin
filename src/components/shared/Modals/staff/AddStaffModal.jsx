import React, { useEffect, useState } from 'react';
import FormInput from '../../FormInput';
import { AuthButton } from '../../button';
import useForm from '../../../../hooks/useForm';
import { Modal } from 'antd';
import ConfirmModal from '../ConfirmModal';
import { GrayText } from '../../typograph';
import SuccessModal from '../SuccessModal';
// import SelectPlanModal from '../SelectPlanModal';

const initialState = {
  lname: '',
  fname: '',
  role: '',
  email: '',
  password: '',
  c_password: '',
};

const AddStaffModal = ({  openModal, handleOk, handleCancel }) => {
  const [active, setActive] = useState(false);
  const [more, setMore] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);

  const { values, handleChange, resetForm, errors } = useForm(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', values);
    handleOk(); // Optional: close modal on submit
    resetForm();
  };

  const validate = () => {
    setActive(!!values.instance_name);
  };

  useEffect(() => {
    validate();
  }, [values]); // Re-run validation when `values` change

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
            label="Role"
            type="select"
            name="type"
            value={values.role}
            onChange={handleChange}
            placeholder="Select Type"
            options={[
                {
                  name: 'Admin',
                  value:'admin'    },
                {
                  name: 'Operator',
                  value:'operator'    },
            ]}
            error={errors?.type}
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
            name="c_pasword"
            value={values.c_pasword}
            onChange={handleChange}
            placeholder="Enter email"
            error={errors?.c_pasword}
  
          />

          <AuthButton handleClick={()=>{
            setSecondModalOpen(true)
            handleCancel()
            }} inactive={!active} value="Add Staff" />
        </form>
      </Modal>    
    </>

  );
};

export default AddStaffModal;
