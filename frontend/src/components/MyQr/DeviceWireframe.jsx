import React from "react";

export default function MobileWireframe({ qrLink, step, url, qrName }) {
  // console.log(qrLink)

  return (
    <div className="flex  justify-center h-full w-full items-centerbg-blue-50">
      {/* Phone frame */}
      <div className="relative  aspect-[1/2] h-full bg-black rounded-[48px] shadow shadow-lg overflow-hidden border-[6px] border-black">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-30 flex justify-center items-center space-x-2">
          {/* Speaker grill */}
          <div className="w-16 h-1 bg-gray-700 rounded"></div>
          {/* Camera dot */}
          <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
        </div>

        {/* Side buttons */}
        {/* Left (volume) */}
        <div className="absolute -left-1 top-24 w-1.5 h-12 bg-gray-700 rounded-r-lg"></div>
        <div className="absolute -left-1 top-44 w-1.5 h-20 bg-gray-700 rounded-r-lg"></div>
        {/* Right (power) */}
        <div className="absolute -right-1 top-36 w-1.5 h-16 bg-gray-700 rounded-l-lg"></div>

        {/* Screen */}
        <div className="absolute inset-[8px] bg-white rounded-[40px] overflow-y-auto">
          {/* Browser bar */}
          {step > 1 && (
            <div>
              <div className="border-b mt-5 p-2">
                <input
                  type="text"
                  readOnly
                  value={url ? `https://www.${url}` : ""}
                  placeholder="www.mywebsite.com"
                  className="w-full border rounded px-2 py-1 text-sm text-gray-600 bg-gray-100"
                />
              </div>

              {/* Image placeholder */}
              <div className="bg-gray-200 flex justify-center items-center   rounded-lg w-11/12 h-36 mx-auto mt-4">
                {qrLink &&step===3 && (
                  <img
                    src={`data:image/png;base64,${qrLink}`}
                    alt="sam"
                    className="aspect-square h-full object-cover"
                  />
                )}
              </div>

              {/* Text lines */}
              <div className="mt-4 space-y-2 px-6">
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>

              {/* Button */}
              <div className="mt-6 w-full  px-6">
                {qrName ? (
                  <div className="h-10 w-full flex justify-center items-center text-gray-500 bg-gray-200 rounded-lg">
                    {qrName}
                  </div>
                ) : (
                  <div className="h-10 w-full flex justify-center text-gray-500 items-center bg-gray-200 rounded-lg"></div>
                )}
              </div>

              {/* Circle avatars */}
              <div className="flex justify-center gap-6 mt-8 mb-20">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom home indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
}
