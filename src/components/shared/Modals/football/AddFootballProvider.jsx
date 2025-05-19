import React, { useEffect, useState, useMemo } from 'react';
import { Modal, DatePicker } from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import FormInput from '../../FormInput';
import { AuthButton } from '../../button';
import useForm from '../../../../hooks/useForm';
import { GrayText, Label } from '../../typograph';
import SuccessModal from '../SuccessModal';
import {
  createMatch,
  editMatch,
  getMatch,
} from '../../../../store/actions';
import { formatDate } from '../../../../utils/tools';

const AddFootballTicketProvider = ({
  catId,
  provId,
  action, 
  userData,
  openModal,
  handleOk,
  handleCancel,
}) => {
  const dispatch = useDispatch();

  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [ticketType, setTicketType] = useState([{ sittingArea: '', price: '', description: '' }]);
  const [date, setDate] = useState(userData?.match?.dateTime ? moment(userData.match.dateTime) : null);

  const initialState = useMemo(() => {
    return action === 'edit'
      ? {
          league: userData?.match?.league || '',
          home: userData?.match?.homeTeam || '',
          away: userData?.match?.awayTeam || '',
          stadium: userData?.match?.stadium || '',
          time: userData?.match?.dateTime ? moment(userData.match.dateTime) : '',
        }
      : {
          league: '',
          home: '',
          away: '',
          stadium: '',
          time: '',
        };
  }, [userData, action]);

  const { values, handleChange, resetForm, errors } = useForm(initialState);

  useEffect(() => {
    resetForm(initialState);
    setTicketType(userData?.tickets || [{ sittingArea: '', price: '', description: '' }]);
    setDate(userData?.match?.dateTime ? moment(userData.match.dateTime) : null);
  }, [initialState]);

  const isFormValid = useMemo(() => {
    return !!values.league;
  }, [values]);

  const handleTicketChange = (index, field, value) => {
    const updated = [...ticketType];
    updated[index][field] = value;
    setTicketType(updated);
  };

  const addTicket = () => {
    setTicketType([...ticketType, { sittingArea: '', price: '', description: '' }]);
  };

  const removeTicket = (index) => {
    setTicketType((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      catId,
      provId,
      payload: {
        homeTeam: values.home,
        awayTeam: values.away,
        stadium: values.stadium,
        tickets: ticketType,
        league: values.league,
        dateTime: formatDate(date),
      },
    };

    try {
      let res;

      if (action === 'edit') {
        res = await dispatch(
          editMatch({
            matchId: userData._id,
            provId,
            payload: params,
          })
        );
      } else {
        res = await dispatch(createMatch(params));
        if (!res.payload.statusCode) {
          toast.error(res.payload.message);
          handleCancel();
          return;
        }
        dispatch(getMatch());
      }

      if (res.payload.statusCode) {
        setSecondModalOpen(true);
        handleOk();
      } else {
        toast.error(res.payload.message);
        handleCancel();
      }
    } catch (error) {
      toast.error('Something went wrong!');
      handleCancel();
    }

    resetForm();
  };

  return (
    <>
      <SuccessModal
        title={'Football Match has been added Successfully'}
        openModal={secondModalOpen}
        handleContinue={() => setSecondModalOpen(false)}
        handleCancel={() => setSecondModalOpen(false)}
        handleOk={() => setSecondModalOpen(false)}
      />

      <Modal
        className="basic-modal"
        title={action === 'edit' ? 'Edit Football Match' : 'Add Football Match'}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <FormInput
              label="League Name"
              type="text"
              name="league"
              value={values.league}
              onChange={handleChange}
              placeholder="Enter league name"
              error={errors?.league}
            />
            <div className="relative w-full">
              <Label text="Date & Time" />
              <DatePicker
                showTime
                value={date}
                onChange={(val) => setDate(val)}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
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
              placeholder="Enter Away Team"
              error={errors?.away}
            />
          </div>

          <FormInput
            label="Stadium"
            type="text"
            name="stadium"
            value={values.stadium}
            onChange={handleChange}
            placeholder="Enter Stadium Name"
            error={errors?.stadium}
          />

          <div className="space-y-4">
            <p className="bg-gray font-semibold">Match Tickets</p>
            {ticketType.map((ticket, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <FormInput
                      label="Seat Area"
                      type="text"
                      name="sittingArea"
                      value={ticket.sittingArea}
                      onChange={(e) => handleTicketChange(index, 'sittingArea', e.target.value)}
                      placeholder="Enter Seat Area"
                    />
                    <FormInput
                      label="Price per Ticket"
                      type="number"
                      name="price"
                      value={ticket.price}
                      onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                      placeholder="Enter Price"
                    />
                  </div>
                  <FormInput
                    label="Description"
                    type="textarea"
                    name="description"
                    value={ticket.description}
                    onChange={(e) => handleTicketChange(index, 'description', e.target.value)}
                    placeholder="Enter Description"
                  />
                </div>
                {ticketType.length > 1 && (
                  <button
                    type="button"
                    className="text-red-600 text-sm"
                    onClick={() => removeTicket(index)}
                  >
                    <img src="/images/bin.png" alt="Delete" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end py-2">
            <button
              type="button"
              className="text-green-600 text-sm font-medium"
              onClick={addTicket}
            >
              Add Ticket
            </button>
          </div>

          <AuthButton inactive={!isFormValid} value={action === 'edit' ? 'Update Match' : 'Add Match'} />
        </form>
      </Modal>
    </>
  );
};

export default AddFootballTicketProvider;
