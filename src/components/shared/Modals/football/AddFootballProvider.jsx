import React, { useEffect, useState } from 'react';
import FormInput from '../../FormInput';
import { AuthButton } from '../../button';
import useForm from '../../../../hooks/useForm';
import { Modal } from 'antd';
import ConfirmModal from '../ConfirmModal';
import { GrayText, Label } from '../../typograph';
import SuccessModal from '../SuccessModal';
import { DatePicker, Space } from 'antd';
import { createMatch, editMatch, getMatch } from '../../../../store/actions';
import { useDispatch } from 'react-redux';
import { formatDate } from '../../../../utils/tools';
import moment from 'moment/moment';
import { toast } from 'react-toastify';




const AddFootballTicketProvider = ({ catId, provId, action, userData, openModal, handleOk, handleCancel }) => {
  const dispatch = useDispatch()
  const [active, setActive] = useState(false);
  const [more, setMore] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [ticketType, setTicketType] = useState([{sittingArea: "", price: "", description:''}]);
  const [date, setDate] = useState(userData?.match?.dateTime ? moment(userData.match.dateTime) : null);

  useEffect(() => {
    if (userData?.match?.dateTime) {
      setDate(moment(userData.match.dateTime));
    }
  }, [userData]);
  
  const initialState = action === 'edit' ? {
    league:userData?.match?.league,
    home: userData?.match?.homeTeam,
    away: userData?.match?.awayTeam,
    stadium: userData?.match?.stadium,
    time: moment(userData.match.dateTime),
  } : {
    league:'',
    home: '',
    away: '',
    stadium: '',
    time: '',
  };
  const { values, handleChange, resetForm, errors } = useForm(initialState);

  useEffect(() => {
    resetForm(initialState);
    setTicketType(userData?.tickets || []);
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(catId, provId);

    const params = {
      catId,
      provId,
      payload:{
        homeTeam: values.home,
        awayTeam:values.away,
        stadium:values.stadium,
        tickets:ticketType,
        league:values.league,
        dateTime:formatDate(date)
        }
    }

      console.log(params)
    try {
      let res 
      if(action ==='edit'){
        res =  await dispatch(editMatch({
        matchId:userData._id,
        provId:provId,
        payload:params
      })) 
      }else{
        console.log(params)
        res =  await dispatch(createMatch(params)) 
        if(res.payload.statusCode){
          handleOk();
          dispatch(getMatch())
        }else{
          toast.error(res.payload.message)
          handleCancel()
        }
      }


      console.log(res)
      if (res.payload.statusCode){
        setSecondModalOpen(true)
        handleOk()
        // setIsSuccessModalOpen(true); 
        // handleOk(); 
      }else{
        toast.error(res.payload.message)
        handleCancel()
      }
    } catch (error) {
      toast.error('Something went wrong !')
      handleCancel()
    }
    resetForm()
  };

  const validate = () => {
    setActive(!!values.league);
  };

  useEffect(() => {
    validate();
  }, [values]); 

  const handleTicketChange = (index, field, value) => {
    const updatedPlans = [...ticketType];
    updatedPlans[index][field] = value;
    setTicketType(updatedPlans);
  };

    const IncreasePlanCount = () => {
      setTicketType([...ticketType, { sittingArea: "", price: "", description:''}]);
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
              name="league"
              value={values.league}
              onChange={handleChange}
              placeholder="Enter provider name"
              error={errors?.league}
    
            />
            <div className='relative w-full'>
              <Label text={'Date & Time'}/>
              <DatePicker
                showTime
                value={date}
                onChange={(value, dateString) => {
                  // console.log('Selected Time: ', value);
                  // console.log('Formatted Selected Time: ', dateString);
                  setDate(dateString)
                }}
                onOk={onOk}
              />
            </div>
                       
          </div>

          <div className='flex items-center justify-between gap-3'>
            <FormInput
              label="Home Team"
              type="text"
              name="home"
              value={values.home}
              onChange={handleChange}
              placeholder="Enter Home Team"
              error={errors?.home}
    
            />
            <span>-</span>
            <FormInput
              label="Away Team"
              type="text"
              name="away"
              value={values.away}
              onChange={handleChange}
              placeholder="Enter provider name"
              error={errors?.away}
    
            />
          </div>

          <FormInput
            label="Stadium"
            type="text"
            name="stadium"
            value={values.stadium}
            onChange={handleChange}
            placeholder="Enter provider name"
            error={errors?.stadium}
  
          />

          

          <div className='space-y-4'>
            <p className='bg-gray font-semibold'>Match Tickets</p>
            {
              ticketType.map((i, id)=>{
                return(
                  <div className='flex items-center gap-4'>

                    <div>
                      <div className='grid gap-3 grid-cols-2'>
                          <FormInput
                            label="Seat Area"
                            type="text"
                            name="sittingArea"
                            value={i.sittingArea}
                            onChange={(e) => handleTicketChange(id, 'sittingArea', (e.target.value))}
                            placeholder="Enter plan name"
                            error={errors?.instance_name}
                  
                          />   
                          <FormInput
                            label="Price per Ticket"
                            type="text"
                            name="price"
                            value={i.price}
                            onChange={(e) => handleTicketChange(id, 'price', Number(e.target.value))}
                            placeholder="Enter plan price"
                            error={errors?.instance_name}              
                          />     
                                        
                        </div>
                        <FormInput
                            label="Description"
                            type="textarea"
                            name="description"
                            value={i.description}
                            onChange={(e) => handleTicketChange(id, 'description', e.target.value)}
                            placeholder="Enter description"
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

          <AuthButton inactive={!active} value="Add Match" />
        </form>
      </Modal>    
    </>

  );
};

export default AddFootballTicketProvider;
