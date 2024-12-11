import React, { useState } from 'react';
import { CheckLabel, Label } from './typograph';
import { IoEyeOutline } from "react-icons/io5";
import { FiEyeOff } from "react-icons/fi";
import { DatePicker } from 'antd';
import PhoneInput from 'react-phone-input-2'; // Phone input library
import 'react-phone-input-2/lib/style.css';

const FormInput = ({ disabled, type, name, value, onChange, placeholder, error, label, options }) => {
  let inputElement;

  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [verify, setVerify] = useState(false);

  switch (type) {
    case 'select':
      inputElement = (
        <div className='relative w-full'>
          <Label text={label}/>
          <select
            name={name}
            value={value}
            disabled={disabled}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={() => setShowError(true)}
            className={`py-[12px] px-[12px] border ${error && showError ? 'border-[red]' : 'border-[#CBD5E1]'} rounded-lg outline-none font-mont placeholder:font-mont w-full`}
          >   
            {options?.map((i, id) => (<option key={id} value={i?.value}>{i?.name}</option>))}
          </select>
          {error && showError && <small className="text-[red] font-mont absolute bottom-0 left-0 transform translate-y-5">{error}</small>}
        </div>
      );
      break;

    case 'email':
      inputElement = (
        <div className='relative w-full'>
          <Label text={label}/>
          <input
            type="email"
            disabled={disabled}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={() => setShowError(true)}
            className={`py-[12px] px-[12px] border ${error && showError ? 'border-[red]' : 'border-[#CBD5E1]'} rounded-lg outline-none font-mont placeholder:font-mont w-full`}
          />   
          {/* {error && showError && <small className="text-[red] font-mont absolute bottom-0 left-0 transform translate-y-5">{error}</small>} */}
        </div>
      );
      break;

    case 'date':
      inputElement = (
        <div className='relative w-full'>
          <Label text={label}/>
          <DatePicker className={`py-[12px] px-[12px] border ${error && showError ? 'border-[red]' : 'border-[#CBD5E1]'} rounded-lg outline-none font-mont placeholder:font-mont w-full`} onChange={onChange} />
          {error && showError && <small className="text-[red] font-mont absolute bottom-0 left-0 transform translate-y-5">{error}</small>}
        </div>
      );
      break;

    case 'password':
      inputElement = (
        <div className='w-full '>
          <Label text={label}/>
          <div className={`px-[12px] border bg-white ${error && showError ? 'border-[red]' : 'border-[#CBD5E1]'} rounded-lg outline-none font-mont placeholder:font-mont w-full relative flex items-center`}>
            <input
              type={show ? "text" : "password"}
              name={name}
              disabled={disabled}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className='outline-none w-[95%] py-[12px]'
            />  
            <button className='p-3' onClick={() => setShow(!show)} type='button'>
              {show ? <FiEyeOff/> : <IoEyeOutline/>}
            </button>
          </div>          
        </div>
      );
      break;

    case 'textarea':
      inputElement = (
        <div className='relative w-full'>
          <Label text={label}/>
          <textarea
            name={name}
            value={value}
            disabled={disabled}
            onChange={onChange}
            placeholder={placeholder}
            className={`py-[12px] px-[12px] border ${error && showError ? 'border-[red]' : 'border-[#CBD5E1]'} rounded-lg outline-none font-mont placeholder:font-mont w-full resize-none`}
          />
          {error && showError && <small className="text-[red] font-mont absolute bottom-0 left-0">{error}</small>}
        </div>
      );
      break;

    case 'phone':
      inputElement = (
        <div className='relative w-full'>
          <Label text={label}/>
          <PhoneInput
            country={'ng'}
            value={value}
            onChange={onChange}
            inputProps={{
              name: name,
              disabled: disabled,
              placeholder: placeholder,
            }}
            containerClass={`w-full ${error && showError ? 'border-[red]' : 'border-[#CBD5E1]'} rounded-lg`}
            inputClass='w-full py-[12px] px-[12px] font-mont'
          />
          {error && showError && <small className="text-[red] font-mont absolute bottom-0 left-0">{error}</small>}
        </div>
      );
      break;

    default:
      inputElement = (
        <div className='relative w-full'>
          <Label text={label}/>
          <input
            type="text"
            name={name}
            value={value}
            disabled={disabled}
            onChange={onChange}
            placeholder={placeholder}
            className={`py-[12px] px-[12px] border ${error && showError ? 'border-[red]' : 'border-[#CBD5E1]'} rounded-lg outline-none font-mont placeholder:font-mont w-full`}
          />     
          {error && showError && <small className='text-[red] font-mont absolute bottom-[-20px] left-0'>{error}</small>}
        </div>
      );
  }

  return inputElement;
};

export default FormInput;
