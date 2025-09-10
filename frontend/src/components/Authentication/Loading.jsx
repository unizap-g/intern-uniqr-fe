import React from 'react'
const Loading = () => {
return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
        <div className="absolute inset-0 w-full h-full bg-white/30 backdrop-blur-sm"></div>
        <div className='animate-spin relative rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 z-10'></div>
    </div>
)
}

export default Loading