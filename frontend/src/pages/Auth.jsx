import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import SignupComp from "../components/SignupComp";
import AuthContext from "../context/AuthContext";
import Login from "../components/Login";
import OtpComp from "../components/OtpComp";

const Auth = () => {

  const [activeComp, setActiveComp] = useState("login");
  const [contextPhoneNumber, setContextPhoneNumber] = useState("");
  console.log(activeComp);
  return (
    // const []
    <AuthContext.Provider
      value={{
        activeComp,
        setActiveComp,
        contextPhoneNumber,
        setContextPhoneNumber,
      }}
    >
      <div className="flex w-full flex-col md:flex-row-reverse h-screen ">
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
