import React from "react";
import { ScanQrCode } from "lucide-react";
const AuthHeader = ({ firstText, secondText }) => {
  return (
    <div className="flex  items-center">
      <div className="w-5 h-5 flex justify-center items-center">
        {/* <ScanQrCode color="#065AD8" /> */}
        <img className="w-full h-full" src="/logo.jpg" alt="" />
      </div>
      <div className="flex text-3xl ml-1 text-[#065AD8]">
        <h1 className="capitalize ">{firstText}</h1>
        <h2 className="capitalize  font-bold ">{secondText}</h2>
      </div>
    </div>
  );
};

export default AuthHeader;
