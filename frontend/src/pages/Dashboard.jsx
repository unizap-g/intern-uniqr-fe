import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MainDashboard from "../components/MainDeshboard";
import SignoutModal from "../components/Navbar/SignoutModal";
import ProfileModal from "../components/Navbar/ProfileModal";
import NavbarContext from "../context/Navbarcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useIsLogin } from "../hooks/useIsLogin";

const Dashboard = () => {
  // DEBUG: Confirm component mount
  // console.log("[DEBUG] Dashboard component mounted");
  const { userDetails, setUserDetails } = useIsLogin();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;
  

  const [showSignoutModal, setShowSignoutModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  axios.defaults.withCredentials = true;

  const body = {
  date_range: {
    type: "today",
    from: "2025-07-01T00:00:00Z", // you can make this dynamic later
    to: "2025-07-01T00:00:00Z"
  },
  group_location: "both",
  include_os: true,
  include_daily_scans: true,
  include_browser: true,
  include_time_of_day: true,
  include_qr_name: true
};

  useEffect(() => {
  // DEBUG: Confirm useEffect runs
  // console.log("[DEBUG] useEffect triggered");
    const fetchData = async () => {
      try {
        const uuidApiKey = localStorage.getItem("uuidApiKey");

        const [dashboardRes, userRes] = await Promise.all([
          axios.post(
            `${URL}/api/v1/dashboard`,
            body,
            { withCredentials: true, headers: { "x-api-key": uuidApiKey } }
          ),
          axios.get(
            `${URL}/auth/user`,
            { headers: { "x-api-key": uuidApiKey } }
          )
        ]);
        if (dashboardRes.data) {
          setDashboardData(dashboardRes.data.data);
        }
        if (userRes.data?.data) {
          console.log("User API response:", userRes.data.data);
          setUserDetails(userRes.data.data);
        }
      }catch (error) {
        console.error("Error fetching data:", error); 
        navigate("/login"); 
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);


  const confirmSignOut = async () => {
    setShowProfileModal(false);

    const uuidApiKey = localStorage.getItem("uuidApiKey");
    console.log("uuidApiKey", uuidApiKey);

    const body = {
      userId: userDetails?._id,
      uuidApiKey: uuidApiKey,
    };

    try {
      const res = await axios.post(`${URL}/auth/signout`, body, {
        headers: {
          "x-api-key": uuidApiKey,
        },
      });

      console.log("Sign out successful:", res.data);
      // optionally clear localStorage here
      navigate("/login");
      localStorage.removeItem("uuidApiKey");
      localStorage.removeItem("uId");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <NavbarContext.Provider
      value={{
        showProfileModal,
        setShowProfileModal,
        showSignoutModal,
        setShowSignoutModal,
      }}
    >
      <div className="min-h-screen w-full flex bg-blue-50 ">
        <Sidebar />

        {isLoading ? (
          <div className="flex items-center justify-center w-full">
            <p className="text-lg text-gray-600">Loading dashboard...</p>
          </div>
        ) : (
          <MainDashboard dashboardData={dashboardData} />
        )}

        <div>
          {showSignoutModal && (
            <SignoutModal
              isOpen={showSignoutModal}
              onClose={() => setShowSignoutModal(false)}
              onConfirm={confirmSignOut}
            />
          )}
          {showProfileModal && (
            <ProfileModal
              isOpen={showProfileModal}
              onClose={() => setShowProfileModal(false)}
            />
          )}
        </div>
      </div>
    </NavbarContext.Provider>
  );
};

export default Dashboard;
