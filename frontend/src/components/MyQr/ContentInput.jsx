import React from "react";

const ContentInput = ({title, placeholder, value, setValue}) => {
  return (
    <div className="shadow shadow-lg mb-5 bg-white p-5 rounded-lg">
      <div className="mb-5">
        <h1 className="font-bold text-lg mb-2">{title}</h1>
      </div>
      <div>
        <input
          type="text"
          value={value}
          className="border border-gray-300 outline-none rounded-md p-3 text-lg w-full"
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ContentInput;
