import React, { useState } from "react";
import AuthHeader from "./AuthHeader";
import { useAuth } from "../context/AuthContext";
import { Lock, Smartphone, Eye, EyeOff } from "lucide-react";
import Inputcomp from "./Inputcomp";
import InputErrorMsg from "./InputErrorMsg";

const BLUE_600 = "#2563eb"; // Tailwind blue-600

const Login = () => {
  const { setActiveComp,setContextPhoneNumber } = useAuth();
  const [iserror,setisError]=useState(false)
  const [errormsg, setErrormsg] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isOTP, setIsOTP] = useState(true);
  // onNumberChangefunction
  const onNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setisError(false) 
      setPhoneNumber(value);
    }
  };
  //on password change function
  const onPasswordChange = (e) => {
    setisError(false)
    setPassword(e.target.value);
  };

  //handleLoginFunc
  const HandleLogin=(e)=>{    
    e.preventDefault();
    if(phoneNumber.length!==10){
      setisError(true)
      setErrormsg("Please enter a valid 10-digit phone number.")
      return;
    }
    setContextPhoneNumber(phoneNumber)
   setActiveComp('otp')
  }
  return (
    <div className="flex  flex-1 h-screen justify-center w-full">
      <div className="w-[60%] mt-40 flex flex-col  items-start">
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
          <form
            onSubmit={HandleLogin}
            className="w-sm"
          >
            <Inputcomp
              iscountrycode={true}
              isRequired={true}
              Icon={<Smartphone size={20} color="gray" />}
              placeholder={"Phone Number"}
              value={phoneNumber}
              onchange={onNumberChange}
              type="number"
              maxLength={10}
            />
            {iserror && (<InputErrorMsg message={errormsg} />)}
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
                className="text-blue-600 cursor-pointer font-medium hover:underline"
              >
                {isOTP ? "Login with Password" : "Login with OTP"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full mt-8 py-3 cursor-pointer text-white font-bold rounded-lg bg-[#065AD8]"
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
