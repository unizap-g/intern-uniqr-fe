

import React, { useState } from "react";
import AuthHeader from "../../components/Sidebar/AuthHeader";
import Inputcomp from "./Inputcomp";
import { useAuth } from "../../hooks/useAuth";
import InputErrorMsg from "./InputErrorMsg";
import axios from "axios";
import { Smartphone, Mail, Check } from "lucide-react";
const SignupComp = () => {
 const { setActiveComp, setContextPhoneNumber, setPrevComp, setIsLoading } =
  useAuth();
 const [isValidInput, setIsValidInput] = useState(false);
 const [iserror, setisError] = useState(false);
 const [errormsg, setErrormsg] = useState("");
 const [phoneNumber, setPhoneNumber] = useState("");
 const [email, setEmail] = useState("");
 const [useEmail, setUseEmail] = useState(false); // false = mobile , true = email;
 const URL = import.meta.env.VITE_API_URL;
 // onNumberChangefunction
 const onNumberChange = (e) => {
  const value = e.target.value.replace(/\D/g, "");
  if (value.startsWith("0")) {
   setErrormsg("Number can't start with 0");
   setisError(true);
   setIsValidInput(false);
   return;
  }
  if (/^\d{0,10}$/.test(value)) {
   setPhoneNumber(value);
   setisError(false);
   setIsValidInput(value.length === 10); // valid if 10 digits
  }
 };
 const onEmailChange = (e) => {
  const value = e.target.value;
  setEmail(value);
  setisError(false);
  setIsValidInput(value.includes("@")); // simple email validation
 };
 // handle signup form submit
 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!useEmail && phoneNumber.length !== 10) {
   setisError(true);
   setErrormsg("Please enter a valid 10-digit phone number.");
   return;
  }
  if (useEmail && !email.includes("@")) {
   setisError(true);
   setErrormsg("Please enter a valid email address.");
   return;
  }
  setIsLoading(true);
  try {
   let payload = {
    event: "register",
    mode: useEmail ? "email-otp" : "mobile-otp",
   };
   if (useEmail) {
    payload.email = email;
    payload.passcode = "10069a2b1238";
   } else {
    payload.mobile = phoneNumber;
    payload.country_code = "+91";
    payload.passcode = "10069a2b1238";
   }
   const res = await axios.post(`${URL}/auth`, payload);
   if (res.status == 200) {
    setIsLoading(false);
    if (!useEmail) {
     setContextPhoneNumber(phoneNumber);
    }
    setActiveComp("otp");
    setPrevComp("signup");
   } else {
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
 // const res = await axios.post(`${URL}/auth/send-otp`, {
 //  countryCode: "91",
 //  mobileNumber: phoneNumber,
 // });
 return (
  <div className=" flex-1 h-screen w-full justify-center flex ">
   <div className="flex flex-col px-10 md:px-0 w-full md:w-[60%] mt-20 md:mt-40  items-start">
    <AuthHeader firstText="intern" secondText="scan" />
    <div className="mt-10">
     <h1 className="text-3xl  font-bold">Create an account</h1>
    </div>
    <div className=" mt-4 mb-10">
     <p className=" text-lg text-gray-600">
      Create your account to generate custom QR codes and connect
      customers to your bussiness instantly!{" "}
     </p>
    </div>
    <form onSubmit={handleSubmit} className="w-full md:w-sm">
     {useEmail ? (
      <div className="relative w-full">
       <Inputcomp
        isRequired={true}
        Icon={<Mail size={20} color="gray" />}
        placeholder={"Email"}
        value={email}
        onchange={onEmailChange}
        type="email"
       />
       {isValidInput && (
        <Check
         size={20}
         color="green"
         className="absolute right-3 top-1/2 transform -translate-y-1/2"
        />
       )}
      </div>
     ) : (
      <div className="relative w-full">
       <Inputcomp
       iscountrycode={true}
       isRequired={true}
       Icon={<Smartphone size={20} color="gray" />}
       placeholder={"Phone Number"}
       value={phoneNumber}
       onchange={onNumberChange}
       type="text"
       maxLength={10}
      />
       {isValidInput && (
        <Check
         size={20}
         color="green"
         className="absolute right-3 top-1/2 transform -translate-y-1/2"
        />
       )}
       </div>
     )}
     {iserror && <InputErrorMsg message={errormsg} />}
     <button
      type="submit"
      className="w-full active:scale-98 transform transition duration-100 mt-8 py-3 text-white font-bold rounded-lg bg-[#065AD8] hover:bg-[#065AD8]/80"
     >
      Sign Up
     </button>
     <div className="w-full flex justify-center items-center mt-5 ">
      <p className="text-[14px] font-bold text-gray-600">
       Already have an account?{" "}
       <button
        onClick={() => setActiveComp("login")}
        className="text-blue-500  cursor-pointer hover:text-[#065AD8]/80"
       >
        Log in
       </button>
      </p>
     </div>
    </form>
   </div>
  </div>
 );
};
export default SignupComp;