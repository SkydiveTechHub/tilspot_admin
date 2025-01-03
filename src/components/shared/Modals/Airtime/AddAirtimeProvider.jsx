import React, { useEffect, useState } from 'react';
import FormInput from '../../FormInput';
import { AuthButton } from '../../button';
import useForm from '../../../../hooks/useForm';
import { Modal } from 'antd';
import SuccessModal from '../SuccessModal';
import UserImageUpload from '../../UserImageUpload';
import { useDispatch } from 'react-redux';
import { createProvider, editProvider } from '../../../../store/actions';

const AddAirtimeProvider = ({catId, provId, action, userData, openModal, handleOk, handleCancel }) => {
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState(false); // Controls button activation
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Success modal state
  const [uploadedImage, setUploadedImage] = useState(null); // Uploaded image state
  const initialState = action === 'edit' ? { p_name: userData?.name || '' } : { p_name: '' };
  const { values, handleChange, resetForm, errors } = useForm(initialState);

  useEffect(() => {
    resetForm(initialState);
    setUploadedImage(userData?.icon || null);
  }, [userData]);


  useEffect(() => {
    setIsActive(!!values.p_name);
  }, [values]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = {
        name:values.p_name,
        providerLogo: uploadedImage
      }
    try {
      let res 
      if(action ==='edit'){
        res =  await dispatch(editProvider({
        catId:catId,
        provId:provId,
        payload:params
      })) 
      }else{
        res =  await dispatch(createProvider({
          catId:catId,
          payload:params
        })) 
      }


      console.log(res)
      if (res.payload.statusCode){
        setIsSuccessModalOpen(true); 
        handleOk(); 
      }
    } catch (error) {
      
    }
    resetForm()
  };

  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData);
  };

  return (
    <>
      {/* Success Modal */}
      <SuccessModal
        title={`Airtime Provider has been ${action === 'edit' ? 'edited' : 'added'} Successfully`}
        openModal={isSuccessModalOpen}
        handleContinue={() => setIsSuccessModalOpen(false)}
        handleCancel={() => setIsSuccessModalOpen(false)}
        handleOk={() => setIsSuccessModalOpen(false)}
      />

      {/* Main Modal */}
      <Modal
        className="basic-modal"
        title={`${action === 'edit' ? 'Edit' : 'Add'} Airtime Provider`}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} // Custom footer to control form submission
      >
        {/* Image Upload Section */}
        <div className="flex items-center gap-2">
          {uploadedImage && (
            <div className="image-preview">
              <img
                src={uploadedImage}
                alt="Uploaded Preview"
                style={{ width: '60px', height: '60px', borderRadius: '50%' }}
              />
            </div>
          )}
          <UserImageUpload onImageUpload={handleImageUpload} />
          {(!uploadedImage || uploadedImage === '') && (
            <span className="text-[12px] italic text-[gray]">Optional</span>
          )}
        </div>

        {/* Form Section */}
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <FormInput
            label="Provider Name"
            type="text"
            name="p_name"
            value={values.p_name}
            onChange={handleChange}
            placeholder="Enter provider name"
            error={errors?.p_name}
          />

          <AuthButton
            handleClick={handleSubmit}
            inactive={!isActive}
            value={`${action === 'edit' ? 'Edit' : 'Add'} Provider`}
          />
        </form>
      </Modal>
    </>
  );
};

export default AddAirtimeProvider;
