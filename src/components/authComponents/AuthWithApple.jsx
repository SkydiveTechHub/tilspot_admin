import React from 'react'

const SignWithApple = ({text, action}) => {
  return (
    <div>
      <button className='font-mont border-[0.8px] bg-white text-[#AEABAB] py-2 border-[#AEABAB] w-full rounded-lg '><img className='inline-flex pr-3' src="/images/apple.png" alt="" />{text} with Apple</button>
    </div>
  )
}

export default SignWithApple
