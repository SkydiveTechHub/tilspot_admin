import React, { useState } from 'react'
import useForm from '../../hooks/useForm'
import FormInput from '../../components/shared/FormInput'
import { validator } from '../../utils/methods'
import { Link, useNavigate } from 'react-router-dom'
import { AuthButton } from '../../components/shared/button'
import { AuxAuthText } from '../../components/shared/typograph'
import bg from '../../assets/img/bg1.jpg'
import { CountdownTimer } from '../../utils/tools'
import { AuthLayout2 } from '../../components/authComponents/AuthLayout'
import OTPInput from '../../components/shared/Modals/OTPinput'
import { useDispatch } from 'react-redux'
import { sendOTP } from '../../store/actions'

const OPTpage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [otp, setOtp] = useState("");

    const handleOtpChange = (value) => {
      setOtp(value);
    };

    const handleSubmit = async (e) =>{

            e.preventDefault();
            const params = {
              id: "",
              payload: {otp:otp},
            };
            try {
              const res = await dispatch(sendOTP(params));
              console.log(res);
        
              if (res.payload.statusCode) {
                navigate('/reset-password')
              }
            } catch (error) {
              console.error("Login error:", error);
            }
    }

  
  return (
    <AuthLayout2 backgroundImg={bg} headDesc={'Check your mail for the OTP. Enter it below to securely change your password'} headText={'OTP Verification'} >

        <div className='flex flex-col justify-center items-center space-y-8 font-mont'>

            <OTPInput length={6} onChange={handleOtpChange} />


            <AuthButton handleClick={handleSubmit} inactive={!otp || otp.length<6} value={'Continue'}/>
            <span className='font-mont text-gray'>Didn't get a code, <AuxAuthText text={'Resend'}/></span> 

            {/* <p className='text-center'>Remember Password?<Link to={'/login'}> <AuxAuthText text={'Log in'}/></Link></p> */}

        </div>

    </AuthLayout2>
  )
}

export default OPTpage