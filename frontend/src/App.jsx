
import Auth from "./pages/Auth";

import Dashboard from "./pages/Dashboard";
import { Router, Route, Routes } from "react-router-dom";
import VerifyWrapper from "./components/VerifyWrapper.jsx";
import {VerifyProvider} from './context/VerifyContext';
import UnderConstructionPage from "./pages/UndercunstructionPage.jsx";
import LoginWrapper from './components/LoginWrapper.jsx';
const App = () => {
  return (
    <VerifyProvider>
      <Routes>
        <Route path="/login" element={<LoginWrapper><Auth /></LoginWrapper>} />
        <Route
        path="/dashboard"
        element={
          <VerifyWrapper>
            <Dashboard />
           </VerifyWrapper>
        }
      />
      <Route path='*' element={<VerifyWrapper><UnderConstructionPage /></VerifyWrapper>} />
    </Routes>
  </VerifyProvider>
);
};

export default App;
