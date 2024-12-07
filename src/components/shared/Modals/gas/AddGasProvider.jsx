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


const AddGasProvider = ({ action, userData, openModal, handleOk, handleCancel }) => {
  const [active, setActive] = useState(false);
  const [more, setMore] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  let initialState; 

  if (action === 'edit'){
    initialState = {p_name: userData.name};
  }  else{
    initialState = {p_name: ''};
  }
const { values, handleChange, resetForm, errors } = useForm(initialState);
  useEffect(() => {
    resetForm(initialState);
    setUploadedImage(userData?.icon) 
  }, [userData]);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', values);
    handleOk(); // Optional: close modal on submit
    resetForm();
  };

  const validate = () => {
    setActive(!!values.p_name);
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
        title={`Gas Provider has been ${action === 'edit'?'edited' :'added'} Successfully`}
        openModal={secondModalOpen}
        handleContinue={()=>setSecondModalOpen(false)}
        handleCancel={()=>setSecondModalOpen(false)}
        handleOk={()=>setSecondModalOpen(false)}
      />
      <Modal
        className="basic-modal"
        title={`${action === 'edit'?'Edit' :'Add'} Gas Provider`}
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
            name="p_name"
            value={values.p_name}
            onChange={handleChange}
            placeholder="Enter provider name"
            error={errors?.p_name}
  
          />


          <AuthButton handleClick={()=>{
            setSecondModalOpen(true)
            handleCancel()
            }} inactive={!active} value={`${action === 'edit'?'Edit' :'Add'} Provider`} />
        </form>
      </Modal>    
    </>

  );
};

export default AddGasProvider;
