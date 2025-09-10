import Auth from "./pages/Auth";
import { Route, Routes } from "react-router-dom";
import MainOutlet from "./pages/MainOutlet.jsx";
import CreateQr from "./components/MyQr/CreateQr.jsx";
import ViewQR from "./components/MyQr/ViewQR.jsx";
import MainDashboard from "./components/Dashboard/MainDeshboard.jsx";
import MyQrOutlet from "./pages/MyQrOutlet.jsx";
import EditQr from "./components/MyQr/EditQr.jsx";

const App = () => {
  // const [userDetails, setUserDetails] = useState(null);
  return (
    
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
