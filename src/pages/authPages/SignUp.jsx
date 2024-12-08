import React from 'react'
import {AuthLayout} from '../../components/authComponents/AuthLayout'
import useForm from '../../hooks/useForm'
import FormInput from '../../components/shared/FormInput'
import { validator } from '../../utils/methods'
import { Link, useNavigate } from 'react-router-dom'
import { AuthButton } from '../../components/shared/button'
import { AuxAuthText, GrayText } from '../../components/shared/typograph'
import bg from '../../assets/img/bg1.jpg'
import { useDispatch } from 'react-redux'
import { register } from '../../store/actions/authAction'
import SignWithGoogle from '../../components/authComponents/AuthWithGoogle'
import SignWithApple from '../../components/authComponents/AuthWithApple'
import SignWithFacebook from '../../components/authComponents/AuthWithFacebook'

const initialState = {
    firstName:'',
    lastName:'',
    email: '',
    password: '',
    c_password: ''
}

const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {values, handleChange, resetForm, errors} = useForm(initialState)
    
    const handleSubmit = (e) =>{
        e.preventDefault()

        navigate('/dashboard')
    }

    console.log(errors)

    const rule = ['Must contain more than 8 characters', 'Must contain a letter', 'Must contain a number']

  return (
    <AuthLayout backgroundImg={bg} headDesc={''} headText={'Create your Account'} >
        <span className='font-mont text-gray block text-center'>Already have an account, <Link to={'/login'}><AuxAuthText text={'Login'}/></Link></span>

        <form onSubmit={handleSubmit} className='flex flex-col w-full space-y-4 md:space-y-8 mt-6 lg:mt-16'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 w-full'>
                <FormInput
                    label={'First name'}
                    type={'text'}
                    name={'firstName'} 
                    value={values.firstName}
                    onChange={handleChange}
                    placeholder={'John'}
                    error={errors?.firstName}
                />                
                <FormInput
                    label={'Last name'}
                    type={'text'}
                    name={'lastName'} 
                    value={values.lastName}
                    onChange={handleChange}
                    placeholder={'Doe'}
                    error={errors?.lastName}
                />                
                <FormInput
                        label={'Email'}
                        type={'email'}
                        name={'email'} 
                        value={values.email}
                        onChange={handleChange}
                        placeholder={'Enter your username'}
                        error={errors?.email}
                />            
                <FormInput
                        label={'Phone'}
                        type={'phone'}
                        name={'phone'} 
                        value={values.phone}
                        onChange={handleChange}
                        placeholder={'Enter your phone'}
                        error={errors?.phone}
                />            
            {/* </div>
            <div className='flex flex-col md:flex-row items-center gap-3 w-full'> */}
                <FormInput
                    label={'Password'}
                    type={'password'}
                    name={'password'} 
                    value={values.password}
                    onChange={handleChange}
                    placeholder={'Enter your password'}
                    error={errors?.password}
                />
                <FormInput
                    label={'Confirm Password'}
                    type={'password'}
                    name={'c_password'} 
                    value={values.c_password}
                    onChange={handleChange}
                    placeholder={'Confirm your password'}
                    error={errors?.c_passwordemail}
                />           
            </div>

            <ul>
                {
                    rule.map((i, id)=> <li className='font-mont text-[12px]' key={id}><span className='text-[red] '>*</span> {i}</li>)
                }
            </ul>

            <div className='flex items-center gap-2'>
                <input type="checkbox" />
                <p className='font-[400] text-[14px] font-mont'>Creating an account means you’re okay with our <Link to={'/forgot-password'}><AuxAuthText text={'Terms of Service'}/> </Link> & <Link to={'/'}><AuxAuthText text={'Privacy Policy'}/> </Link>.</p>
            </div>
            
            

            <AuthButton value={'Create Account'}/>

            {/* <p className='text-center font-mont'>Already have an account? <Link to={'/login'}> <AuxAuthText text={'Click here to login'}/></Link></p> */}

        </form>

        <div  className='w-full mt-10'>
            <div className='md:w-[70%] space-y-6  mx-auto'>
                <div className='flex justify-between items-center'>
                    <div className='bg-[#AEABAB] w-[45%] h-[0.8px]'></div>
                    <GrayText text={'Or'}/>
                    <div className='bg-[#AEABAB] w-[45%] h-[0.8px]'></div>
                </div>
                <SignWithGoogle text={'Sign Up'}/>
                <SignWithApple text={'Sign Up'}/>
                <SignWithFacebook text={'Sign Up'}/>                
            </div>


        </div>

    </AuthLayout>
  )
}

export default Register