import React from 'react'
import Sidebar from '../components/Sidebar'
import MainDashboard from '../components/MainDashboard'
const Dashboard = () => {
  return (
    <div className='min-h-screen w-full flex '>
      <Sidebar className="w-1/5 border-r border-gray-200" />
      {/* <MainContent /> */}
      <MainDashboard className="w-4/5" />

    </div>
  )
}

export default Dashboard
