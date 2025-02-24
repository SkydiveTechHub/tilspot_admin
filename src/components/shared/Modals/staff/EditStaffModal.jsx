import React, { useEffect, useState } from 'react';
import FormInput from '../../FormInput';
import { AuthButton } from '../../button';
import useForm from '../../../../hooks/useForm';
import { Modal } from 'antd';
import ConfirmModal from '../ConfirmModal';
import { GrayText } from '../../typograph';
import SuccessModal from '../SuccessModal';
import { editStaff, getAllStaffs } from '../../../../store/actions';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
// import SelectPlanModal from '../SelectPlanModal';



const EditStaffModal = ({ type, openModal, handleOk, handleCancel }) => {
  const dispatch = useDispatch()
  const [active, setActive] = useState(false);
  const [more, setMore] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const {user} = useSelector((state)=>state.auth)
  console.log(user)
  const initialState = {
    lname: user?.last_name || "",
    fname: user?.first_name || "",
  };

  const { values, handleChange, resetForm, errors } = useForm(initialState);

  useEffect(() => {
    resetForm(initialState); // Reset form when userData changes
  }, [user]);


  const handleSubmit =async (e) => {
    e.preventDefault();
    const params={
      first_name: values.fname,
      last_name: values.lname,
    }
    try {
      const res = await dispatch(editStaff(params))
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
    setActive(errors.first_name !== '');
  };

  useEffect(() => {
    validate();
  }, [values]); // Re-run validation when `values` change

  return (
    <>
      <SuccessModal
        title={'Profile has been updated Successfully'}
        openModal={secondModalOpen}
        handleContinue={()=>setSecondModalOpen(false)}
        handleCancel={()=>setSecondModalOpen(false)}
        handleOk={()=>setSecondModalOpen(false)}
      />
      <Modal
        className="basic-modal"
        title={'Edit Staff'}
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
          {/* <FormInput
            label="Email Address"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter email"
            error={errors?.email}
  
          /> */}

          {/* <FormInput
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
  
          /> */}

          <AuthButton inactive={!active} value="Edit Staff" />
        </form>
      </Modal>    
    </>

  );
};

export default EditStaffModal;
