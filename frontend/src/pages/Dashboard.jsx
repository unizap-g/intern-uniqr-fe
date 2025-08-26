import React from 'react'

const Dashboard = () => {
  return (
    <div className='min-h-screen w-full flex '>
        <LeftSide className="w-1/5 border-r border-gray-200" />
        <RightSide className="w-4/5" />
        <div className='w-4/5'>
            <div className='w-full'></div>
        </div>

    </div>
  )
}

export default Dashboard