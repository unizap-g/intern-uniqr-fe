// import React, { useState, useRef, useEffect, use } from "react";
// import { ChevronDown } from "lucide-react";
// import { useIsLogin } from "../hooks/useIsLogin";
// import "../components/comp.css";
// import { useNavbar } from "../hooks/useNavbar";
// const Navbar = () => {
//   const {userDetails}=useIsLogin()
//   console.log(userDetails)
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const { showSignoutModal, setShowSignoutModal, showProfileModal, setShowProfileModal } = useNavbar();
// //   const [profileOpen, setProfileOpen] = useState(false);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

// //   const handleSignOut = () => {
// //     setModalOpen(true);
// //     setIsOpen(false);
// //   };

// //   const confirmSignOut = () => {
// //     setModalOpen(false);
// //     // Add your real sign out logic here
// //     alert("Signed Out!");
// //   };

//   const handleProfile = () => {
//     setShowProfileModal(true);
//     setIsOpen(false);
//   };

//   return (
//     <div className="px-8 flex items-center sticky top-0 blurBg z-10 h-20 mt-0 bg-white/30 justify-between mb-3 ">
//       <div className="font-bold sm:text-[1.2rem]">
//         {showProfileModal ? "Manage Account" : "Dashboard"}
//       </div>

//       <div ref={dropdownRef} className="relative">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="flex items-center space-x-3 focus:outline-none"
//         >
//           <img
//             src="profilePhoto.jpg"
//             alt="Profile"
//             className="w-10 h-10 rounded-full"
//           />

//           <div className="text-left">
//             <p className="text-sm font-semibold">{userDetails?.fullName || "New User"}</p>
//             <p className="text-xs text-gray-500">{userDetails?.mobileNumber || ""}</p>
//           </div>

//           <ChevronDown
//             className={`w-5 h-5 text-black transition-transform duration-300 ease-in-out ${
//               isOpen ? "rotate-180" : "rotate-0"
//             }`}
//           />
//         </button>

//         <div
//           className={`absolute right-0 mt-2 w-56 mr-8 bg-white border-0 shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform z-1 ${
//             isOpen
//               ? "max-h-96 opacity-100 scale-100"
//               : "max-h-0 opacity-0 scale-95"
//           }`}
//         >
//           <ul className="py-2 text-sm text-gray-700">
//             <li
//               className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//               onClick={handleProfile}
//             >
//               Manage Account
//             </li>
//             <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//               Plan & Subscription
//             </li>
//             <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//               Tutorials
//             </li>
//             <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//               Help Center
//             </li>
//             <li
//               className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
//               onClick={()=>{
//                 setShowSignoutModal(true);
//                 setShowProfileModal(false);
//                 setIsOpen(false);
//               }}
//             >
//               Sign Out
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* <SignoutModal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onConfirm={confirmSignOut}
//       /> */}

//       {/* <ProfileModal
//         isOpen={profileOpen}
//         onClose={() => setProfileOpen(false)}
//       /> */}
//     </div>
//   );
// };

// export default Navbar;
//

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useIsLogin } from "../hooks/useIsLogin";
import { useNavbar } from "../hooks/useNavbar";
import Sidebar from "./Sidebar";

const Navbar = () => {
	const { userDetails } = useIsLogin();
	const [isOpen, setIsOpen] = useState(false); // dropdown
	const [sidebarOpen, setSidebarOpen] = useState(false); // sidebar
	const dropdownRef = useRef(null);
	const {
		// showSignoutModal,
		setShowSignoutModal,
		showProfileModal,
		setShowProfileModal,
	} = useNavbar();

	// close dropdown if click outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleProfile = () => {
		setShowProfileModal(true);
		setIsOpen(false);
	};

	return (
		<>
			{/* Navbar */}
			<div className="px-6 flex items-center sticky top-0 blurBg z-20 h-20 bg-white/30 backdrop-blur-lg justify-between">
				{/* Hamburger */}
				<button
					onClick={() => setSidebarOpen(true)}
					className="md:hidden flex items-center text-black"
				>
					<Menu size={28} />
				</button>

				{/* Title */}
				<div className="font-bold sm:text-[1.2rem]">
					{showProfileModal ? "Manage Account" : "Dashboard"}
				</div>

				{/* Profile Dropdown */}
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
						<div className="text-left hidden sm:block">
							<p className="text-sm font-semibold">
								{userDetails?.fullName || "New User"}
							</p>
							<p className="text-xs text-gray-500">
								{userDetails?.mobileNumber || ""}
							</p>
						</div>
						<ChevronDown
							className={`w-5 h-5 text-black transition-transform duration-500 delay-500 ease-in-out ${
								isOpen ? "rotate-180" : "rotate-0"
							}`}
						/>
					</button>

					{/* Dropdown Menu */}
					<div
						className={`absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md overflow-hidden transition-all duration-500 delay-1000 ease-in-out transform ${
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
								onClick={() => {
									setShowSignoutModal(true);
									setShowProfileModal(false);
									setIsOpen(false);
								}}
							>
								Sign Out
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Sidebar */}
			{sidebarOpen && (
				<div className="fixed inset-0 z-40 flex">
					{/* Sidebar */}
					<div className={`fixed inset-0 z-40 flex transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
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
					/>
					{" "}
				</div>
			)}
		</>
	);
};

export default Navbar;
