import React, { useEffect, useState } from 'react';
import FormInput from '../../FormInput';
import { AuthButton } from '../../button';
import useForm from '../../../../hooks/useForm';
import { Modal } from 'antd';
import ConfirmModal from '../ConfirmModal';
import { GrayText } from '../../typograph';
import SuccessModal from '../SuccessModal';
import UserImageUpload from '../../UserImageUpload';
// import SelectPlanModal from '../SelectPlanModal';

const initialState = {
  instance_name: '',
  type: '',
};

const AddElectricityProvider = ({ title, openModal, handleOk, handleCancel }) => {
  const [active, setActive] = useState(false);
  const [more, setMore] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
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

  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData);
  };


  useEffect(() => {
    validate();
  }, [values]); // Re-run validation when `values` change

  return (
    <>
      <SuccessModal
        title={'Electricity Provider has been added Successfully'}
        openModal={secondModalOpen}
        handleContinue={()=>setSecondModalOpen(false)}
        handleCancel={()=>setSecondModalOpen(false)}
        handleOk={()=>setSecondModalOpen(false)}
      />
      <Modal
        className="basic-modal"
        title={'Add Electricity Provider'}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >

        <div className="flex items-center gap-2">
          {uploadedImage && (
            <div className="image-preview">
              <img src={uploadedImage} alt="Uploaded Preview" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
            </div>
          )}
          <UserImageUpload onImageUpload={handleImageUpload} />
          {
            uploadedImage === '' || uploadedImage === null && <span className='text-[12px] italic  text-[gray]'>Optional</span>
          }
        </div>
        <form className='mt-6 space-y-6' onSubmit={handleSubmit}>
          <FormInput
            label="Provider Name"
            type="text"
            name="instance_name"
            value={values.instance_name}
            onChange={handleChange}
            placeholder="Enter provider name"
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

export default AddElectricityProvider;
