import React from 'react'
import Navbar from './Navbar'
import Dashboard3 from './Dashboard3'
import DisplayData from './DisplayData'

const MainDashboard = () => {
  return (
    <div className="bg-blue-100 w-4/5 h-screen p-5">
      <Navbar />
      <div className='mt-5 mb-5'>
        <DisplayData />
      </div>
      <Dashboard3 />
    </div>
  )
}

export default MainDashboard