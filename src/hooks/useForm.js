import { useEffect, useState } from 'react';
import { validator } from '../utils/methods';

const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (eventOrValue, fieldName) => {
    if (typeof eventOrValue === 'object' && eventOrValue.target) {
      // Standard input change (e.g., text, email)
      const { name, value } = eventOrValue.target;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    } else if (fieldName) {
      // Special case for phone input or other components passing value directly
      setValues((prevValues) => ({
        ...prevValues,
        [fieldName]: eventOrValue,
      }));
    }
  };

  useEffect(() => {
    const validationErrors = validator(values);
    setErrors(validationErrors);
  }, [values]);

  const resetForm = () => {
    setValues(initialState);
  };

  return { values, handleChange, resetForm, errors };
};

export default useForm;
