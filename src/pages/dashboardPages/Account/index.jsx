import React, { useState } from 'react'
import { BlackText, GrayText } from '../../../components/shared/typograph'
import FormInput from '../../../components/shared/FormInput'
import { Switch } from 'antd'
import PersonalInfoModal from '../../../components/shared/Modals/EditAccountModal'
import PasswordChangeModal from '../../../components/shared/Modals/PasswordChangeModal'
import UserImageUpload from '../../../components/shared/UserImageUpload'

const AccountPage = () => {
    const [profileOpen,setProfileOpen] = useState()
    const [passwordOpen,setPasswordOpen] = useState()
    const [imageUrl, setImageUrl] = useState("/images/user.png");    
    const Box = ({children})=>(
        <div className='p-6 rounded-xl shadow-lg bg-white space-y-6'>
            {children}
        </div>
    )

    const handleImageUpload = (url) => {
      setImageUrl(url);
    };
  return (
    <>
        <PersonalInfoModal
            openModal={profileOpen}
            handleCancel={()=>setProfileOpen(false)}
            handleOk={()=>setProfileOpen(false)}
        />
        <PasswordChangeModal
            openModal={passwordOpen}
            handleCancel={()=>setPasswordOpen(false)}
            handleOk={()=>setPasswordOpen(false)}
        />
        <div className='space-y-8'>
            <Box>
                <div className='w-full flex justify-between items-center'>
                    <BlackText style={'font-bold'} text={'Profile Picture'}/>
                    
                </div>


                <div className='w-full flex justify-between items-center'>
                    <div>
                        <img className='w-[100px] rounded-full' src={imageUrl} alt="user image" />
                    </div>
                    <div>
                        <UserImageUpload  onImageUpload={handleImageUpload}/>
                        <GrayText style={'block text-[14px] text-center'} text={'Maximum size - 2MB'}/>
                        <GrayText style={'block text-[14px] text-center'} text={'JPEG or PNG format'}/>
                    </div>
                        

                </div>

            </Box>
            <Box>
                <div className='w-full flex justify-between items-center'>
                    <BlackText style={'font-bold'} text={'Personal Information'}/>

                    <button onClick={()=>setProfileOpen(true)} className='rounded-md px-6 py-2 bg-transparent border font-mont border-primary text-primary font-semibold flex '>
                        Edit
                    </button>
                    
                </div>
                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <FormInput
                        label={'First name'}
                        type={'text'}
                        name={'firstName'} 
                        value={''}
                        placeholder={'John'}
                        disabled
                    />                
                    <FormInput
                        label={'Last name'}
                        type={'text'}
                        name={'lastName'} 
                        value={''}
                        placeholder={'Doe'}
                        disabled={true}
                    />
                    <FormInput
                            label={'Email'}
                            type={'email'}
                            name={'email'} 
                            value={''}
                            placeholder={'Enter your username'}
                            disabled={true}
                    />            
                    <FormInput
                            label={'Phone'}
                            type={'phone'}
                            name={'phone'} 
                            value={''}
                            placeholder={'Enter your username'}
                            disabled={true}
                    />            
                </div>
                    <FormInput
                            label={'Address'}
                            type={'textarea'}
                            name={'address'} 
                            value={''}
                            placeholder={'Enter your address'}
                            disabled={true}
                    /> 

            </Box>
            <Box>
                <div className='w-full flex justify-between items-center'>
                    <BlackText style={'font-bold'} text={'Security Settings'}/>

                        <button onClick={()=>setPasswordOpen(true)} className="md:hidden btn-primary font-mont float-end text-primary underline" >
                            Change Password
                        </button>
                </div>

                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <FormInput
                        label={'Password'}
                        type={'password'}
                        name={''} 
                        value={''}
                        disabled={true}
                    />    
                    <div className='w-full'>
                        <button onClick={()=>setPasswordOpen(true)} className="hidden md:block btn-primary font-mont float-end text-primary underline">
                            Change Password
                        </button>
                    </div>            
            
                </div>

                <div className='w-full mt-6'>

                    <BlackText style={'font-[500]'} text={'Auto Login'}/>
                    <div className='flex justify-between items-center w-full'>
                        <GrayText style={''} text={'Automatically log in to your account'}/>
                        <Switch/>
                    </div>
                    



                </div>

            </Box>

        
        </div>    
    </>

  )
}

export default AccountPage
