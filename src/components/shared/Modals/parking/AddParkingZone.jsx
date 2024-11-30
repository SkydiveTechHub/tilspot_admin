import React, { useEffect, useState } from 'react';
import FormInput from '../../FormInput';
import { AuthButton } from '../../button';
import useForm from '../../../../hooks/useForm';
import { Modal } from 'antd';
import ConfirmModal from '../ConfirmModal';
import { BlackText, GrayText } from '../../typograph';
import SuccessModal from '../SuccessModal';
// import SelectPlanModal from '../SelectPlanModal';

const initialState = {
  instance_name: '',
  type: '',
};

const AddParkingZone = ({ title, openModal, handleOk, handleCancel }) => {
  const [active, setActive] = useState(false);
  const [more, setMore] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const timePlan = ['30min', '1hr', '1hr 30m','2hr', '2hr 30m','3hr', '3hr 30m','4hr', '4hr 30m','5hr', '5hr 30m','6hr', '6hr 30m','7hr', '7hr 30m','8hr', '8hr 30m','9hr', '9hr 30m','10hr', '10hr 30m','11hr', '11hr 30m','12hr', '12hr 30m','13hr', '13hr 30m','14hr', '14hr 30m','15hr', '15hr 30m','16hr', '16hr 30m','17hr', '17hr 30m','18hr', '18hr 30m','19hr', '19hr 30m','20hr', '20hr 30m','21hr', '21hr 30m','22hr', '22hr 30m','23hr', '23hr 30m','24hr', '24hr 30m']
  const [planList, setPlanList] = useState([{ name: "", price: ""}]);

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
        title={'Zone has been added Successfully'}
        openModal={secondModalOpen}
        handleContinue={()=>setSecondModalOpen(false)}
        handleCancel={()=>setSecondModalOpen(false)}
        handleOk={()=>setSecondModalOpen(false)}
      />
      <Modal
        className="basic-modal"
        title={'Add Zone'}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <li><GrayText style={'text-[16px]'} text={'Location Name: '}/><BlackText style={'font-bold text-[14px] capitalize'} text={'New York'}/></li>
        <form className='mt-6 space-y-6' onSubmit={handleSubmit}>
          <FormInput
            label="Zone Name"
            type="text"
            name="instance_name"
            value={values.instance_name}
            onChange={handleChange}
            placeholder="Enter provider name"
            error={errors?.instance_name}
  
          />

          <div className=' grid gap-4 grid-cols-4'>
            {
              timePlan.map((i, id)=>{
                return(
                  <>

                      <div className=' '>
                          <FormInput
                            label={i}
                            type="text"
                            name="instance_name"
                            value={values.instance_name}
                            onChange={handleChange}
                            placeholder="price"
                            error={errors?.instance_name}
                  
                          />
                          {/* <FormInput
                            label="Price"
                            type="text"
                            name="instance_name"
                            value={values.instance_name}
                            onChange={handleChange}
                            placeholder="Enter plan price"
                            error={errors?.instance_name}
                  
                          />     
                                         */}
                        </div>                                    

                  </>

                )
              })
            }

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

export default AddParkingZone;
