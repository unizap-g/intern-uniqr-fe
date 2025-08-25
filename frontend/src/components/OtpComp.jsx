import AuthHeader from "./AuthHeader";
import React,{useState} from "react";
import Inputcomp from "./Inputcomp";
import { useAuth } from "../hooks/useAuth";
const OtpComp = ({ contextPhoneNumber }) => {
	const { setActiveComp } = useAuth();
	const [otp, setOtp] = useState("");
	const onotpChange = (e) => {
		setOtp(e.target.value);
	}
	const handleSubmit = (e) => {
		e.preventDefault();	
	}
  return (
    <div className="flex-1 h-full bg-white  flex justify-center ">
      <div className="flex flex-col gap-3 w-[60%] mt-40">
        <AuthHeader firstText="biz" secondText="scan" />
        <div className=" mt-10">
          <h1 className="text-3xl text-black-600 font-bold">Enter OTP</h1>
        </div>
        <div className=" mt-4 mb-10">
          <p className=" text-lg text-gray-600">
            Enter the OTP sent to +91 {contextPhoneNumber} to verify your identity and
            continue securely
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-sm">
          <Inputcomp
            iscountrycode={false}
         
            value={otp}
            onchange={onotpChange}
            type="number"
            maxLength={10}
          />
          <button
            type="submit"
            className="w-full mt-8 py-3 text-white font-bold rounded-lg bg-[#065AD8]"
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
