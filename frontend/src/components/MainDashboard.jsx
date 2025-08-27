import React from 'react'
import Navbar from './Navbar'
import Dashboard3 from './Dashboard3'
import DisplayData from './DisplayData'
import QrSelect from './QrSelect'
import MonthOption from './MonthOption'
import Dashboard1 from './Dashboard1'
const MainDashboard = () => {
  return (
    <div className="bg-blue-100 w-4/5 h-screen p-5">
      <Navbar />
      <div className="flex justify-between items-center gap-4 w-full">
        <QrSelect />
        <MonthOption />
      </div>
      <div className='mt-5 mb-5'>
        <DisplayData />
      </div>
      <Dashboard1/>
      <Dashboard3 />
    </div>
  )
}

export default MainDashboard
