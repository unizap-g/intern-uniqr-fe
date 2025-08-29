import React from 'react'

const SignoutModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <>
    {isOpen && (
        <div className="fixed z-20 inset-0 w-full h-full bg-white/30 backdrop-blur-sm">
        </div>
    )}
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{ background: isOpen ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0)' }}
    >
      <div
        className={`bg-white rounded-lg shadow-lg w-96 p-6 mt-150 transform transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Confirm Sign Out</h2>
        <p className="text-gray-700 mb-6">Are you sure you want to sign out?</p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>

  </>
    );
};

export default SignoutModal;