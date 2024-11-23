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

const initialState = {
    email: ''
}

const ForgotPassword = () => {

    const navigate = useNavigate()
    const {values, handleChange, resetForm, errors} = useForm(initialState)

    const [disable, setDisable] = useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault()
        setDisable(true)
        navigate('/otp')
    }


  return (
    <AuthLayout2 backgroundImg={bg} headDesc={'Enter the email address associated with your account and we will send you a link to reset your password'} headText={'Forgot Password'} >

        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center space-y-8 font-mont'>
            <FormInput
                label={'Email Address'}
                type={'email'}
                name={'email'} 
                value={values.email}
                onChange={handleChange}
                placeholder={'Enter your email'}
                error={errors?.email}
            />

            <AuthButton inactive={disable} value={disable?'Resend Rest Link':'Send Reset OTP'}/>


            <Link to={'/login'}> <AuxAuthText text={'Return to Login'}/></Link>

        </form>

    </AuthLayout2>
  )
}

export default ForgotPassword