import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar.jsx';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import ProfileModal from '../components/Navbar/ProfileModal.jsx';
import SignoutModal from '../components/Navbar/SignoutModal.jsx';
import {Outlet} from 'react-router-dom';
import OverLayersContext from '../context/OverLayers';
import { useNavigate } from 'react-router-dom';
import { useIsLogin } from '../hooks/useIsLogin';
import axios from 'axios';
const URL=import.meta.env.VITE_API_URL;
const MainOutlet = () => {
  // DEBUG: Confirm component mount
  //console.log("[DEBUG] MainOutlet component mounted");
  const navigate=useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [navbarName,setNavbarName]=useState("Dashboard");
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [editedData,setEditedData]=useState(null);
  const [userD,setUserD]=useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userDetails, setUserDetails } = useIsLogin();
  // API call for dashboard data
  useEffect(() => {
    // DEBUG: Confirm useEffect runs
    //console.log("[DEBUG] useEffect triggered");
    const fetchDashboardData = async () => {
      try {
        // DEBUG: Show API URL
        //console.log("[DEBUG] API URL is:", URL);
        // DEBUG: Show POST body
        //console.log("[DEBUG] POST body:", {});
        
        let res;
      
        try {
          // First try with proxy
          res = await axios.post(
            '/api/v1/dashboard',  // Use proxy path
            {},
            {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            }
          );
        } catch (proxyError) {
          console.log("Proxy failed, trying direct URL:", proxyError.message);
          // Fallback to direct URL without credentials
          res = await axios.post(
            `${URL}/api/v1/dashboard`,
            {},
            {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            }
          );
        }
        
        // DEBUG: Show full response
        //console.log("[DEBUG] API response:", res);
        if (res.data) {
          setDashboardData(res.data.data || res.data);
        }

        try {
        const uuidApiKey = localStorage.getItem("uuidApiKey");
        const userRes = await axios.get(`${URL}/auth/user`, {
          headers: {
            "x-api-key": uuidApiKey,
            Accept: "application/json",
          },
        });

        if (userRes.data?.data) {
          console.log("User API response:", userRes.data.data);
          setUserDetails(userRes.data.data);
        }
      } catch (userErr) {
        console.error("User details fetch failed:", userErr.message);
      }
      
      } catch (error) {
        // DEBUG: Show error
        console.error("API call error:", error);
        // Don't navigate away on API error to prevent infinite refresh
        // Just set some default data or show an error message
        console.log("Setting default data due to API error");
        setDashboardData(null);
      } finally {
        // DEBUG: Confirm loading state change
        //console.log("[DEBUG] setIsLoading(false)");
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

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
<OverLayersContext.Provider value={{ isProfileOpen, setIsProfileOpen, isSignOutOpen, setIsSignOutOpen, isDownloadOpen, setIsDownloadOpen ,editedData,setEditedData, navbarName,setNavbarName,userD,setUserD, dashboardData, isLoading}}>
      <div className='min-h-screen w-full flex bg-blue-50 '>
          <Sidebar />
          <div className='flex-1'>
            <div className='w-full z-50 h-[10vh] sticky top-0'>
              <Navbar title={navbarName} />
            </div>
            <div className='w-full h-[90vh] overflow-y-auto no-scrollbar px-4'>
              {isLoading ? (
                <div className="flex items-center justify-center w-full h-full">
                  <p className="text-lg text-gray-600">Loading dashboard...</p>
                </div>
              ) : (
                <Outlet context={{ dashboardData }} />
              )}
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