import React from "react";

const OtpInput = ({ value, onchange, placeholder }) => {
  return (
    <div className=" w-full gap-2 items-center bg-gray-50 border px-4 py-1 mt-4 mb-0 border-gray-200 rounded-md flex justify-center ">
      <input
      autoFocus
      type={"password"}
        required={true}
        value={value}
        onChange={onchange}
        style={{ letterSpacing: "10px" }}
        className="bg-transparent text-center text-3xl outline-none border-none w-full"
        placeholder={placeholder}
      />
    </div>
  );
}

export default OtpInput;
