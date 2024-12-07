import React, { useEffect, useState } from 'react';
import FormInput from '../../FormInput';
import { AuthButton } from '../../button';
import useForm from '../../../../hooks/useForm';
import { Modal } from 'antd';
import ConfirmModal from '../ConfirmModal';
import { GrayText } from '../../typograph';
import SuccessModal from '../SuccessModal';
import { Flex, TimePicker } from 'antd';
const { RangePicker } = TimePicker;

const AddTransportProvider = ({ action, userData, openModal, handleOk, handleCancel }) => {
  const [active, setActive] = useState(false);
  const [more, setMore] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const format = 'HH:mm';

  let initialState; 

  if (action === 'edit'){
    initialState = {
      departure: userData.departure,
      destination: userData.destination,
      amount: userData.price,
    };
  }  else{
    initialState = {
      departure: '',
      destination: '',
      amount: '',
    };
  }
const { values, handleChange, resetForm, errors } = useForm(initialState);
  useEffect(() => {
    resetForm(initialState);
  }, [userData]);



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', values);
    handleOk();
    resetForm();
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
        title={'Transport Provider has been added Successfully'}
        openModal={secondModalOpen}
        handleContinue={()=>setSecondModalOpen(false)}
        handleCancel={()=>setSecondModalOpen(false)}
        handleOk={()=>setSecondModalOpen(false)}
      />
      <Modal
        className="basic-modal"
        title={'Add Transport Provider'}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className='mt-6 space-y-6' onSubmit={handleSubmit}>
          <FormInput
            label="Departure Location"
            type="text"
            name="departure"
            value={values.departure}
            onChange={handleChange}
            placeholder="Enter provider name"
            error={errors?.departure}
  
          />

          <FormInput
            label="Destination"
            type="text"
            name="destination"
            value={values.destination}
            onChange={handleChange}
            placeholder="Enter provider name"
            error={errors?.destination}
  
          />

          <Flex vertical gap={12}>
            <Flex gap={8}>
              <RangePicker format={format} placeholder={['Departure Time', 'Arrival Time']} />
            </Flex>
          </Flex>

          <FormInput
            label="Amount"
            type="text"
            name="amount"
            value={values.amount}
            onChange={handleChange}
            placeholder="Enter provider amount"
            error={errors?.amount}
  
          />
          {/* <FormInput
            label=""
            type="select"
            name="type"
            value={values.type}
            onChange={handleChange}
            placeholder="Select Type"
            options={[
                {
                  name: 'Enabled',
                  value:'enabled'    },
                {
                  name: 'Disabled',
                  value:'disabled'    },
            ]}
            error={errors?.type}
          /> */}

          <AuthButton handleClick={()=>{
            setSecondModalOpen(true)
            handleCancel()
            }} inactive={!active} value="Add Provider" />
        </form>
      </Modal>    
    </>

  );
};

export default AddTransportProvider;
