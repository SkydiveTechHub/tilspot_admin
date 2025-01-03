import React, { useEffect, useState } from 'react';
import FormInput from '../../FormInput';
import { AuthButton } from '../../button';
import useForm from '../../../../hooks/useForm';
import { Modal } from 'antd';
import ConfirmModal from '../ConfirmModal';
import { GrayText, Label } from '../../typograph';
import SuccessModal from '../SuccessModal';
import { DatePicker, Space } from 'antd';
import { createMatch } from '../../../../store/actions';



const initialState = {
  instance_name: '',
  type: '',
};

const AddFootballTicketProvider = ({ catId, provId, action, userData, openModal, handleOk, handleCancel }) => {
  const [active, setActive] = useState(false);
  const [more, setMore] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [ticketType, setTicketType] = useState([{ name: "", price: ""}]);
  const { values, handleChange, resetForm, errors } = useForm(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', values);
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
        res =  await dispatch(createMatch({
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

  const validate = () => {
    setActive(!!values.instance_name);
  };

  useEffect(() => {
    validate();
  }, [values]); 

    const IncreasePlanCount = () => {
      setTicketType([...ticketType, { name: "", price: ""}]);
  };

  const DecreasePlanCount = (index) => {
          setTicketType((prevItems) => prevItems.filter((_, i) => i !== index));

  };
  const onOk = (value) => {
    console.log('onOk: ', value);
  };
  return (
    <>
      <SuccessModal
        title={'Football Match  has been added Successfully'}
        openModal={secondModalOpen}
        handleContinue={()=>setSecondModalOpen(false)}
        handleCancel={()=>setSecondModalOpen(false)}
        handleOk={()=>setSecondModalOpen(false)}
      />
      <Modal
        className="basic-modal"
        title={'Add Football Match '}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className='mt-6 space-y-6' onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-6'>
            <FormInput
              label="League Name"
              type="text"
              name="instance_name"
              value={values.instance_name}
              onChange={handleChange}
              placeholder="Enter provider name"
              error={errors?.instance_name}
    
            />
            <div className='relative w-full'>
              <Label text={'Date & Time'}/>
              <DatePicker
                showTime
                onChange={(value, dateString) => {
                  console.log('Selected Time: ', value);
                  console.log('Formatted Selected Time: ', dateString);
                }}
                onOk={onOk}
              />
            </div>
                       
          </div>

          <div className='flex items-center justify-between gap-3'>
            <FormInput
              label="Home Team"
              type="text"
              name="instance_name"
              value={values.instance_name}
              onChange={handleChange}
              placeholder="Enter provider name"
              error={errors?.instance_name}
    
            />
            <span>-</span>
            <FormInput
              label="Away Team"
              type="text"
              name="instance_name"
              value={values.instance_name}
              onChange={handleChange}
              placeholder="Enter provider name"
              error={errors?.instance_name}
    
            />
          </div>

          <FormInput
            label="Stadium"
            type="text"
            name="instance_name"
            value={values.instance_name}
            onChange={handleChange}
            placeholder="Enter provider name"
            error={errors?.instance_name}
  
          />

<div className='space-y-4'>
            {
              ticketType.map((i, id)=>{
                return(
                  <div className='flex items-center gap-4'>

                    <div>
                      <div className='grid gap-3 grid-cols-2'>
                          <FormInput
                            label="Seat Area"
                            type="text"
                            name="instance_name"
                            value={values.instance_name}
                            onChange={handleChange}
                            placeholder="Enter plan name"
                            error={errors?.instance_name}
                  
                          />   
                          <FormInput
                            label="Price per Ticket"
                            type="text"
                            name="instance_name"
                            value={values.instance_name}
                            onChange={handleChange}
                            placeholder="Enter plan price"
                            error={errors?.instance_name}              
                          />     
                                        
                        </div>
                        <FormInput
                            label="Description"
                            type="textarea"
                            name="instance_name"
                            value={values.instance_name}
                            onChange={handleChange}
                            placeholder="Enter plan price"
                            error={errors?.instance_name}
                  
                          />  
                    </div>                                    
                        {ticketType.length > 1 && (
                                <button
                                    type="button"
                                    className="font-[400] text-[red] font-Int text-[14px]"
                                    onClick={()=>DecreasePlanCount(id)}
                                >
                                    <img src="/images/bin.png" alt="" />
                                </button>
                        
                        )}
                  </div>

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
                                Add Ticket 
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
            }} inactive={!active} value="Add Match" />
        </form>
      </Modal>    
    </>

  );
};

export default AddFootballTicketProvider;
