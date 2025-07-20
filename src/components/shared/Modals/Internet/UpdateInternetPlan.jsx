import React, { useEffect, useState } from 'react';
import FormInput from '../../FormInput';
import { AuthButton } from '../../button';
import { Modal } from 'antd';
import SuccessModal from '../SuccessModal';
import { useDispatch } from 'react-redux';
import { createInternetPlans, getPlansByProvider } from '../../../../store/actions';
import { toast } from 'react-toastify';
import { updateInternetPlan } from '../../../../store/actions/providerAction';

const UpdateInternetPlan = ({ id, userData, action, openModal, handleOk, handleCancel }) => {
  const [plan, setPlan] = useState({ name: '', price: '', duration: '' });
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const dispatch = useDispatch();


  useEffect(()=>{
    if (userData) {
      setPlan({
        name: userData.name || '',
        price: userData.price || '',
        duration: userData.duration || '',
      });
    }
  },[userData])

  const handlePlanChange = (field, value) => {
    setPlan((prevPlan) => ({ ...prevPlan, [field]: value }));
  };

  const validatePlans = () => {
    return plan.name && plan.price && plan.duration;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePlans()) {
      alert('Please fill all fields for all plans.');
      return;
    }

    const params = plan;
    try {
      const res = await dispatch(
        updateInternetPlan({
          provId: id,
          planId: userData._id,
          payload: params,
        })
      );
      if (res.payload.statusCode){
        setSecondModalOpen(true); 
        handleOk();    
        dispatch(getPlansByProvider(id))   
      }else{
        toast.error(res.payload.message)
      }

      setPlan({ name: '', price: '', duration: '' })


    } catch (error) {
      console.error('Error submitting plans:', error);
      toast.error('Something went wrong !')
    }

    handleOk()
  };

  return (
    <>
      <SuccessModal
        title="Internet Plan has been updated"
        openModal={secondModalOpen}
        handleContinue={() => setSecondModalOpen(false)}
        handleCancel={() => setSecondModalOpen(false)}
        handleOk={() => setSecondModalOpen(false)}
      />

      <Modal
        className="basic-modal"
        title="Update Internet Plan"
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} // Custom footer is handled in the form
      >
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
              <div className="space-y-2">
                <div className="grid gap-3 grid-cols-3">
                  <FormInput
                    label="Plan Name"
                    type="text"
                    name={`planName`}
                    value={plan.name}
                    onChange={(e) => handlePlanChange('name', e.target.value)}
                    placeholder="Enter plan name"
                  />
                  <FormInput
                    label="Plan Price"
                    type="number"
                    name={`planPrice`}
                    value={plan.price}
                    onChange={(e) => handlePlanChange('price', Number(e.target.value))}
                    placeholder="Enter plan price"
                  />
                  <FormInput
                    label="Duration (days)"
                    type="number"
                    name={`duration`}
                    value={plan.duration}
                    onChange={(e) => handlePlanChange('duration', String(e.target.value))}
                    placeholder="Enter plan duration"
                  />
                </div>

              </div>
          </div>

          <AuthButton
            handleClick={handleSubmit}
            inactive={!validatePlans()}
            value="Update Plan"
          />
        </form>
      </Modal>
    </>
  );
};

export default UpdateInternetPlan;
