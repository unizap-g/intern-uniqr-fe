import React from "react";

const DeleteAccountModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-lg p-6 z-10 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Are you sure you want to delete your account?
        </h2>
        <p className="text-gray-600 text-center mb-6">
          This action cannot be undone.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 px-6 py-2 rounded-lg text-white hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
