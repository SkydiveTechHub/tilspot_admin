import React from 'react'
import useForm from '../../hooks/useForm'
import FormInput from '../../components/shared/FormInput'
import { validator } from '../../utils/methods'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AuthButton } from '../../components/shared/button'
import { AuxAuthText } from '../../components/shared/typograph'
import bg from '../../assets/img/bg1.jpg'
import { CountdownTimer } from '../../utils/tools'
import { AuthLayout2 } from '../../components/authComponents/AuthLayout'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../../store/actions'

const initialState = {
    password: '',
    c_password:''
}

const ResetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
        const params = useParams()
        const {id} = params

    const {values, handleChange, resetForm, errors} = useForm(initialState)

    const handleSubmit = async (e) =>{

            e.preventDefault();
            const params = {
              id: id,
              payload: {newPassword:values.password},
            };
            try {
              const res = await dispatch(resetPassword(params));
              console.log(res);
        
              if (res.payload.statusCode) {
                navigate('/login')
              }
            } catch (error) {
              console.error("Login error:", error);
            }
    }


  return (
    <AuthLayout2 backgroundImg={bg} headDesc={'Create a new password to secure your account'} headText={'Reset Password'} >

        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center space-y-8 font-mont'>
            <FormInput
                type={'password'}
                name={'password'} 
                label={'New Password'}
                value={values.password}
                onChange={handleChange}
                placeholder={'Enter your password'}
            />
            <FormInput
                type={'password'}
                name={'c_password'} 
                label={'Confirm Password'}
                value={values.c_password}
                onChange={handleChange}
                placeholder={'Confirm password'}
            />
            <AuthButton inactive={errors.c_password || errors.password} value={'Change Password'}/>
            <Link to={'/login'}> <AuxAuthText text={'Return to Login'}/></Link>

            {/* <p className='text-center'>Remember Password?<Link to={'/login'}> <AuxAuthText text={'Log in'}/></Link></p> */}

        </form>

    </AuthLayout2>
  )
}

export default ResetPassword