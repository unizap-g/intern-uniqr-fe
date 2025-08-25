import React from 'react'
import Banner from '../components/Banner'
import LoginComp from '../components/LoginComp'
const Auth = () => {
  return (
    <>
      <div className='flex w-full h-screen'>
        <LoginComp />
        <Banner />
      </div>
    </>
  )
}

export default Auth