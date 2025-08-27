import React from "react";
import Loading from "./components/Loading";
import Auth from "./pages/Auth";
import Temp from "./components/OtpBox";
import Dashboard from "./pages/Dashboard";
import { Router, Route, Routes } from "react-router-dom";
import VerifyWrapper from "./Wrapper/verifyWrapper.jsx";
import {VerifyProvider} from './context/VerifyContext';
const App = () => {
  return (
    <VerifyProvider>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
        path="/dashboard"
        element={
          <VerifyWrapper>
            <Dashboard />
           </VerifyWrapper>
        }
      />
    </Routes>
    </VerifyProvider>
  );
};

export default App;
