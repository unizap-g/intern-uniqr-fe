import React, { useState } from "react";


const ProfileModal = ({ isOpen, onClose }) => {
  const [gender, setGender] = useState("male");
  const [isTapOpen, setIsTapOpen] = useState(false);
  return (
    <>
    {isOpen && (
        <div className="fixed inset-0 w-full h-full z-20 bg-white/30 backdrop-blur-sm">
        </div>
    )}

    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{ background: isOpen ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0)' }}
    >
      <div
        className={`relative bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 z-10 ml-40 transform transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img
              src="profilePhoto.jpg"
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="font-semibold">New User</p>
              <p className="text-gray-500 text-sm">8101467223</p>
            </div>
          </div>
          <button className="px-4 py-2 border rounded-lg font-bold text-blue-600 hover:bg-blue-50 hover:cursor-pointer">
            Change Photo
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border text-gray-500 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Mobile</label>
              <input
                type="text"
                value="8101467223"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value="md.ekbal@senrysa.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 hover:cursor-pointer"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Set Password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          <div>
            <span className="text-gray-700">Gender</span>
            <div className="flex items-center space-x-4 mt-1">
              <label className={gender === "male" ? "text-blue-600 font-semibold" : "text-gray-700"}>
                <input
                  type="radio"
                  name="gender"
                  className="mr-1 hover:cursor-pointer"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                />
                Male
              </label>
              <label className={gender === "female" ? "text-blue-600 font-semibold" : "text-gray-700"}>
                <input
                  type="radio"
                  name="gender"
                  className="mr-1 hover:cursor-pointer"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                />
                Female
              </label>
              <label className={gender === "others" ? "text-blue-600 font-semibold" : "text-gray-700"}>
                <input
                  type="radio"
                  name="gender"
                  className="mr-1 hover:cursor-pointer"
                  checked={gender === "others"}
                  onChange={() => setGender("others")}
                />
                Others
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              type="button"
              className="bg-red-500 px-6 py-2 rounded-lg border border-gray-300 text-white hover:bg-red-700 hover:cursor-pointer"
              onClick={()=>{
                onClose()
                setIsTapOpen(false)}}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default ProfileModal;