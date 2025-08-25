import AuthHeader from "./AuthHeader";
import React, { useState } from "react";
import Inputcomp from "./Inputcomp";

import { useAuth } from "../hooks/useAuth";
import OtpInput from "./OtpInput";
const OtpComp = ({ contextPhoneNumber }) => {
  const { setActiveComp } = useAuth();
  const [otp, setOtp] = useState("");
  const onotpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (/^\d{0,4}$/.test(value)) {
      setOtp(value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Submitted OTP:", otp);
  };
  return (
    <div className="flex-1 h-screen bg-white  flex justify-center ">
      <div className="flex px-10 md:px-0 flex-col gap-3 w-full md:w-[60%] mt-20 md:mt-40">
        <AuthHeader firstText="biz" secondText="scan" />
        <div className=" mt-10">
          <h1 className="text-3xl text-black-600 font-bold">Enter OTP</h1>
        </div>
        <div className=" mt-4 mb-10">
          <p className=" text-lg text-gray-600">
            Enter the OTP sent to +91 {contextPhoneNumber} to verify your
            identity and continue securely
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full md:w-sm">
          <OtpInput value={otp} onchange={onotpChange} />
          <button
            type="submit"
            className="w-full cursor-pointer mt-8 py-3 text-white font-bold rounded-lg bg-[#065AD8]
			hover:bg-[#065AD8]/80
			"
          >
            Sign Up
          </button>

          <div className="w-full flex justify-center items-center mt-5 ">
            <p className="text-[14px] font-bold text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => setActiveComp("login")}
                className="text-blue-500 cursor-pointer"
              >
                Log in
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpComp;
