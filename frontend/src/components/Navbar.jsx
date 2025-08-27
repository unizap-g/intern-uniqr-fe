import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import SignoutModal from "./SignoutModal";
import ProfileModal from "./ProfileModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Close dropdown when clicking outside
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

  const handleSignOut = () => {
    setModalOpen(true);
    setIsOpen(false);
  };

  const confirmSignOut = () => {
    setModalOpen(false);
    // Add your real sign out logic here
    alert("Signed Out!");
  };

  const handleProfile = () => {
    setProfileOpen(true);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between mb-3 relative">
      <div className="font-bold text-2xl">
        {profileOpen ? "Manage Account" : "Dashboard"}
      </div>

      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-3 focus:outline-none"
        >
          <img
            src="profilePhoto.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />

          <div className="text-left">
            <p className="text-sm font-semibold">New User</p>
            <p className="text-xs text-gray-500">8101467223</p>
          </div>

          <ChevronDown
            className={`w-5 h-5 text-black transition-transform duration-300 ease-in-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <div
          className={`absolute right-0 mt-2 w-56 mr-8 bg-white border-0 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform z-1 ${
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
              onClick={handleSignOut}
            >
              Sign Out
            </li>
          </ul>
        </div>
      </div>

      <SignoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmSignOut}
      />

      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </div>
  );
};

export default Navbar;
