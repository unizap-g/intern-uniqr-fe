import React from 'react'
import {TabletSmartphone } from 'lucide-react'
const Inputcomp = ({Icon, type,value,onchange,placeholder,LastIcon=null,toggleEye}) => {
  return (
   <div className=' w-full gap-2 items-center bg-gray-50 border px-4 py-3 mt-2 mb-2 border-gray-200 rounded-md flex justify-center '>
   {Icon}
    <input  value={value} onChange={onchange} type={type} className='bg-transparent outline-none border-none w-full' placeholder={placeholder} />
   <div onClick={toggleEye}>
    {LastIcon}
   </div>
   </div>
  )
}

export default Inputcomp