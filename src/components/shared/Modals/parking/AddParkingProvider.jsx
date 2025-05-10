import React, { useEffect, useState } from 'react';
import FormInput from '../../FormInput';
import { AuthButton } from '../../button';
import useForm from '../../../../hooks/useForm';
import { Modal } from 'antd';
import SuccessModal from '../SuccessModal';
import { createLocation, editLocation } from '../../../../store/actions';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// import SelectPlanModal from '../SelectPlanModal';


const AddParkingLocation = ({ locId, userData, action, openModal, handleOk, handleCancel }) => {
  const dispatch = useDispatch()
  const [active, setActive] = useState(false);
  const [more, setMore] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const initialState = action === 'edit' ? { name: userData?.name || '' } : { name: '' };
  const { values, handleChange, resetForm, errors } = useForm(initialState);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = {
        locationName:values.name
      }
    try {
      let res 
      if(action ==='edit'){
        res =  await dispatch(editLocation({
        locId: userData._id,
        payload:params
      })) 
      }else{
        res =  await dispatch(createLocation({
          payload:params
        })) 
      }

      if (res.payload.statusCode){
        setSecondModalOpen(true); 
        handleOk(); 
      }else{
        toast.error(res.payload.message)
        handleCancel()
      }
    } catch (error) {
      
    }
    resetForm()
  };

  const validate = () => {
    setActive(!!values.name);
  };

  useEffect(() => {
    validate();
  }, [values]); 


  return (
    <>
      <SuccessModal
        title={`${action === 'edit' ? 'Parking Location has been Edit Successfully' : 'Parking Location has been Add Successfully'} `}
        openModal={secondModalOpen}
        handleContinue={()=>setSecondModalOpen(false)}
        handleCancel={()=>setSecondModalOpen(false)}
        handleOk={()=>setSecondModalOpen(false)}
      />
      <Modal
        className="basic-modal"
        title={`${action === 'edit' ? 'Edit' : 'Add'} Parking Location`}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className='mt-6 space-y-6' onSubmit={handleSubmit}>
          <FormInput
            label="Location Name"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Enter Location name"
            error={errors?.name}
  
          />


          <AuthButton  inactive={!active}  value={`${action === 'edit' ? 'Edit' : 'Add'} Location`} />
        </form>
      </Modal>    
    </>

  );
};

export default AddParkingLocation;
