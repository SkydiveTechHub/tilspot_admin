import React, { useEffect, useState } from 'react';
import FormInput from '../../FormInput';
import { AuthButton } from '../../button';
import useForm from '../../../../hooks/useForm';
import { Modal } from 'antd';
import SuccessModal from '../SuccessModal';
import UserImageUpload from '../../UserImageUpload';
import { useDispatch } from 'react-redux';
import { createProvider, editProvider } from '../../../../store/actions';



const AddHousingProvider = ({catId, provId, action, userData, openModal, handleOk, handleCancel }) => {
  
    const dispatch = useDispatch()
    const [active, setActive] = useState(false);
  const [more, setMore] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const initialState = action === 'edit' ? { p_name: userData?.name || '' } : { p_name: '' };
  const { values, handleChange, resetForm, errors } = useForm(initialState);

  useEffect(() => {
    resetForm(initialState);
    setUploadedImage(userData?.providerLogo || null);
  }, [userData]);


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
        provId:userData._id,
        payload:params
      })) 
      }else{
        res =  await dispatch(createProvider({
          catId:catId,
          payload:params
        })) 
      }

      if (res.payload.statusCode){
        setSecondModalOpen(true); 
        handleOk(); 
      }

      setUploadedImage(null)
    } catch (error) {
      
    }
    resetForm()
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
        title={`Housing Provider has been ${action === 'edit'?'edited' :'added'} Successfully`}
        openModal={secondModalOpen}
        handleContinue={()=>setSecondModalOpen(false)}
        handleCancel={()=>setSecondModalOpen(false)}
        handleOk={()=>setSecondModalOpen(false)}
      />
      <Modal
        className="basic-modal"
        title={`${action === 'edit'?'Edit' :'Add'} Housing Provider`}
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
          {/* {
            uploadedImage === '' || uploadedImage === null && <span className='text-[12px] italic  text-[gray]'>Optional</span>
          } */}
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

export default AddHousingProvider;
