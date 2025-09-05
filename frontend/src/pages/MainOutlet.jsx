import React from 'react'
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProfileModal from '../components/ProfileModal';
import SignoutModal from '../components/SignoutModal';
import {Outlet} from 'react-router-dom';
import OverLayersContext from '../context/OverLayers';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const URL=import.meta.env.VITE_API_URL;
const MainOutlet = () => {
  const navigate=useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [navbarName,setNavbarName]=useState("");
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [editedData,setEditedData]=useState(null);

const handleSignOut = async () => {
  try {
    const res = await axios.post(
      `${URL}/auth/signout`,
      {}, // request body (empty here)
      {
        headers: {
          "x-api-key": localStorage.getItem("uuidApiKey") || ""
        }
      }
    );

    if (res.data.success) {
      localStorage.removeItem("uuidApiKey");
      setIsSignOutOpen(false);
      navigate('/');
    }
  } catch (error) {
    console.error("Error signing out:", error);
  }
};


  return (
    <OverLayersContext.Provider value={{ isProfileOpen, setIsProfileOpen, isSignOutOpen, setIsSignOutOpen, isDownloadOpen, setIsDownloadOpen ,editedData,setEditedData, navbarName,setNavbarName}}>
      <div className='min-h-screen w-full flex bg-blue-50 '>
          <Sidebar />
          <div className='flex-1'>
            <div className='w-full z-50 h-[10vh] sticky top-0'>
              <Navbar title={navbarName} />
            </div>
            <div className='w-full h-[90vh] overflow-y-auto no-scrollbar px-4'>
              <Outlet />
            </div>
          </div>
          <div>
            <SignoutModal
              isOpen={isSignOutOpen}
              onClose={() => setIsSignOutOpen(false)}
              onConfirm={()=>{handleSignOut()}}
            />

            <ProfileModal
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
            />

            {/* <DownloadModal
              isOpen={isDownloadOpen}
              onClose={() => setIsDownloadOpen(false)}
            /> */}
          </div>
      </div>
    </OverLayersContext.Provider>
  )
}

export default MainOutlet;