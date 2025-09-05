import React,{useEffect, useState} from 'react'

const DeleteQrModal = ({isOpen, title, message, onConfirm, onCancel}) => {
  const [error, setError] = useState("");
  const [input,setInput]=useState("");

  useEffect(() => {
    if(!isOpen) {
      setInput("");
      setError("");
    }
  }, [isOpen]);

  const handleConfirmClick = () => {
    if (input.trim().toLowerCase() === "delete") {
      onConfirm();
      setInput("");
      setError(""); 
    } else {
      setError("Please type 'delete' to confirm.");
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    if(error && e.target.value.trim().toLowerCase() === "delete") {
      setError("");
    }
  };

  if(!isOpen) return null;
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/40'>
      <div className='bg-white rounded-xl shadow-lg p-6 w-96'>
        <h2 className='text-lg font-semibold mb-4'>{title}</h2>
        <p className='mb-6'>{message}</p>
        <input type="text" value={input} onChange={handleChange} placeholder='Type "delete" to confirm' className='w-full border rounded px-3 py-2 mb-6'/>
        
        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
        
        <div className='flex justify-end gap-3'>
          <button className='bg-gray-300 text-gray-700 px-4 py-2 rounded-lg cursor-pointer' onClick={onCancel}>
            Cancel
          </button>
          <button className='cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg mr-2' onClick={handleConfirmClick}>
            Delete
          </button>
          
        </div>
      </div>
      
    </div>
  )
}

export default DeleteQrModal;