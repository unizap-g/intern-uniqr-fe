import React from 'react';

const Options = ({ text, icon: Icon, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 cursor-pointer text-lg font-semibold p-3 rounded-md
        ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
    >
      {Icon && <Icon className="w-5 ml-2 h-5" />}
      <span>{text}</span>
    </div>
  );
};

export default Options;