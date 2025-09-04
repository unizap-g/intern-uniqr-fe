import React from 'react'

const DeleteQrModal = ({isOpen, title, message, onConfirm, onCancel}) => {
  if(!isOpen) return null;
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/40'>
      <div className='bg-white rounded-xl shadow-lg p-6 w-96'>
        <h2 className='text-lg font-semibold mb-4'>{title}</h2>
        <p className='mb-6'>{message}</p>
        <div className='flex justify-end gap-3'>
          <button className='bg-gray-300 text-gray-700 px-4 py-2 rounded-lg' onClick={onCancel}>
            Cancel
          </button>
          <button className='bg-red-500 text-white px-4 py-2 rounded-lg mr-2' onClick={onConfirm}>
            Delete
          </button>
          
        </div>
      </div>
      
    </div>
  )
}

export default DeleteQrModal;