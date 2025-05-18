import React, { useEffect, useState } from 'react';
import useForm from '../../../hooks/useForm';
import FormInput from '../../../components/shared/FormInput';
import { PryButton } from '../../../components/shared/button';
import { useDispatch, useSelector } from 'react-redux';
import { checkCategory } from '../../../store/reducers/providerSlice';
import { getAllCategories, setFees } from '../../../store/actions';
import { toast } from 'react-toastify';

const FeesPage = () => {
  const dispatch = useDispatch();
  const feesData = ['Airtime', 'Internet', 'Government', 'Gas', 'Waste', 'Transport', 'Football Tickets', 'Cable TV', 'Parking', 'Housing', 'Electricity'];
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values); 

    const params ={
      processing_fees: Object.values(values).map(item => Number(item.amount)),
      processing_fee_types: Object.values(values).map(item => item.factor),
      categoryIds: categories.map((i)=>i._id)
    }

    try {
      const res = await dispatch(setFees(params));
      if(res.payload.message === 'Successfully set processing fees for multiple categories.'){
        dispatch(getAllCategories())
        toast.success('Successfully set processing fees')
      }else{
        toast.error('Processing Fees cannot be set successfully')
      }
    } catch (error) {
      toast.error('Something went wrong !')
      console.log(error)
    }

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
                { name: 'Select Type', value: '' },
                { name: 'Fixed Amount', value: 'fixedAmount' },
                { name: 'Percent', value: 'percentage' },
              ]}
              error={errors?.[`${fee}-factor`]}
            />
            <FormInput
              label="Amount"
              type="number"
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
