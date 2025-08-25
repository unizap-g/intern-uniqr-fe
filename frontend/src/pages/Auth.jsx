import React,{useState} from 'react'
import Banner from '../components/Banner'
import LoginComp from '../components/LoginComp'
import SignupComp from '../components/SignupComp'
import { AuthContext } from '../context/AuthContext'
import Login from '../components/Login'
import { useAuth } from '../context/AuthContext'
const Auth = () => {
  const [activeComp,setActiveComp]=useState('login')
  console.log(activeComp);
  return (
    // const []
    <AuthContext.Provider value={{ activeComp, setActiveComp }}>
      <div className='flex w-full h-screen'>
        {/* <LoginComp /> */}
        {/* <SignupComp/> */}
        {activeComp === "login" && <Login />}
        {activeComp === "signup" && <SignupComp />}
        <Banner />
      </div>
    </AuthContext.Provider>
  )
}


export default Auth