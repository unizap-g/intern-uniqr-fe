import React, { useState } from "react";
import { X } from "lucide-react";

export default function CompleteComp({url,baseQr, isOpen, onClose, onPay }) {
  const [showSlider, setShowSlider] = useState(false);
  const [size, setSize] = useState(500); // default 500x500
  const [isCustomSize, setIsCustomSize] = useState(false);
  const [shareMsg, setShareMsg] = useState(""); // message for sharing

  if (!isOpen) return null;

  const handleDownloadClick = () => {
    setShowSlider(!showSlider);
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setSize(newSize);
    setIsCustomSize(newSize !== 500); // detect if user changed from default
  };
const handleDownload = (base64Data,fileName='qr-code.png') => {
    try {
      // Remove prefix if exists
      const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, "");
      const byteCharacters = atob(base64Image);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });

      // Create object URL and trigger download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();

      // Release memory
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleConfirmDownload = () => {
    if (!isCustomSize) {
      onPay(size);
      handleDownload(baseQr);
    //   alert(`Downloading QR of size ${size}x${size}`);
    }
  };

  const handleShare = () => {
    const qrUrl = url; // replace with your QR link
    navigator.clipboard.writeText(qrUrl).then(() => {
      setShareMsg(`✅ URL ${qrUrl} copied to clipboard!`);
      setTimeout(() => setShareMsg(""), 3000); // remove after 3 sec
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl relative shadow-xl w-[90%] sm:w-[420px] p-6 text-center animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-red-100 transition active:scale-90"
        >
          <X className="h-6 w-6 text-red-500" />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 rounded-full border-2 border-green-500 flex items-center justify-center shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          QR Created Successfully
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Your QR has been created. Choose your next action.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-2">
          <button
            onClick={handleShare}
            className="px-6 py-2 rounded-xl border border-gray-300 bg-gray-50 hover:bg-gray-100 shadow-sm transition"
          >
            Share
          </button>
          <button
            onClick={handleDownloadClick}
            className="px-6 py-2 rounded-xl bg-blue-600 text-white shadow-md hover:bg-blue-700 transition"
          >
            Download Now
          </button>
        </div>

        {/* Share message */}
        {shareMsg && (
          <p className="text-green-600 text-sm font-medium mb-3 animate-fadeIn">
            {shareMsg}
          </p>
        )}

        {/* Slider Section with smooth transition */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showSlider ? "max-h-60 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
            <label className="block text-gray-700 font-medium mb-2">
              Select Size:{" "}
              <span className="text-blue-600">
                {size} x {size}
              </span>
            </label>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={size}
              onChange={handleSizeChange}
              className="w-full accent-blue-600"
            />

            {/* Warning if size ≠ 500 */}
            {isCustomSize && (
              <p className="text-sm text-red-500 mt-2 font-medium">
                ⚠️ Custom sizes require <span className="font-semibold">Pro Version</span>.
              </p>
            )}

            <button
              onClick={handleConfirmDownload}
              disabled={isCustomSize}
              className={`mt-4 w-full px-6 py-2 rounded-xl shadow-md transition 
                ${
                  isCustomSize
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
            >
              Confirm & Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
