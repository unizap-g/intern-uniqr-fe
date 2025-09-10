// import React from "react";
// import AuthHeader from "./AuthHeader";
// import { NavLink } from "react-router-dom";
// import Options from "./Options";
// import {
// 	LayoutDashboard,
// 	QrCode,
// 	MessageCircleQuestionMark,
// 	BookImage,
// 	UsersRound,
// 	Settings,
// 	Wallet,
// 	Headset,
// } from "lucide-react";
// const optionsData = [
// 	{ text: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
// 	{ text: "Generate QR", icon: QrCode, path: "/generate-qr" },
// 	{ text: "Help", icon: MessageCircleQuestionMark, path: "/help" },
// 	{ text: "About", icon: BookImage, path: "/about" },
// 	{ text: "Users", icon: UsersRound, path: "/users" },
// 	{ text: "Settings", icon: Settings, path: "/settings" },
// 	{ text: "Wallet", icon: Wallet, path: "/wallet" },
// 	{ text: "Support", icon: Headset, path: "/support" },
// ];
// const Sidebar = () => {
// 	return (
// 		<div className="shadow shadow-2xl hidden md:flex sticky top-0 flex-col p-5 h-screen w-1/5 ">
// 			<div className="text-white font-bold mb-20">
// 				<AuthHeader firstText="Intern" secondText="Scan" className="ml-2" />
// 			</div>
// 			{optionsData.map((option, index) => (
// 				<NavLink key={index} to={option.path} className="block">
// 					{({ isActive }) => (
// 						<Options
// 							text={option.text}
// 							icon={option.icon}
// 							isActive={isActive}
// 						/>
// 					)}
// 				</NavLink>
// 			))}
// 		</div>
// 	);
// };
// export default Sidebar;

import React from "react";
import AuthHeader from "./AuthHeader";
import { NavLink } from "react-router-dom";
import Options from "./Options";
import {
  LayoutDashboard,
  QrCode,
  MessageCircleQuestionMark,
  BookImage,
  UsersRound,
  Settings,
  Wallet,
  Headset,
} from "lucide-react";
import useOverlayers from "../../hooks/UseOverlayers.jsx";
const optionsData = [
  { text: "Dashboard", icon: LayoutDashboard, path: "/dashboard",isActive:true },
  { text: "My QR Codes", icon: QrCode, path: "/dashboard/qrdetails",isActive:true },
  { text: "Enquiry", icon: MessageCircleQuestionMark, path: "/help",isActive:false },
  { text: "Catalogue", icon: BookImage, path: "/about",isActive:false },
  { text: "Customers", icon: UsersRound, path: "/users",isActive:false },
  { text: "Settings", icon: Settings, path: "/settings",isActive:false },
  { text: "Plans & Pricing", icon: Wallet, path: "/wallet",isActive:false },
  { text: "Support", icon: Headset, path: "/support" },
]

const Sidebar = ({ isMobile = false }) => {
  const { setNavbarName } = useOverlayers();

  return (
    <div
      className={`shadow shadow-2xl flex-col p-5 h-screen bg-white z-30
        ${isMobile 
          ? "flex w-3/4 max-w-xs animate-slideIn" 
          : "hidden md:flex w-1/5 sticky top-0"}`}
    >
      <div className="text-black font-bold mb-20">
        <AuthHeader firstText="Intern" secondText="Scan" className="ml-2" />
      </div>
      {optionsData.map((option, index) => (
        <NavLink
          key={index}
          
          end={option.path === "/dashboard"}
          to={option.isActive ? option.path : "#"}
          className="block"
          onClick={() => option.isActive && setNavbarName(option.text)}
        >
          {({ isActive }) => (
            <Options text={option.text} icon={option.icon} isActive={isActive && option.isActive} />
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;