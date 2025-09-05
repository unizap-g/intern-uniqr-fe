import React from 'react'
import { Globe } from 'lucide-react';

const QrCard = ({title,subtitle,onclick}) => {
  return (
    <div
    onClick={()=>title==="URL" ? onclick() : null}
     className=' cursor-pointer active:scale-98 bg-white gap-3 flex justify-start h-20 flex-1/2 items-center p-4 rounded-lg shadow'>
        <div className='bg-gray-200 p-2 rounded-lg'>
            <Globe color='blue'/>
        </div>

        <div className='h-full flex flex-col justify-between' >
            <h1 className='font-bold mb-1 text-sm'>{title}</h1>
            <p className='text-gray-500 text-xs'>{subtitle}</p>
        </div>
    </div>
  )
}

export default QrCard