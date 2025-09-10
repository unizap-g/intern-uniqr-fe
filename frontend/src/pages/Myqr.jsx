import React from 'react'
import CreateQr from '../components/MyQr/CreateQr.jsx';
import Sidebar from "../components/Sidebar/Sidebar.jsx";

const Myqr = () => {
  return (
    <div className="min-h-screen w-full flex bg-blue-50 ">
        <Sidebar />
        {/* <MainContent /> */}
        <div className='w-4/5 bg-blue-100 h-screen flex flex-col'>
            {/* <Navbar /> */}
            <div className='sticky top-0 w-full h-20 bg-pink-400'>

            </div>
            <div className='flex-1 overflow-auto'>
              <CreateQr />
                {/* <ViewQR /> */}
            </div>
        </div>

      </div>
  )
}

export default Myqr;