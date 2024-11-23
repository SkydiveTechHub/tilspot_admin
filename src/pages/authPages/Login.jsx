import React from 'react'
import useForm from '../../hooks/useForm'
import FormInput from '../../components/shared/FormInput'
import { validator } from '../../utils/methods'
import { Link, useNavigate } from 'react-router-dom'
import { AuthButton } from '../../components/shared/button'
import { AuxAuthText, GrayText } from '../../components/shared/typograph'
import bg from '../../assets/img/bg1.jpg'
import { AuthLayout3 } from '../../components/authComponents/AuthLayout'
import SignWithGoogle from '../../components/authComponents/AuthWithGoogle'
import SignWithApple from '../../components/authComponents/AuthWithApple'
import SignWithFacebook from '../../components/authComponents/AuthWithFacebook'

const initialState = {
    email: '',
    password: ''
}

const Login = () => {
    const navigate = useNavigate()


    const {values, handleChange, resetForm, errors} = useForm(initialState)
    const handleSubmit = () =>{
        navigate('/dashboard')
    }


  return (
    <AuthLayout3 backgroundImg={bg} headDesc={''} headText={'Login'} >
        <span className='font-mont block text-center text-gray'>Don't have an account, <Link to={'/register'}><AuxAuthText text={'Create Account'}/></Link></span>

        <form onSubmit={handleSubmit} className='flex flex-col space-y-4 md:space-y-8'>
            <FormInput
                label={'Email'}
                type={'email'}
                name={'email'} 
                value={values.username}
                onChange={handleChange}
                placeholder={'Enter your username'}
                error={errors?.email}
            />
            <FormInput
                label={'Password'}
                type={'password'}
                name={'password'}
                value={values.password}
                onChange={handleChange}
                placeholder={'Enter your password'}
                error={errors?.email}
            />

            <Link to={'/forgot-password'}><AuxAuthText text={'Forgot Password?'}/> </Link>

            <AuthButton value={'Login'}/>

            

        </form>
        <div  className='w-full mt-10'>
            <div className='md:w-[70%] space-y-4 md:space-y-6  mx-auto'>
                <div className='flex justify-between items-center'>
                    <div className='bg-[#AEABAB] w-[45%] h-[0.8px]'></div>
                    <GrayText text={'Or'}/>
                    <div className='bg-[#AEABAB] w-[45%] h-[0.8px]'></div>
                </div>
                <SignWithGoogle text={'Log in'}/>
                <SignWithApple text={'Log in'}/>
                <SignWithFacebook text={'Log in'}/>                
            </div>


        </div>

    </AuthLayout3>
  )
}


export default Login