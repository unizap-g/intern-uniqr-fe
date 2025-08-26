import AuthHeader from "./AuthHeader";
import React, { useState } from "react";
import { ArrowBigLeft } from "lucide-react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import OtpBox from "./OtpBox";
import InputErrorMsg from "./InputErrorMsg";

const OtpComp = ({ contextPhoneNumber }) => {
  const [iserror, setisError] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const URL = import.meta.env.VITE_API_URL;
  const { setActiveComp, prevComp, setIsLoading } = useAuth();
  const [otp, setOtp] = useState("");

  const onotpChange = (value) => {

    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setisError(false);
    }
  };
  const handleSubmit = async (e) => {
	e.preventDefault();
    if(otp===""){
		setErrormsg("please enter otp")
		setisError(true)
		return;
	}
	setIsLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/auth/verify-otp`, {
        mobileNumber: `91${contextPhoneNumber}`,
        otp: otp,
      });
      if (res.status === 201) {
        setIsLoading(false);
        // OTP verification successful
        console.log("OTP verification successful");
        console.log(res.data);
        setOtp("");
      } else {
        // Handle error (e.g., show error message)
        console.error("OTP verification failed");
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setErrormsg("Invalid OTP");
      setisError(true);
      setOtp("");
    }
  };
  return (
    <div className="flex-1 h-screen bg-white  flex justify-center ">
      <div className="flex px-10 md:px-0 flex-col gap-3 w-full md:w-[60%] mt-20 md:mt-40">
        <AuthHeader firstText="biz" secondText="scan" />
        <div className="flex items-center gap-2  mt-10">
          <div
            onClick={() => setActiveComp(prevComp)}
            className="cursor-pointer active:scale-90 "
          >
            <ArrowBigLeft />
          </div>
          <h1 className="text-3xl text-black-600 font-bold">Enter OTP</h1>
        </div>
        <div className=" mt-4 mb-10">
          <p className=" text-lg text-gray-600">
            Enter the OTP sent to +91 {contextPhoneNumber} to verify your
            identity and continue securely
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full md:w-sm">
         <OtpBox onChangeOTP={onotpChange}/>
          {iserror && (
			<div className="ml-5">
				<InputErrorMsg message={errormsg} />
			</div>
		  )}
          <button
            type="submit"
            className="w-full cursor-pointer mt-8 py-3 text-white font-bold rounded-lg bg-[#065AD8]
			hover:bg-[#065AD8]/80
			"
          >
            {prevComp === "signup" ? "Sign Up" : "Continue"}
          </button>

          {/* <div className="w-full flex justify-center items-center mt-5 ">
            <p className="text-[14px] font-bold text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => setActiveComp("login")}
                className="text-blue-500 cursor-pointer"
              >
                Log in
              </span>
            </p>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default OtpComp;
