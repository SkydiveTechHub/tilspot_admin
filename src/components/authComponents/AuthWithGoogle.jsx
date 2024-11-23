import React from 'react'

const SignWithGoogle = ({text, action}) => {
  return (
    <div>
      <button className='font-mont border-[0.8px] py-2 bg-white text-[#AEABAB] border-[#AEABAB] w-full rounded-lg '><img className='inline-flex pr-3' src="/images/Google.png" alt="" />{text} with Google</button>
    </div>
  )
}

export default SignWithGoogle
