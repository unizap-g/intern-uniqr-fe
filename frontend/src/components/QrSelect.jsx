// import React, { useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";
// const QrSelect = () => {
//   const [open, setOpen] = useState(false);
//   const [selected, setSelected] = useState("All QR Code");
//   const codes = ["Code 1", "Code 2", "Code 3", "Code 4", "Code 5", "Code 6"];
//   return (
//     <div className="relative w-48">
//       {/* Dropdown Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex justify-between items-center w-full p-2 border rounded-full bg-white text-gray-700 shadow cursor-pointer border-transparent"
//       >
//         {selected}
//         {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//       </button>
//       {/* Dropdown List */}
//       {open && (
//         <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg p-2 z-10">
//           {codes.map((code, index) => (
//             <label
//               key={index}
//               className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
//             >
//               <input type="checkbox" className="form-checkbox" />
//               <span>{code}</span>
//             </label>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
// export default QrSelect;

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const QrSelect = () => {
  const [open, setOpen] = useState(false);
  const [selectedCodes, setSelectedCodes] = useState([]);
  const codes = ["Code 1", "Code 2", "Code 3", "Code 4", "Code 5", "Code 6"];

  return (
    <div className="relative w-48">
      {/* Dropdown Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full p-2 border rounded-full bg-white text-gray-700 shadow cursor-pointer border-transparent"
      >
        All QR Code
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Dropdown List */}
      {open && (
        <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg p-2 z-10">
          {codes.map((code, index) => (
            <label
              key={index}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
            >
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedCodes.includes(code)}
                onChange={() => {
                  if (selectedCodes.includes(code)) {
                    setSelectedCodes(selectedCodes.filter((c) => c !== code));
                  } else {
                    setSelectedCodes([...selectedCodes, code]);
                  }
                }}
              />
              <span>{code}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default QrSelect;
