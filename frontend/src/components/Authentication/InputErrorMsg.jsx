import React from 'react'

const InputErrorMsg = ({ message }) => {
  return (
   <span className=" text-red-500 text-[10px] font-semibold ml-2 mt-0 text-center">{message.toUpperCase()}</span>
  )
}

export default InputErrorMsg