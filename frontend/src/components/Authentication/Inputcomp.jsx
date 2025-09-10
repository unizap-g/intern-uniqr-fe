import React from 'react'
import {TabletSmartphone } from 'lucide-react';
// import { getCountryCallingCode } from 'libphonenumber-js';
// const countryCode = Intl.DateTimeFormat().resolvedOptions().locale.split("-")[1]; 

// const callingCode = getCountryCallingCode(countryCode);
// console.log(countryCode);

const Inputcomp = ({iscountrycode,isRequired,Icon, type,value,onchange,placeholder,LastIcon=null,toggleEye}) => {


  const callingCode='+91'
  return (
   <div className=' w-full gap-2 items-center bg-gray-50 border px-4 py-3 mt-4 mb-0 border-gray-200 rounded-md flex justify-center '>
   {Icon}
   {iscountrycode && <span>{callingCode}</span>}
    <input required={isRequired}  value={value} onChange={onchange} type={type} className='bg-transparent outline-none border-none w-full' placeholder={placeholder} />
   <div onClick={toggleEye}>
    {LastIcon}
   </div>
   </div>
  )
}

export default Inputcomp