import React, { useEffect, useState } from 'react';
import useForm from '../../../hooks/useForm';
import FormInput from '../../../components/shared/FormInput';
import { PryButton } from '../../../components/shared/button';
import { useDispatch, useSelector } from 'react-redux';
import { checkCategory } from '../../../store/reducers/providerSlice';

const FeesPage = () => {
  const dispatch = useDispatch();
  const feesData = ['Airtime', 'Internet', 'Government', 'Gas', 'Waste', 'Transport', 'Football', 'Cable', 'Parking', 'Housing', 'Electricity'];
  const { categories } = useSelector((state) => state.providers);
  const [initialState, setInitialState] = useState({});

  useEffect(() => {
    if (categories) {
      const state = feesData.reduce((acc, fee) => {
        const cat = categories.find((i) => i.name === fee);
        acc[fee] = { factor: cat?.processing_fee_type || '', amount: cat?.processing_fee || '' };
        return acc;
      }, {});
      setInitialState(state);
    } else {
      dispatch(checkCategory())
      const state = feesData.reduce((acc, fee) => {
        acc[fee] = { factor: '', amount: '' };
        return acc;
      }, {});
      setInitialState(state);
    }
  }, [categories]);


  const { values, handleChange, resetForm, errors } = useForm(initialState, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values); 
  };

  return (
    <div>
      <span className='font-mont font-bold'>Set Commission charged on services.</span>
      <form className='space-y-4' onSubmit={handleSubmit}>
        {feesData.map((fee, index) => (
          <div key={index} className='grid gap-4 md:gap-8 grid-cols-3'>
            <span className='font-mont'>{fee}</span>
            <FormInput
              label="Factor"
              type="select"
              name={`${fee}-factor`} // Unique name for each factor
              value={values[fee]?.factor || ''}
              onChange={handleChange}
              placeholder="Select Type"
              options={[
                { name: 'Fixed Amount', value: 'fixedAmount' },
                { name: 'Percent', value: 'percentage' },
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
