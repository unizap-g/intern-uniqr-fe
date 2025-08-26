import React, { useState } from "react";
import AuthHeader from "./AuthHeader";
import { useAuth } from "../hooks/useAuth";
import { Lock, Smartphone, Eye, EyeOff } from "lucide-react";
import Inputcomp from "./Inputcomp";
import InputErrorMsg from "./InputErrorMsg";
import axios from "axios";

const Login = () => {
  const { setActiveComp, setPrevComp, setContextPhoneNumber,setIsLoading } = useAuth();
  const [iserror, setisError] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isOTP, setIsOTP] = useState(true);
  const URL = import.meta.env.VITE_API_URL;

  const onNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    console.log(value);
    if(value=="0"){
      setErrormsg("Number can't start with 0");
      setisError(true);
      return;
    }
    if (/^\d{0,10}$/.test(value)) {
      setisError(false);
      setPhoneNumber(value);
    }
  };
  //on password change function
  const onPasswordChange = (e) => {
    setisError(false);
    setPassword(e.target.value);
  };

  //handleLoginFunc
  const HandleLogin = async (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      console.log(phoneNumber);
      setisError(true);
      setErrormsg("Please enter a valid 10-digit phone number.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post(`${URL}/auth/send-otp`, {
        mobileNumber: `91${phoneNumber}`,
      });
      

      if(res.status==200){
        setIsLoading(false);
        setContextPhoneNumber(phoneNumber);
        setActiveComp("otp");
        setPrevComp("login");
      }
      else{
        setIsLoading(false);
        setisError(true);
        setErrormsg("otp send failed");
      }
      
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setisError(true);
      setErrormsg("otp send failed");
    }
  };
  return (
    <div className="flex  flex-1 h-screen justify-center w-full">
      <div className="w-full px-10 md:px-0 md:w-[60%] mt-20  md:mt-40 flex flex-col  items-start">
        <AuthHeader firstText="Intern" secondText="scan" />

        <div className="w-full mb-30">
          {/* Title + Paragraph */}
          <div>
            <h2 className="text-3xl mt-10 font-bold ">
              Log in to your Account
            </h2>
            <p className="text-gray-600 text-lg mt-4 mb-10">
              Access your account to manage orders, track inquiries, and grow
              your business seamlessly.
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={HandleLogin} className="w-full lg:w-[80%]">
            <Inputcomp
              iscountrycode={true}
              isRequired={true}
              Icon={<Smartphone size={20} color="gray" />}
              placeholder={"Phone Number"}
              value={phoneNumber}
              onchange={onNumberChange}
              type="text"
              // maxLength={10}
            />
            {iserror && <InputErrorMsg message={errormsg} />}
            {!isOTP && (
              <Inputcomp
                iscountrycode={false}
                Icon={<Lock size={20} color="gray" />}
                placeholder={"Password"}
                value={password}
                onchange={onPasswordChange}
                type={isPasswordVisible ? "text" : "password"}
                maxLength={10}
                LastIcon={
                  isPasswordVisible ? (
                    <Eye size={20} color="gray" />
                  ) : (
                    <EyeOff size={20} color="gray" />
                  )
                }
                toggleEye={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            )}
            <div className="text-right mt-2">
              <button
                onClick={() => setIsOTP((prev) => !prev)}
                type="button"
                className="text-blue-600 active:scale-90 cursor-pointer font-medium hover:underline "
              >
                {isOTP ? "Login with Password" : "Login with OTP"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full mt-8 active:scale-98 transform transition duration-100 py-3 cursor-pointer text-white font-bold rounded-lg bg-[#065AD8] hover:bg-[#065AD8]/80"
            >
              {isOTP ? "Continue with OTP" : "Log In"}
            </button>

            <div className="w-full flex justify-center items-center mt-5 ">
              <p className="text-[14px] font-bold text-gray-600">
                Don't have an account?{" "}
                <span
                  onClick={() => setActiveComp("signup")}
                  className="text-blue-500 cursor-pointer"
                >
                  Create an account
                </span>
              </p>
            </div>
          </form>

          {/* Create Account */}
        </div>
      </div>
    </div>
  );
};

export default Login;
