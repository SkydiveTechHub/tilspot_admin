import React from 'react'
import useForm from '../../hooks/useForm'
import FormInput from '../../components/shared/FormInput'
import { Link, useNavigate } from 'react-router-dom'
import { AuthButton } from '../../components/shared/button'
import { AuxAuthText, GrayText } from '../../components/shared/typograph'
import bg from '../../assets/img/bg1.jpg'
import { AuthLayout3 } from '../../components/authComponents/AuthLayout'
import { useDispatch } from 'react-redux'
import { login } from '../../store/actions'

const initialState = {
    email: '',
    password: ''
}

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const {values, handleChange, resetForm, errors} = useForm(initialState)
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const params = {
            email: values.email,
            password:values.password
        }
        try {
            const res = await dispatch(login(params))
            console.log(res)
            if(res.payload.statusCode){
                setTimeout(()=>{
                    navigate('/dashboard')
                }, 200)
                  
            }
                      
        } catch (error) {
            
        }

    }


  return (
    <AuthLayout3 backgroundImg={bg} headDesc={''} headText={'Login'} >
        {/* <span className='font-mont block text-center text-gray'>Don't have an account, <Link to={'/register'}><AuxAuthText text={'Create Account'}/></Link></span> */}

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
                error={errors?.password}
            />

            <Link to={'/forgot-password'}><AuxAuthText text={'Forgot Password?'}/> </Link>

            <AuthButton inactive={Object.keys(errors).length !== 0 && true } handleClick={handleSubmit} value={'Login'}/>

            

        </form>


    </AuthLayout3>
  )
}


export default Login