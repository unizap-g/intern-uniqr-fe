import React, { useState } from "react";
import AuthHeader from "../../components/Sidebar/AuthHeader";
import { useAuth } from "../../hooks/useAuth";
import { Lock, Mail, Smartphone, Eye, EyeOff, Check } from "lucide-react";
import Inputcomp from "./Inputcomp";
import InputErrorMsg from "./InputErrorMsg";
import axios from "axios";
const Login = () => {
 const { setActiveComp, setPrevComp, setContextPhoneNumber, setIsLoading } =
  useAuth();
 const [iserror, setisError] = useState(false);
 const [errormsg, setErrormsg] = useState("");
 const [phoneNumber, setPhoneNumber] = useState("");
 const [useEmail, setUseEmail] = useState(true); // true = email, false = mobile
 const [useOtp, setUseOtp] = useState(true); // true = otp, false = password
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [isPasswordVisible, setIsPasswordVisible] = useState(false);
 const [isValidInput, setIsValidInput] = useState(false);
 const URL = import.meta.env.VITE_API_URL;
 const onNumberChange = (e) => {
  const value = e.target.value.replace(/\D/g, "");
  if (value.startsWith("0")) {
   setErrormsg("Number can't start with 0");
   setisError(true);
   return;
  }
  if (/^\d{0,10}$/.test(value)) {
   setisError(false);
   setPhoneNumber(value);
   setIsValidInput(value.length === 10);
  }
 };
  const onEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setisError(false);
  setIsValidInput(value.includes("@"));
  };
 const onPasswordChange = (e) => {
  setisError(false);
  setPassword(e.target.value);
 };
 const HandleLogin = async (e) => {
  e.preventDefault();
  if (useEmail && !email.includes("@")) {
   setisError(true);
   setErrormsg("Please enter a valid email address.");
   return;
  }
  if (!useEmail && phoneNumber.length !== 10) {
   setisError(true);
   setErrormsg("Please enter a valid 10-digit phone number.");
   return;
  }
  setIsLoading(true);
  try {
   if (useOtp) {
    const otpPayload = useEmail
     ? { mode: "email", email }
     : { mode: "mobile", countryCode: "91", mobileNumber: phoneNumber };
    const res = await axios.post(`${URL}/auth/send-otp`, otpPayload);
    if (res.status === 200) {
     console.log(":white_tick: OTP sent successfully", res.data);
     if (!useEmail) setContextPhoneNumber(phoneNumber);
     setActiveComp("otp");
     setPrevComp("login");
    } else {
     setisError(true);
     setErrormsg("Failed to send OTP. Please try again.");
    }
   } else {
    let payload = {
     event: "login",
     mode: useEmail ? "email-password" : "mobile-password",
     password,
    };
    if (useEmail) {
     payload.email = email;
     payload.password = password;
    } else {
     payload.mobile = phoneNumber;
     payload.country_code = "+91";
     payload.password = password;
    }
    const res = await axios.post(`${URL}/auth`, payload);
    if (res.status === 200) {
     console.log(":white_tick: Login success:", res.data);
     if (res.data.token) localStorage.setItem("authToken", res.data.token);
    } else {
     setisError(true);
     setErrormsg("Login failed");
    }
   }
  } catch (error) {
   console.error(error);
   setisError(true);
   setErrormsg("Something went wrong. Please try again.");
  } finally {
   setIsLoading(false);
  }
 };
 return (
  <div className="flex flex-1 h-screen justify-center w-full">
   <div className="w-full px-10 md:px-0 md:w-[60%] mt-20 md:mt-40 flex flex-col items-start">
    <AuthHeader firstText="Intern" secondText="scan" />
    <div className="w-full mb-30">
     <div>
      <h2 className="text-3xl mt-10 font-bold">Log in to your Account</h2>
      <p className="text-gray-600 text-lg mt-4 mb-10">
       Access your account with {useEmail ? "Email" : "Mobile"} and{" "}
       {useOtp ? "OTP" : "Password"} to manage orders, track inquiries, and grow
       your business seamlessly.
      </p>
     </div>
     <form onSubmit={HandleLogin} className="w-full lg:w-[80%]">
      <div className="relative w-full">
       {useEmail ? (
       <Inputcomp
        isRequired={true}
        Icon={<Mail size={20} color="gray" />}
        placeholder={"Email"}
        value={email}
        onchange={onEmailChange}
        type="email"
       />
      ) : (
       <Inputcomp
        iscountrycode={true}
        isRequired={true}
        Icon={<Smartphone size={20} color="gray" />}
        placeholder={"Phone Number"}
        value={phoneNumber}
        onchange={onNumberChange}
        type="text"
       />
      )}
        {isValidInput && (
                <Check
                  size={20}
                  color="green"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                />
              )}
      </div>
      {iserror && <InputErrorMsg message={errormsg} />}
      {!useOtp && (
       <Inputcomp
        isRequired={true}
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
        onClick={() => setUseEmail((prev) => !prev)}
        type="button"
        className="text-blue-600 active:scale-90 cursor-pointer font-medium hover:underline"
       >
        {useEmail ? "Use Mobile Instead" : "Use Email Instead"}
       </button>
      </div>
      <div className="text-right mt-2">
       <button
        onClick={() => setUseOtp((prev) => !prev)}
        type="button"
        className="text-blue-600 active:scale-90 cursor-pointer font-medium hover:underline"
       >
        {useOtp ? "Login with Password" : "Login with OTP"}
       </button>
      </div>
      <button
       type="submit"
       className="w-full mt-8 active:scale-98 transform transition duration-100 py-3 cursor-pointer text-white font-bold rounded-lg bg-[#065AD8] hover:bg-[#065AD8]/80"
      >
       {useOtp ? "Continue with OTP" : "Log In"}
      </button>
      <div className="w-full flex justify-center items-center mt-5 ">
       <p className="text-[14px] font-bold text-gray-600">
        Don't have an account?{" "}
        <button
         onClick={() => setActiveComp("signup")}
         className="text-blue-500 cursor-pointer"
        >
         Create an account
        </button>
       </p>
      </div>
     </form>
    </div>
   </div>
  </div>
 );
};
export default Login;