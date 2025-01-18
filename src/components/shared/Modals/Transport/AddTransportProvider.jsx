import React, { useEffect, useState } from 'react';
import { Modal, TimePicker } from 'antd';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import FormInput from '../../FormInput';
import { AuthButton } from '../../button';
import useForm from '../../../../hooks/useForm';
import ConfirmModal from '../ConfirmModal';
import SuccessModal from '../SuccessModal';
import { createJorney, editJourney } from '../../../../store/actions';

const { RangePicker } = TimePicker;

const AddTransportProvider = ({
  catId,
  provId,
  action,
  userData,
  openModal,
  handleOk,
  handleCancel,
}) => {
  const dispatch = useDispatch();
  const [range, setRange] = useState(null); // For time range
  const [active, setActive] = useState(false); // For button activation
  const [successModalOpen, setSuccessModalOpen] = useState(false); // Success modal state
  const format = 'HH:mm'; 
  const initialState = action === 'edit'
    ? {
        departure: userData?.start || '',
        destination: userData?.destination || '',
        amount: userData?.price || '',
      }
    : {
        departure: '',
        destination: '',
        amount: '',
      };

  // Custom hook for form handling
  const { values, handleChange, resetForm, errors } = useForm(initialState);

  // Prepopulate form and time range when editing
  useEffect(() => {
    resetForm(initialState);
    if (action === 'edit' && userData?.departureTime && userData?.arrivalTime) {
      setRange([moment(userData.departureTime, format), moment(userData.arrivalTime, format)]);
    } else {
      setRange(null);
    }
  }, [userData]);

  // Handle time range selection
  const handleRangeChange = (dates, dateStrings) => {
    setRange(dates);
  };


  useEffect(() => {
    setActive(
      !!values.departure &&
      !!values.destination &&
      !!values.amount &&
      range && range.length === 2
    );
  }, [values, range]);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      startingLocation: values.departure,
      destination: values.destination,
      departureTime: range ? range[0].format(format) : '',
      arrivalTime: range ? range[1].format(format) : '',
      price: values.amount,
    };

    try {
      let res;
      if (action === 'edit') {
        res = await dispatch(editJourney({ journeyId:userData._id, provId:userData._providerId, payload: params }));
      } else {
        res = await dispatch(createJorney({ catId, payload: params }));
      }

      if (res.payload.statusCode) {
        handleOk(); // Close modal
        setSuccessModalOpen(true); // Open success modal
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }

    resetForm();
  };

  return (
    <>
      <SuccessModal
        title={'Transport Provider has been added successfully'}
        openModal={successModalOpen}
        handleContinue={() => setSuccessModalOpen(false)}
        handleCancel={() => setSuccessModalOpen(false)}
        handleOk={() => setSuccessModalOpen(false)}
      />
      <Modal
        className="basic-modal"
        title={`${action === 'edit' ? 'Edit' : 'Add'} Transport Provider`}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <FormInput
            label="Departure Location"
            type="text"
            name="departure"
            value={values.departure}
            onChange={handleChange}
            placeholder="Enter departure location"
            error={errors?.departure}
          />

          <FormInput
            label="Destination"
            type="text"
            name="destination"
            value={values.destination}
            onChange={handleChange}
            placeholder="Enter destination"
            error={errors?.destination}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <RangePicker
              format={format}
              placeholder={['Departure Time', 'Arrival Time']}
              onChange={handleRangeChange}
              value={range}
            />
          </div>

          <FormInput
            label="Amount"
            type="text"
            name="amount"
            value={values.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            error={errors?.amount}
          />

          <AuthButton
            handleClick={handleSubmit}
            inactive={!active}
            value={action === 'edit' ? 'Update Provider' : 'Add Provider'}
          />
        </form>
      </Modal>
    </>
  );
};

export default AddTransportProvider;
