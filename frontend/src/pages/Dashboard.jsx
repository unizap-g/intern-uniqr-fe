import React from "react";
import Sidebar from "../components/Sidebar";
import MainDashboard from "../components/MainDeshboard";
import SignoutModal from "../components/SignoutModal";
import ProfileModal from "../components/ProfileModal";
import NavbarContext from "../context/Navbarcontext";
const Dashboard = () => {
  const [showSignoutModal, setShowSignoutModal] = React.useState(false);
  const [showProfileModal, setShowProfileModal] = React.useState(false );
  
  const confirmSignOut = () => {
    setShowProfileModal(false);
    // Add your real sign out logic here
    alert("Signed Out!");
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
      <div className="min-h-screen w-full flex ">
        <Sidebar />
        {/* <MainContent /> */}
        <MainDashboard className="w-4/5" />
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
