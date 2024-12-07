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

const AddInternetPlan = ({ title, openModal, handleOk, handleCancel }) => {
  const [active, setActive] = useState(false);
  const [more, setMore] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [planList, setPlanList] = useState([{ name: "", price: ""}]);
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
        title={'Internet Plan has been added Successfully'}
        openModal={secondModalOpen}
        handleContinue={()=>setSecondModalOpen(false)}
        handleCancel={()=>setSecondModalOpen(false)}
        handleOk={()=>setSecondModalOpen(false)}
      />
      <Modal
        className="basic-modal"
        title={'Add Internet Plan'}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex items-center gap-2">

        </div>
        <form className='mt-6 space-y-6' onSubmit={handleSubmit}>


          <div className='space-y-4'>
            {
              planList.map((i, id)=>{
                return(
                  <>

                      <div className='grid gap-3 grid-cols-3'>
                          <FormInput
                            label="Plan Name"
                            type="text"
                            name="instance_name"
                            value={values.instance_name}
                            onChange={handleChange}
                            placeholder="Enter plan name"
                            error={errors?.instance_name}
                  
                          />
                          <FormInput
                            label="Plan Price"
                            type="text"
                            name="instance_name"
                            value={values.instance_name}
                            onChange={handleChange}
                            placeholder="Enter plan price"
                            error={errors?.instance_name}
                  
                          />     
                          <FormInput
                            label="Duration (days)"
                            type="text"
                            name="instance_name"
                            value={values.instance_name}
                            onChange={handleChange}
                            placeholder="Enter plan price"
                            error={errors?.instance_name}
                  
                          />     
                                        
                        </div>                                    
                        {planList.length > 1 && (
                                                <div className="flex justify-end w-full mt-[-40px] ">
                                                    <button
                                                        type="button"
                                                        className="font-[400] text-[red] font-Int text-[14px]"
                                                        onClick={()=>DecreasePlanCount(id)}
                                                    >
                                                        remove
                                                    </button>
                                                </div>
                                            )}
                  </>

                )
              })
            }

          </div>

          <div className="flex justify-end w-full py-4">
                            <button
                                type="button"
                                className="font-[500] text-[green] font-Int text-[14px]"
                                onClick={IncreasePlanCount}
                            >
                                Add more plans
                            </button>
                        </div>
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

export default AddInternetPlan;
