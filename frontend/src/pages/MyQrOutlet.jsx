import React from 'react'
import { Outlet } from 'react-router-dom'
const MyQrOutlet = () => {
  return (
    <div className='h-full w-full'>
      <Outlet />
    </div>
  )
}

export default MyQrOutlet