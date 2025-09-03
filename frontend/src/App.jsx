import Auth from "./pages/Auth";
import ViewQR from "./pages/ViewQR";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import IsLoginContext from "./context/isLoginContext.jsx";
import { VerifyProvider } from "./context/VerifyContext";
import { NavbarProvider } from "./context/NavbarContext";  // ✅ import provider
import { useState } from "react";

const App = () => {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <VerifyProvider>
      <IsLoginContext value={{ userDetails, setUserDetails }}>
        <NavbarProvider>   {/* ✅ wrap here */}
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />
            <Route path="/my-qr-codes" element={<ViewQR />} />
          </Routes>
        </NavbarProvider>
      </IsLoginContext>
    </VerifyProvider>
  );
};

export default App;
