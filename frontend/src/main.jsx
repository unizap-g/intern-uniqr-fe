import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { IsLoginProvider } from "./context/isLoginContext.jsx";
import Myqr from "./pages/Myqr.jsx";
import MainOutlet from "./pages/MainOutlet.jsx";
// import { VerifyProvider } from "./context/VerifyContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <IsLoginProvider>
        <App />
        {/* <MainOutlet />  */}
        {/* <Myqr /> */}
      </IsLoginProvider>
    </BrowserRouter>
   </StrictMode>
);
