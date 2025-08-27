import React, { useState } from 'react';
import AuthHeader from './AuthHeader';
import Options from './Options';
import { LayoutDashboard, QrCode, MessageCircleQuestionMark, BookImage, UsersRound, Settings, Wallet, Headset } from 'lucide-react';

const optionsData = [
  { text: "Dashboard", icon: LayoutDashboard },
  { text: "Generate QR", icon: QrCode },
  { text: "Help", icon: MessageCircleQuestionMark },
  { text: "About", icon: BookImage },
  { text: "Users", icon: UsersRound },
  { text: "Settings", icon: Settings },
  { text: "Wallet", icon: Wallet },
  { text: "Support", icon: Headset },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(null); 

  return (
    <div className='flex flex-col h-full p-5 min-h-screen w-1/5'>
      <div className='text-white font-bold mb-20'>
        <AuthHeader firstText="Intern" secondText="Scan" className="ml-2" />
      </div>
      {optionsData.map((option, index) => (
        <div
          key={index}
          onClick={() => setActiveIndex(index)} 
          className={`block cursor-pointer rounded-md p-2 ${
            activeIndex === index ? 'bg-blue-500 text-white' : 'bg-transparent text-white'
          }`}
        >
          <Options
            text={option.text}
            icon={option.icon}
            isActive={activeIndex === index}
          />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
