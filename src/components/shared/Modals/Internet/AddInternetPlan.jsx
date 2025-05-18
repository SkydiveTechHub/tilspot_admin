import React, { useEffect, useState } from 'react';
import FormInput from '../../FormInput';
import { AuthButton } from '../../button';
import { Modal } from 'antd';
import SuccessModal from '../SuccessModal';
import { useDispatch } from 'react-redux';
import { createInternetPlans, getPlansByProvider } from '../../../../store/actions';
import { toast } from 'react-toastify';

const AddInternetPlan = ({ id, openModal, handleOk, handleCancel }) => {
  const [planList, setPlanList] = useState([{ name: '', price: '', duration: '' }]);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const dispatch = useDispatch();

  // Add a new empty plan
  const increasePlanCount = () => {
    setPlanList([...planList, { name: '', price: '', duration: '' }]);
  };

  // Remove a specific plan by index
  const decreasePlanCount = (index) => {
    setPlanList((prevPlans) => prevPlans.filter((_, i) => i !== index));
  };

  // Handle input changes for specific plan fields
  const handlePlanChange = (index, field, value) => {
    const updatedPlans = [...planList];
    updatedPlans[index][field] = value;
    setPlanList(updatedPlans);
  };

  const validatePlans = () => {
    return planList.every((plan) => plan.name && plan.price && plan.duration);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePlans()) {
      alert('Please fill all fields for all plans.');
      return;
    }

    const params = {
      // optionType: 'plan',
      planOptions: JSON.stringify(planList),
    };

    try {
      const res = await dispatch(
        createInternetPlans({
          provId: id,
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

      setPlanList([{ name: '', price: '', duration: '' }])

    } catch (error) {
      console.error('Error submitting plans:', error);
      toast.error('Something went wrong !')
    }
  };

  return (
    <>
      <SuccessModal
        title="Internet Plan has been added Successfully"
        openModal={secondModalOpen}
        handleContinue={() => setSecondModalOpen(false)}
        handleCancel={() => setSecondModalOpen(false)}
        handleOk={() => setSecondModalOpen(false)}
      />

      <Modal
        className="basic-modal"
        title="Add Internet Plan"
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} // Custom footer is handled in the form
      >
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {planList.map((plan, index) => (
              <div key={index} className="space-y-2">
                <div className="grid gap-3 grid-cols-3">
                  <FormInput
                    label="Plan Name"
                    type="text"
                    name={`name-${index}`}
                    value={plan.name}
                    onChange={(e) => handlePlanChange(index, 'name', e.target.value)}
                    placeholder="Enter plan name"
                  />
                  <FormInput
                    label="Plan Price"
                    type="number"
                    name={`price-${index}`}
                    value={plan.price}
                    onChange={(e) => handlePlanChange(index, 'price', Number(e.target.value))}
                    placeholder="Enter plan price"
                  />
                  <FormInput
                    label="Duration (days)"
                    type="text"
                    name={`duration-${index}`}
                    value={plan.duration}
                    onChange={(e) => handlePlanChange(index, 'duration', e.target.value)}
                    placeholder="Enter plan duration"
                  />
                </div>

                {planList.length > 1 && (
                  <div className="flex justify-end w-full mt-[-20px]">
                    <button
                      type="button"
                      className="text-red-500 text-sm"
                      onClick={() => decreasePlanCount(index)}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end w-full py-4">
            <button
              type="button"
              className="text-green-500 text-sm"
              onClick={increasePlanCount}
            >
              Add More Plans
            </button>
          </div>

          <AuthButton
            handleClick={handleSubmit}
            inactive={!validatePlans()}
            value="Add Plan"
          />
        </form>
      </Modal>
    </>
  );
};

export default AddInternetPlan;
