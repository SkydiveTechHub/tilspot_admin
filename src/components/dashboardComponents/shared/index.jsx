import { useDispatch } from "react-redux"
import useForm from "../../../hooks/useForm"
import { AuthButton } from "../../shared/button"
import FormInput from "../../shared/FormInput"
import React from 'react';
import { Modal } from 'antd';
import { Link } from "react-router-dom"
import { GrayText } from "../../shared/typograph"



export const DeactivateModal = ({children, title, openModal, handleOk, handleCancel }) => {

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}

      <Modal className='basic-modal deactive' title={title} open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <div className="flex flex-col justify-center items-center gap-6 p-8 ">
            <img src="/images/deactivate.svg" alt="icon" />
            <h2 className="font-mont text-[24px] font-[500]">Deactivate {title}</h2>
            <p className="font-mont text-[14px] font-[400] text-[gray]">Are you sure you want to deactivate this {title}?</p>
            <div className="space-x-6">
                <button className="font-mont text-[16px] font-[400] bg-[#F9F9F9] rounded-lg p-[10px]">Close</button>
                <button className="font-mont text-[16px] font-[400] text-[white] bg-[#F6695E] rounded-lg p-[10px]">Deactivate</button>
            </div>            
        </div>

        {children}
      </Modal>
    </>
  );
};
export const LogoutModal = ({children, title, openModal, handleOk, handleCancel }) => {

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}

      <Modal className='basic-modal deactive' title='' open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <div className="flex flex-col justify-center items-center gap-6 p-8 ">
            {/* <img src="/images/deactivate.svg" alt="icon" /> */}
            <h2 className="font-mont text-[24px] font-[500]">Logout</h2>
            <p className="font-mont text-[14px] font-[400] text-[gray]">Are you sure you want to logout?</p>
            <div className="space-x-6">
                <button className="font-mont text-[16px] w-[150px] font-[400] bg-[#F9F9F9] rounded-lg p-[10px]">Cancel</button>
                <Link to={'/'} className="font-mont text-[16px] w-[150px] font-[400] text-[white] bg-primary rounded-lg p-[10px]">Log Out</Link>
            </div>            
        </div>

        {children}
      </Modal>
    </>
  );
};

export const FundModal = ({ title, openModal, handleOk, handleCancel, btnText }) => {

    const initialState = {
        package:'',
        unit:'',
        amount: '',
    }


    const dispatch = useDispatch()

    const {values, handleChange, resetForm, errors} = useForm(initialState)
    
    const handleSubmit = (e) =>{
        e.preventDefault()

        // console.log(values)
        // dispatch(register(payload))
    }

    const option = [
        {
            name: 'MTN',
            value:'mtn'
        }
    ]

  return (
    <>
      <Modal className='basic-modal' title={title} open={openModal} onOk={handleOk} onCancel={handleCancel}>
      <form onSubmit={handleSubmit} className='flex flex-col w-[90%] lg:w-[70%] space-y-8'>               
                <FormInput
                    label={'Package'}
                    type={'select'}
                    name={'package'} 
                    value={values.package}
                    onChange={handleChange}
                    placeholder={'Doe'}
                    error={errors?.package}
                    options={option}
                />   

            <FormInput
                    label={'Unit'}
                    type={'text'}
                    name={'unit'} 
                    value={values.unit}
                    onChange={handleChange}
                    placeholder={'Enter your unit'}
                    error={errors?.unit}
             />  
            <FormInput
                    label={'Amount'}
                    type={'text'}
                    name={'amount'} 
                    value={values.amount}
                    onChange={handleChange}
                    placeholder={'Enter your amount'}
                    error={errors?.amount}
             />  



            <AuthButton value={btnText}/>

        </form>
      </Modal>
    </>
  );
};

export const searchInput = ({text})=>{
    return(
        <div className="border rounded-lg">
            <input type="text" placeholder={`Search in ${text}`} />
            <button></button>
        </div>
    )
}