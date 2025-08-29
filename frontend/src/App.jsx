
import Auth from "./pages/Auth";

import Dashboard from "./pages/Dashboard";
import { Router, Route, Routes } from "react-router-dom";
import IsLoginContext from "./context/isLoginContext.jsx";
import {VerifyProvider} from './context/VerifyContext';
import UnderConstructionPage from "./pages/UndercunstructionPage.jsx";
import { useState } from "react";

const App = () => {

  const [userDetails, setUserDetails] = useState(null);
  return (
    <VerifyProvider>
      <IsLoginContext value={{ userDetails, setUserDetails }}>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route path='*' element={<Dashboard/>} />
        </Routes>
      </IsLoginContext>
    </VerifyProvider>
  );
};

export default App;
