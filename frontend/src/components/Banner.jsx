import React from "react";

const Banner = () => {
  return (
    <div className="m-0 font-sans min-h-screen hidden md:flex flex-col md:flex-row w-full md:w-1/2">
      {/* Left Side: Login */}

      {/* Right Side: Business QR */}
      <div className="flex-1 bg-[#7dceee] flex flex-col justify-center items-center p-6 md:p-10">
        <img
          src="/Banner.jpg"
          alt="Business QR"
          className="w-[80%] max-w-[350px] h-auto rounded-[10px] mb-6"
        />
        <div className="text-[22px] md:text-[29px] font-bold text-white mb-3 text-center">
          Business QR Liya Kya?
        </div>
        <div className="text-[14px] md:text-[15px] text-white max-w-[340px] text-center leading-[1.5]">
          Create your custom QR code and connect customers to your business instantly!
        </div>
      </div>
    </div>
  );
};

export default Banner;
