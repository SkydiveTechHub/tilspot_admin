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
  instance_name: '',
  type: '',
};

const AddParkingLocation = ({ title, openModal, handleOk, handleCancel }) => {
  const [active, setActive] = useState(false);
  const [more, setMore] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [planList, setPlanList] = useState([{ name: "", price: ""}]);

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


  const IncreasePlanCount = () => {
    setPlanList([...planList, { name: "", price: ""}]);
};

const DecreasePlanCount = (index) => {
        setPlanList((prevItems) => prevItems.filter((_, i) => i !== index));

};

  return (
    <>
      <SuccessModal
        title={'Parking Location has been added Successfully'}
        openModal={secondModalOpen}
        handleContinue={()=>setSecondModalOpen(false)}
        handleCancel={()=>setSecondModalOpen(false)}
        handleOk={()=>setSecondModalOpen(false)}
      />
      <Modal
        className="basic-modal"
        title={'Add Parking Location'}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className='mt-6 space-y-6' onSubmit={handleSubmit}>
          <FormInput
            label="Location Name"
            type="text"
            name="instance_name"
            value={values.instance_name}
            onChange={handleChange}
            placeholder="Enter Location name"
            error={errors?.instance_name}
  
          />


          <AuthButton handleClick={()=>{
            setSecondModalOpen(true)
            handleCancel()
            }} inactive={!active} value="Add Location" />
        </form>
      </Modal>    
    </>

  );
};

export default AddParkingLocation;
