import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import "../../App.css";
import axios from "axios";
import useOverlayers from "../../hooks/UseOverlayers.jsx";
import { useIsLogin } from "../../hooks/useIsLogin.js";
import Sidebar from "../Sidebar/Sidebar.jsx";

const Navbar = ({title}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const URL=import.meta.env.VITE_API_URL;
  const { userDetails } = useIsLogin();
  const { setIsProfileOpen, setIsSignOutOpen } = useOverlayers();
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);
  // const {setShowProfileModal,setShowSignoutModal, showProfileModal}=useNavbar();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfile = () => {
    setIsProfileOpen(true);
    setIsOpen(false);
  };

  // Only open sidebar on small screens
  const handleHamburgerClick = () => {
    if (screenWidth < 768) {
      setSidebarOpen(true);
    }
  };

  return (
    <div className="px-8 flex items-center sticky  top-0 blurBg z-10 h-20 mt-0 bg-white/30 justify-between mb-3 ">
      <button onClick={handleHamburgerClick} className="md:hidden flex items-center text-black">
        <Menu size={28} />
      </button>

      <div className="font-bold text-2xl">
         {title}
      </div>

      {sidebarOpen && (
    <div className="fixed inset-0 z-40 flex">
     {/* Sidebar */}
     <div
      className={`fixed inset-0 z-40 flex transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
     >
      <button
       onClick={() => setSidebarOpen(false)}
       className="absolute top-6 right-26 text-black z-50"
      >
       <X size={32} strokeWidth={2} />
      </button>
      <Sidebar isMobile={true} />
     </div>
     {/* Overlay Background */}
     <div
      className="flex-1 bg-blue-500/30 backdrop-blur-md transition-all duration-500"
      onClick={() => setSidebarOpen(false)}
     />{" "}
    </div>
   )}

      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-3 focus:outline-none"
        >
          <img
            src={userDetails?.["profile-photo"] || "profilePhoto.jpg"}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />

          <div className="text-left">
            <p className="text-sm font-semibold">{userDetails?.firstName || "New User"}</p>
            <p className="text-xs text-gray-500">{userDetails?.mobile || ""}</p>
          </div>

          <ChevronDown
            className={`w-5 h-5 text-black transition-transform duration-300 ease-in-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <div
          className={`absolute right-0 mt-2 w-56 mr-8 bg-white border-0 shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform z-1 ${
            isOpen
              ? "max-h-96 opacity-100 scale-100"
              : "max-h-0 opacity-0 scale-95"
          }`}
        >
          <ul className="py-2 text-sm text-gray-700">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleProfile}
            >
              Manage Account
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Plan & Subscription
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Tutorials
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Help Center
            </li>
            <li
              className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
              onClick={()=>{
                setIsSignOutOpen(true)
                // setShowSignoutModal(true);
                // setShowProfileModal(false);
                setIsOpen(false);
              }}
            >
              Sign Out
            </li>
          </ul>
        </div>
      </div>

      {/* <SignoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmSignOut}
      /> */}

      {/* <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      /> */}
    </div>
  );
};

export default Navbar;