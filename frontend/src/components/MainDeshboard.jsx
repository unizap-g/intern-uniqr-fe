import React from 'react'
import Navbar from './Navbar'
import Dashboard3 from './Dashboard3'
import DisplayData from './DisplayData'
import QrSelect from './QrSelect'
import MonthOption from './MonthOption'
const MainDashboard = () => {
  return (
    <div className="bg-blue-50 w-4/5 h-[200vh]">
      <Navbar />
      <div className='p-8'>
        <div className="flex justify-between items-center w-full">
        <QrSelect />
        <MonthOption />
      </div>
      <div className='mt-8 mb-8'>
        <DisplayData />
      </div>
      <Dashboard3 />
      </div>
    </div>
  )
}

export default MainDashboard