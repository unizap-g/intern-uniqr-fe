import React from 'react'
import { Navigate } from 'react-router-dom'

const LoginWrapper = ({children}) => {
    if(localStorage.getItem("uuidApiKey") && localStorage.getItem("uId")){
        return <Navigate to="/dashboard" />
    }
  return <>{children}</>
}

export default LoginWrapper