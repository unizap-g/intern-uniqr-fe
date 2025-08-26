import { useState } from "react";

export default function OtpBox({ length = 6, onChangeOTP }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false; 

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);


    if (element.value !== "" && element.nextSibling) {
      element.nextSibling.focus();
    }

    onChangeOTP(newOtp.join(""));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  return (
    <div className="flex space-x-2 justify-center">
      {otp.map((data, i) => (
        <input
          key={i}
          autoFocus={i === 0}

          type="text"
          maxLength="1"
          value={otp[i]}
          onChange={(e) => handleChange(e.target, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-12 h-12 text-center border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
      ))}
    </div>
  );
}
