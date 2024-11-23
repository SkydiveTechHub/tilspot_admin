import React from 'react'

const SignWithFacebook = ({text, action}) => {
  return (
    <div>
      <button className='font-mont border-[0.8px] bg-white text-[#AEABAB] py-2 border-[#AEABAB] w-full rounded-lg '><img className='inline-flex pr-3' src="/images/facebook.png" alt="" />{text} with Facebook</button>
    </div>
  )
}

export default SignWithFacebook
