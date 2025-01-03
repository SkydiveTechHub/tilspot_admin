import React, { useEffect, useState } from 'react';
import FormInput from '../../FormInput';
import { AuthButton } from '../../button';
import useForm from '../../../../hooks/useForm';
import { Modal } from 'antd';
import ConfirmModal from '../ConfirmModal';
import { GrayText } from '../../typograph';
import SuccessModal from '../SuccessModal';
import { TimePicker } from 'antd';
import { createJorney, editJourney } from '../../../../store/actions';
import { useDispatch } from 'react-redux';
const { RangePicker } = TimePicker;

const AddTransportProvider = ({ catId, provId, action, userData, openModal, handleOk, handleCancel }) => {
  const dispatch = useDispatch();
  const [range, setRange] = useState(null); // For time range
  const [active, setActive] = useState(false); // For button activation
  const [secondModalOpen, setSecondModalOpen] = useState(false); // Success modal state
  const format = 'HH:mm';

  // Initial state setup based on action
  let initialState = action === 'edit'
    ? {
        departure: userData.departure || '',
        destination: userData.destination || '',
        amount: userData.price || '',
      }
    : {
        departure: '',
        destination: '',
        amount: '',
      };

  // Form handling hook
  const { values, handleChange, resetForm, errors } = useForm(initialState);

  // Reset form when userData changes
  useEffect(() => {
    resetForm(initialState);
    if (action === 'edit' && userData.departureTime && userData.arrivalTime) {
      setRange([userData.departureTime, userData.arrivalTime]); // Preload range for edit
    }
  }, [userData]);

  // Handle time range change
  const handleRangeChange = (dates, dateStrings) => {
    setRange(dateStrings);
    console.log('Selected Range:', dateStrings);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      startingLocation: values.departure,
      destination: values.destination,
      departureTime: range ? range[0] : '', // Include departure time
      arrivalTime: range ? range[1] : '',   // Include arrival time
      price: values.amount,
    };

    try {
      let res;
      if (action === 'edit') {
        res = await dispatch(editJourney({
          journeyId: catId,
          provId: provId,
          payload: params,
        }));
      } else {
        res = await dispatch(createJorney({
          catId: catId,
          payload: params,
        }));
      }

      if (res.payload.statusCode) {
        handleOk(); // Close modal on success
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }

    resetForm();
  };

  // Validate form to activate the button
  const validate = () => {
    setActive(
      !!values.departure &&
      !!values.destination &&
      !!values.amount &&
      range && range.length === 2 // Ensure time range is valid
    );
  };

  useEffect(() => {
    validate();
  }, [values, range]);

  return (
    <>
      <SuccessModal
        title={'Transport Provider has been added successfully'}
        openModal={secondModalOpen}
        handleContinue={() => setSecondModalOpen(false)}
        handleCancel={() => setSecondModalOpen(false)}
        handleOk={() => setSecondModalOpen(false)}
      />
      <Modal
        className="basic-modal"
        title={`${action === 'edit' ? 'Edit' : 'Add'} Transport Provider`}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
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
            <div style={{ display: 'flex', gap: '8px' }}>
              <RangePicker
                format={format}
                placeholder={['Departure Time', 'Arrival Time']}
                onChange={handleRangeChange}
              />
            </div>
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
            handleClick={() => {
              setSecondModalOpen(true);
              handleCancel();
            }}
            inactive={!active}
            value={action === 'edit' ? 'Update Provider' : 'Add Provider'}
          />
        </form>
      </Modal>
    </>
  );
};

export default AddTransportProvider;
