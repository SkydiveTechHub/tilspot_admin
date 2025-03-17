import React from 'react'

export const AuthLayout = ({children, backgroundImg, headText, headDesc}) => {
  const bg = '/images/auth.png'
  return (
    <div className='flex justify-normal items-center min-h-[100vh] w-full relative'>

        <div style={{backgroundImage: `url(${bg})`}} className='bg-cover bg-center bg-no-repeat w-full md:w-[40%] p-6 h-screen'>
            <img src="/images/Logo.png"  className='w-[150px]' alt="" />
            
        </div>
        <div className='w-full md:w-[60%] px-6 md:px-12 max-h-screen pt-[5rem] pb-20 overflow-y-scroll absolute lg:relative  backdrop-blur-lg'>
          
            <div className=''>
                <h1 className='font-[500] text-[24px] md:text-[32px] text-black font-mont text-center'>{headText}</h1>
                <p className='text-[#333333] font-[400] text-[14px] font-mont text-center'>{headDesc}</p>
            </div>
            {children}
        </div>

    </div>
  )
}
export const AuthLayout2 = ({children, headText, headDesc}) => {

  return (
    <div className='flex justify-normal items-center min-h-[100vh] w-full relative'>

        <div  className='w-[60%] lg:w-[30%] p-6 h-screen'>
            <img src="/images/Logo.png"  className='w-[150px]' alt="" />
            
        </div>
        <div style={{backgroundImage: `url(/images/padlock.png)`}} className='bg-cover h-screen bg-center bg-no-repeat w-[70%] px-20'>


        </div>
        <div className='absolute inset-0 flex justify-center items-center '>
          <div className=' space-y-8 bg-white shadow-lg rounded-lg p-8 w-[80%] md:w-[50%]'>
              <div className='flex flex-col justify-center items-center'>
                  <h1 className='font-[700] text-[32px] text-black font-mont text-center'>{headText}</h1>
                  <p className='text-[#333333] w-[70%] font-[400] text-[14px] font-mont text-center'>{headDesc}</p>
              </div>
              {children}
          </div>
        </div>

    </div>
  )
}
export const AuthLayout3 = ({children, backgroundImg, headText, headDesc}) => {
  const bg = '/images/authbg.jpeg'
  return (
    <div className='h-screen min-h-screen w-full'>

            <img src="/images/Logo.png"  className='w-[150px]' alt="" />
        <div className='flex justify-center items-center h-full w-full pb-10'>
          <div className='px-6 md:px-10 shadow-2xl rounded-lg py-8 w-[95%] md:w-[50%] space-y-6'>
            <div className=''>
                  <h1 className='font-[500] text-[32px] text-black font-mont text-center leading-4'>{headText}</h1>
                  <p className='text-[#333333] font-[400] text-[14px] font-mont text-center'>{headDesc}</p>
              </div>
              {children}
          </div>          
        </div>



    </div>
  )
}
