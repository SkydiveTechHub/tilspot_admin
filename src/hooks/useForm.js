import { useEffect, useState } from 'react';
import { validator } from '../utils/methods';

const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (eventOrValue, fieldName) => {
    if (typeof eventOrValue === 'object' && eventOrValue.target) {
      const { name, value } = eventOrValue.target;

      // Check for nested field syntax, e.g., "Airtime-factor"
      if (name.includes('-')) {
        const [key, subKey] = name.split('-');
        setValues((prevValues) => ({
          ...prevValues,
          [key]: {
            ...prevValues[key],
            [subKey]: value,
          },
        }));
      } else {
        // Standard input change
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      }
    } else if (fieldName) {
      // Special case for direct value input (e.g., phone input)
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
