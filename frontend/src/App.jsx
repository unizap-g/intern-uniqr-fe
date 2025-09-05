import Auth from "./pages/Auth";

import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import IsLoginContext from "./context/isLoginContext.jsx";
import { VerifyProvider } from "./context/VerifyContext";
import UnderConstructionPage from "./pages/UndercunstructionPage.jsx";
import { useState } from "react";
import MainOutlet from "./pages/MainOutlet.jsx";
import CreateQr from "./components/CreateQr.jsx";
import ViewQR from "./components/MyQr/ViewQR.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import MainDashboard from "./components/MainDeshboard.jsx";
import MyQrOutlet from "./pages/MyQrOutlet.jsx";
import EditQr from "./components/EditQr.jsx";

const App = () => {
  // const [userDetails, setUserDetails] = useState(null);
  return (
    // <VerifyProvider>
    //   <IsLoginContext value={{ userDetails, setUserDetails }}>
    //     <Routes>
    //       <Route path="/login" element={<Auth />} />
    //       <Route
    //         path="/dashboard"
    //         element={<Dashboard />}
    //       />
    //       <Route path='*' element={<Dashboard/>} />
    //     </Routes>
    //   </IsLoginContext>
    // </VerifyProvider>
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route
        path="/dashboard"
        element={
          //<ProtectedRoute>
            <MainOutlet />
         //</ProtectedRoute>
        }
      >
        <Route index element={<MainDashboard />} />
        <Route path="qrdetails" element={<MyQrOutlet />}>
          <Route index element={<ViewQR />} />
          <Route path="createqr" element={<CreateQr />} />
          <Route path="editqr" element={<EditQr />} />
        </Route>
      </Route>
      <Route
        path="*"
        element={
          <div className="w-full h-screen flex justify-center items-center uppercase text-3xl font-bold">
            404! Page Not Found
          </div>
        }
      />
    </Routes>
  );
};

export default App;
