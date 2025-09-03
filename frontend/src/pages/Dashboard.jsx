import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MainDashboard from "../components/MainDeshboard";
import SignoutModal from "../components/SignoutModal";
import ProfileModal from "../components/ProfileModal";
import NavbarContext from "../context/NavbarContext";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useIsLogin } from "../hooks/useIsLogin";
const Dashboard = () => {
  const {userDetails, setUserDetails } = useIsLogin();
  console.log("khfohfiuyfi",userDetails?._id)
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;
  const [showSignoutModal, setShowSignoutModal] = React.useState(false);
  const [showProfileModal, setShowProfileModal] = React.useState(false);
  useEffect(() => {
    const uuidApiKey = localStorage.getItem("uuidApiKey");
    const verify = async () => {
      try {
        const res = await axios.get(`${URL}/user/userdata`, {
          headers: {
            "x-api-key": uuidApiKey,
          },
        });
        console.log(res);
        setUserDetails(res.data.user);
        // const newTokenKey=res.headers["x-api-key"];
        const newToken = res.data.uuidToken;
        console.log(res.data.uuidToken);
        if (uuidApiKey !== newToken) {
          console.log("uuid set from Dashboard");
          localStorage.setItem("uuidApiKey", newToken);
        }
      } catch (error) {
        console.error("token remove from here");
        localStorage.removeItem("uuidApiKey");
        console.log(error);
        navigate("/login");
      }
    };

    if (!uuidApiKey) {
      navigate("/login");
    } else verify();
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
    const res = await axios.post(
      `${URL}/auth/signout`,
      body,
      {
        headers: {
          "x-api-key": uuidApiKey,
        },
      }
    );

    console.log("Sign out successful:", res.data);
    // optionally clear localStorage here
    navigate("/login");
    localStorage.removeItem("uuidApiKey");
    localStorage.removeItem("uId");

  } catch (error) {
    console.error("Sign out error:", error);
  }
};
  
  // const handleSignOut = () => {
  //   setShowSignoutModal(true);
  //   setShowProfileModal(false);
  // };
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
        <div className="flex-1 flex flex-col">
          <Navbar title="Dashboard" />
          <MainDashboard />
        </div>
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
