
import Auth from "./pages/Auth";

import Dashboard from "./pages/Dashboard";
import { Router, Route, Routes } from "react-router-dom";
import VerifyWrapper from "./components/VerifyWrapper.jsx";
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
