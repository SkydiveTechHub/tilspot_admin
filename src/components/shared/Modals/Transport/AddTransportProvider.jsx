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

const initialState = {
  instance_name: '',
  type: '',
};

const AddTransportProvider = ({ title, openModal, handleOk, handleCancel }) => {
  const [active, setActive] = useState(false);
  const [more, setMore] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const format = 'HH:mm';
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
            name="instance_name"
            value={values.instance_name}
            onChange={handleChange}
            placeholder="Enter provider name"
            error={errors?.instance_name}
  
          />
          <FormInput
            label="Departure Zone"
            type="text"
            name="instance_name"
            value={values.instance_name}
            onChange={handleChange}
            placeholder="Enter provider name"
            error={errors?.instance_name}
  
          />
          <FormInput
            label="Destination"
            type="text"
            name="instance_name"
            value={values.instance_name}
            onChange={handleChange}
            placeholder="Enter provider name"
            error={errors?.instance_name}
  
          />
          <FormInput
            label="Destination Zone"
            type="text"
            name="instance_name"
            value={values.instance_name}
            onChange={handleChange}
            placeholder="Enter provider name"
            error={errors?.instance_name}
  
          />
          <Flex vertical gap={12}>
            <Flex gap={8}>
              <RangePicker format={format} placeholder={['Departure Time', 'Arrival Time']} />
            </Flex>
          </Flex>

          <FormInput
            label="Amount"
            type="text"
            name="instance_name"
            value={values.instance_name}
            onChange={handleChange}
            placeholder="Enter provider amount"
            error={errors?.instance_name}
  
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
