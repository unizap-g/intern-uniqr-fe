import React from 'react'
import Navbar from './Navbar'
import Dashboard3 from './Dashboard3'
import DisplayData from './DisplayData'
import QrSelect from './QrSelect'
import MonthOption from './MonthOption'
import Dashboard2 from './Dashboard2'
import Dashboard1 from './Dashboard1'
const MainDashboard = () => {
  return (
    <div className="bg-blue-100 w-4/5 min-h-screen p-5">
      <Navbar />
      <div className="flex justify-between items-center w-full">
        <QrSelect />
        <MonthOption />
      </div>
      <div className='mb-5 mt-[-3rem]'>
        <DisplayData />
      </div>
      <Dashboard1 />
      <div className='mb-5'>
        <Dashboard2/>
      </div>
      <Dashboard3 />
    </div>
  )
}

export default MainDashboard