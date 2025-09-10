import React, { useEffect, useState } from "react";
import Banner from "../components/Authentication/Banner";
import SignupComp from "../components/Authentication/SignupComp";
import AuthContext from "../context/AuthContext";
import Login from "../components/Authentication/Login";
import { useNavigate } from "react-router-dom";
import OtpComp from "../components/Authentication/OtpComp";
import Loading from "../components/Authentication/Loading";
const Auth = () => {
  const navigate=useNavigate();
  const [activeComp, setActiveComp] = useState("login");
  const [isLoading,setIsLoading]=useState(false);
  const [prevComp, setPrevComp] = useState("login");
  const [contextPhoneNumber, setContextPhoneNumber] = useState("");
  useEffect(()=>{
    const isValid=localStorage.getItem("uuidApiKey");
    if(isValid){
      navigate("/dashboard");
    }
  },[])
  // console.log(activeComp);
  return (
    // const []
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        activeComp,
        setActiveComp,
        contextPhoneNumber,
        setContextPhoneNumber,
        prevComp,
        setPrevComp
      }}
    >
      <div className="flex relative w-full flex-col md:flex-row-reverse h-screen ">
        {isLoading && <Loading />}
        <Banner />
        {activeComp === "login" && <Login />}
        {activeComp === "signup" && <SignupComp />}
        {activeComp === "otp" && (
          <OtpComp contextPhoneNumber={contextPhoneNumber} />
        )}
        
      </div>
    </AuthContext.Provider>
  );
};

export default Auth;
