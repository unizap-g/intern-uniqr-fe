import React from 'react';
import AuthHeader from './AuthHeader';
import { NavLink } from 'react-router-dom';
import Options from './Options';
import { LayoutDashboard, QrCode, MessageCircleQuestionMark, BookImage, UsersRound, Settings, Wallet, Headset } from 'lucide-react';
const optionsData = [
  { text: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { text: "Qr Details", icon: QrCode, path: "/dashboard/qrdetails" },
  { text: "Help", icon: MessageCircleQuestionMark, path: "/help" },
  { text: "About", icon: BookImage, path: "/about" },
  { text: "Users", icon: UsersRound, path: "/users" },
  { text: "Settings", icon: Settings, path: "/settings" },
  { text: "Wallet", icon: Wallet, path: "/wallet" },
  { text: "Support", icon: Headset, path: "/support" },
];
const Sidebar = () => {
  return (
    <div className=' shadow shadow-2xl hidden bg-white md:flex sticky top-0 flex-col p-5 h-screen w-1/5 '>
      <div className='text-white font-bold mb-20'>
        <AuthHeader firstText="Intern" secondText="Scan" className="ml-2" />
      </div>
      {optionsData.map((option, index) => (
        <NavLink key={index} end={option.path === "/dashboard"} to={option.path} className="block ">
          {({ isActive }) => (
            <Options
              text={option.text}
              icon={option.icon}
              isActive={isActive}
            />
          )}
        </NavLink>
      ))}
    </div>
  );
};
export default Sidebar;