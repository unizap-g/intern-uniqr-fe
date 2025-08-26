import React from "react";
import Loading from "./components/Loading";
import Auth from "./pages/Auth";
import Temp from "./components/OtpBox";
import Dashboard from "./pages/Dashboard";
import { Router, Route,Routes } from "react-router-dom";
const App = () => {
  return (
     <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
