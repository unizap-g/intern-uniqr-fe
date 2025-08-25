import React, { useState } from "react";
import AuthHeader from "./AuthHeader";
import Inputcomp from "./Inputcomp";
import { useAuth } from "../context/AuthContext";
import InputErrorMsg from "./InputErrorMsg";
import { Smartphone } from "lucide-react";
const SignupComp = () => {
    const {setActiveComp, setContextPhoneNumber } = useAuth();    
      const [iserror,setisError]=useState(false)
      const [errormsg, setErrormsg] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
      // onNumberChangefunction
    const onNumberChange=(e)=>{
        const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
      setisError(false)
    }
}

  // handle signup form submit
  const handleSubmit=(e)=>{
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
    <div className=" flex-1 h-full  justify-center  flex ">
      <div className="flex flex-col w-[60%] mt-40  items-start">
        <AuthHeader firstText="biz" secondText="scan" />
        <div className="mt-10">
          <h1 className="text-3xl  font-bold">Create an account</h1>
        </div>
        <div className=" mt-4 mb-10">
          <p className=" text-lg text-gray-600">
            Create your account to generate custom QR codes and connect
            customers to your bussiness instantly!{" "}
          </p>
        </div>
        <form
        onSubmit={handleSubmit}
         className="w-sm">
          <Inputcomp iscountrycode={true} isRequired={true} Icon={<Smartphone size={20} color="gray" />} placeholder={"Phone Number"} value={phoneNumber} onchange={onNumberChange} type="number" maxLength={10} />
          {iserror && (<InputErrorMsg message={errormsg} />)}
          <button
           type="submit"
           className="w-full mt-8 py-3 text-white font-bold rounded-lg bg-[#065AD8]">
            Sign Up
          </button>

          <div className="w-full flex justify-center items-center mt-5 ">
            <p className="text-[14px] font-bold text-gray-600">
              Already have an account?{" "}
              <span onClick={() => setActiveComp("login")} className="text-blue-500 cursor-pointer">Log in</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupComp;
