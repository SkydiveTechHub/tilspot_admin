import React, { useEffect, useState } from 'react';
import FormInput from '../../FormInput';
import { AuthButton } from '../../button';
import useForm from '../../../../hooks/useForm';
import { Modal } from 'antd';
import { BlackText, GrayText } from '../../typograph';
import SuccessModal from '../SuccessModal';
import { useDispatch } from 'react-redux';
import { createZone, editZone } from '../../../../store/actions';


const AddParkingZone = ({ id, data, action,  openModal, handleOk, handleCancel }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const initialState = action==='edit' ? {name:data.name || ""} : {name:''}
  const { values, handleChange, resetForm, errors } = useForm(initialState, action);
  const timePlan = [
    '30min', '1hr', '1hr 30m', '2hr', '2hr 30m', '3hr', '3hr 30m', '4hr',
    '4hr 30m', '5hr', '5hr 30m', '6hr', '6hr 30m', '7hr', '7hr 30m', '8hr',
    '8hr 30m', '9hr', '9hr 30m', '10hr', '10hr 30m', '11hr', '11hr 30m', '12hr',
  ];
  // const [planList, setPlanList] = useState(
  //   timePlan.map((duration) => ({ duration, price: '' }))
  // );

const [planList, setPlanList] = useState(timePlan.map((duration) => ({ duration, price: '' })));

  useEffect(()=>{

    const loadPlanList = ()=>{
      if (action === "edit" && data?.timeOptions?.length) {

        return timePlan.map((duration) => {
          const existingOption = data?.timeOptions.find(
            (option) => option.duration === duration
          );
          return {
            duration,
            price: existingOption ? existingOption.price : "",
          };
        });
      }
      return timePlan.map((duration) => ({ duration, price: "" }));      
    }

    setPlanList(loadPlanList())

  }, [action])

  const handlePlanChange = (index, field, value) => {
    const updatedPlanList = [...planList];
    updatedPlanList[index][field] = value;
    setPlanList(updatedPlanList);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = {
      LocId: id,
      zoneId: data._id,
      payload: {
        zoneName: values.name,
        timeOptions: planList,
      },
    };

    try {
      if (action === 'edit'){
        const res = await dispatch(editZone(params));
        setSecondModalOpen(true);
        handleOk();
        resetForm();
      } else {
      const res = await dispatch(createZone(params));
      console.log('Zone created:', res);
      setSecondModalOpen(true);
      handleOk();
      resetForm();
      }
    } catch (error) {
      console.error('Error creating zone:', error);
    }
  };

  // Validate form inputs
  const validate = () => {
    const isValidName = !!values.name;
    const isValidPlans = planList.every((plan) => plan.price); 
    setActive(isValidName && isValidPlans);
  };

  useEffect(() => {
    validate();
  }, [values, planList]);

  return (
    <>
      <SuccessModal
        title={`${action === 'edit' ? 'Zone Location has been Edit Successfully' : 'Zone Location has been Add Successfully'} `}
        openModal={secondModalOpen}
        handleContinue={() => setSecondModalOpen(false)}
        handleCancel={() => setSecondModalOpen(false)}
        handleOk={() => setSecondModalOpen(false)}
      />
      <Modal
        className="basic-modal"
        title="Add Zone"
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <li>
          <GrayText style="text-[16px]" text="Location Name: " />
          <BlackText style="font-bold text-[14px] capitalize" text="New York" />
        </li>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <FormInput
            label="Zone Name"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Enter zone name"
            error={errors?.name}
          />
          <div className="grid gap-4 grid-cols-4">
            {planList.map((plan, index) => (
              <div key={index}>
                <FormInput
                  label={plan.duration}
                  type="text"
                  name={`price_${index}`}
                  value={plan.price}
                  onChange={(e) =>
                    handlePlanChange(index, 'price', e.target.value)
                  }
                  placeholder="Enter price"
                  error={errors?.[`price_${index}`]}
                />
              </div>
            ))}
          </div>
          <AuthButton
            handleClick={handleSubmit}
            inactive={!active}
            value="Add Zone"
          />
        </form>
      </Modal>
    </>
  );
};

export default AddParkingZone;
