import React from 'react';
import useForm from '../../../hooks/useForm';
import FormInput from '../../../components/shared/FormInput';
import { PryButton } from '../../../components/shared/button';

const FeesPage = () => {
  const feesData = ['Airtime', 'Internet', 'Government', 'Gas', 'Waste', 'Transport', 'Football', 'Cable', 'Parking', 'Housing', 'Electricity'];

  // Create initial state for each fee
  const initialState = feesData.reduce((acc, fee) => {
    acc[fee] = { factor: '', amount: '' };
    return acc;
  }, {});

  const { values, handleChange, resetForm, errors } = useForm(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values); // Submit the collected data
  };

  console.log(initialState)
  console.log(values)

  return (
    <div>
      <span className='font-mont font-bold'>Set Commission charged on services.</span>
      <form className='space-y-4' onSubmit={handleSubmit}>
        {feesData.map((fee, index) => (
          <div key={index} className='grid gap-8 grid-cols-3'>
            <span className='font-mont'>{fee}</span>
            <FormInput
              label="Factor"
              type="select"
              name={`${fee}-factor`} // Unique name for each factor
              value={values[fee]?.factor || ''}
              onChange={handleChange}
              placeholder="Select Type"
              options={[
                { name: 'Figure', value: 'figure' },
                { name: 'Percent', value: 'percent' },
              ]}
              error={errors?.[`${fee}-factor`]}
            />
            <FormInput
              label="Amount"
              type="text"
              name={`${fee}-amount`} // Unique name for each amount
              value={values[fee]?.amount || ''}
              onChange={handleChange}
              placeholder="price"
              error={errors?.[`${fee}-amount`]}
            />
          </div>
        ))}

        <PryButton text="Submit" />
      </form>
    </div>
  );
};

export default FeesPage;
