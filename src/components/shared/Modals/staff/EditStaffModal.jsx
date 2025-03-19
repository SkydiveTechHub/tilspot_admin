import React, { useEffect, useState } from 'react';
import FormInput from '../../FormInput';
import { AuthButton } from '../../button';
import useForm from '../../../../hooks/useForm';
import { Modal } from 'antd';
import ConfirmModal from '../ConfirmModal';
import { AuxAuthText, GrayText } from '../../typograph';
import SuccessModal from '../SuccessModal';
import { editStaff, forgotPassword, getAllStaffs, resetPassword, sendOTP } from '../../../../store/actions';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import OTPInput from '../OTPinput';
// import SelectPlanModal from '../SelectPlanModal';



const EditStaffModal = ({ userData, openModal, handleOk, handleCancel }) => {
  const dispatch = useDispatch()
  const [active, setActive] = useState(false);
  const [more, setMore] = useState(false);
  const [canReset, setCanReset] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const { role } = useSelector((state) => state.auth);
  const initialState = {
    lname: userData?.last_name || "",
    fname: userData?.first_name || "",
  };
  const passInitialState = {
    password:  "",
    c_password: "",
  };

  const { values, handleChange, resetForm, errors } = useForm(initialState);
  const { values:passvalue, handleChange:passChange, resetForm:resetPassform, errors:passError } = useForm(passInitialState);

  useEffect(() => {
    resetForm(initialState); // Reset form when userData changes
  }, [userData]);


      const [otp, setOtp] = useState("");
  
      const handleOtpChange = (value) => {
        setOtp(value);
      };
  
      const handleVerifydOtp = async (e) =>{
  
              e.preventDefault();
              const params = {
                // id: user.id,
                payload: {otp:otp},
              };
              try {
                const res = await dispatch(sendOTP(params));          
                if (res.payload.statusCode) {
                  setCanReset(true)
                }
              } catch (error) {
                console.error("Login error:", error);
              }
      }

       
          const handleSendOtp = async () =>{
            try {
              const res = await dispatch(forgotPassword({email:user?.email}))
      
              if (res.payload.statusCode){
                setMore(true)
              }else{
                toast.error('OTP was not sent successfully')
              }
            } catch (error) {
              toast.error('Something went wrong')
            }
        
          }
  

              const handleResetPassword = async (e) =>{
          
                      e.preventDefault();
                      const params = {
                        id: userData._id,
                        payload: {newPassword:passvalue.password},
                      };
                      try {
                        const res = await dispatch(resetPassword(params));
                        console.log(res);
                  
                        if (res.payload.statusCode) {
                          resetPassform()
                          toast.success('Password Updated successfully')
                          setMore(false)
                        }else{
                          toast.error('Password Updated unsuccessfully')
                        }
                      } catch (error) {
                        console.error("Login error:", error);
                        toast.error('Something went wrong')
                        setMore(false)
                      }
              }

  const handleSubmit =async (e) => {
    e.preventDefault();
    const payload={
      id:userData._id || userData.id,
      params:{
      first_name: values.fname,
      last_name: values.lname,
    }}
    try {
      const res = await dispatch(editStaff(payload))
      if(res.payload.statusCode){
        if(canReset){
          handleResetPassword(e)
        }
        handleOk();
        setSecondModalOpen(true)
        resetForm();
        setMore(false)
        dispatch(getAllStaffs())
        
      }else{
        toast.error(res.payload.message)
        handleCancel()
      }
    } catch (error) {
      toast.error('Something went wrong')
      resetForm();
      handleCancel()
    }
    
  };

  const validate = () => {
    setActive(errors.first_name !== '');
  };

  useEffect(() => {
    validate();
  }, [values]); // Re-run validation when `values` change

  return (
    <>
      <SuccessModal
        title={'Profile has been updated Successfully'}
        openModal={secondModalOpen}
        handleContinue={()=>setSecondModalOpen(false)}
        handleCancel={()=>setSecondModalOpen(false)}
        handleOk={()=>setSecondModalOpen(false)}
      />
      <Modal
        className="basic-modal"
        title={'Edit Staff'}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className='mt-6 space-y-6' onSubmit={handleSubmit}>
          <FormInput
            label="First Name"
            type="text"
            name="fname"
            value={values.fname}
            onChange={handleChange}
            placeholder="Enter First Name"
            error={errors?.fname}
  
          />
          <FormInput
            label="Last Name"
            type="text"
            name="lname"
            value={values.lname}
            onChange={handleChange}
            placeholder="Enter Last name"
            error={errors?.lname}
  
          />

          {
            role === 'admin' &&
            <div className='bg-[#f4f4f4] p-4'>
              <div className='flex justify-end'>
                {!canReset &&
                  <>
                    {
                      more?  <span className='font-mont italic text-gray text-[12px]'>Didn't get a code, <AuxAuthText text={'Resend'}/></span> :
                      <button className='italic text-primary text-[12px] p-2' onClick={()=>{handleSendOtp()}} type='button'>Reset Staff Password</button>
                    }              
                  </>
                }

                
              </div>

              {
                more && <>
                    <div className=' font-mont'>
                    {
                      !canReset &&
                      <div className='flex justify-center items-center gap-4 px-4 md:px-8'>
                        <OTPInput length={4} onChange={handleOtpChange} />
                        <button type='button' className='p-3 text-green-500 italic' onClick={handleVerifydOtp} disabled={!otp || otp.length<4}>Verify</button>                    
                      </div>                    
                    }


                      {
                        canReset &&
                        <>
                            <FormInput
                              label="New Password"
                              type="password"
                              name="password"
                              value={passvalue.password}
                              onChange={passChange}
                              placeholder="Enter email"
                              error={passError?.password}
                    
                            />
                            <FormInput
                              label="Confirm New Password"
                              type="password"
                              name="c_pasword"
                              value={passvalue.c_pasword}
                              onChange={passChange}
                              placeholder="Enter email"
                              error={passError?.c_pasword}
                    
                            />
                        </>
                      }

                    </div>
                </>
              }
                          
            </div>

          }



          {/* <FormInput
            label="Email Address"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter email"
            error={errors?.email}
  
          /> */}

          {/* <FormInput
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter email"
            error={errors?.password}
  
          />
          <FormInput
            label="Confirm Password"
            type="password"
            name="c_pasword"
            value={values.c_pasword}
            onChange={handleChange}
            placeholder="Enter email"
            error={errors?.c_pasword}
  
          /> */}

          <AuthButton inactive={!active} value="Edit Staff" />
        </form>
      </Modal>    
    </>

  );
};

export default EditStaffModal;
