import React from 'react'
import Banner from '../components/Banner'
import LoginComp from '../components/LoginComp'
import SignupComp from '../components/SignupComp'
const Auth = () => {
  return (
    <>
      <div className='flex w-full h-screen'>
        {/* <LoginComp /> */}
        <SignupComp/>
        <Banner />
      </div>
    </>
  )
}

export default Auth