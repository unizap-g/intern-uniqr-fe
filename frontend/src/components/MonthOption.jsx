import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
const MonthOption = ({selectedTime,setselectedTime}) => {
  const [open, setOpen] = useState(false);
  // const [selected, setSelected] = useState("This Month");
  const codes = ["Today", "Yesterday", "Last 7 days", "This Month", "Last Month", "This Year"];
  return (
    <div className="relative w-48">
      {/* Dropdown Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full p-2 border rounded-full bg-white text-gray-700 shadow cursor-pointer border-transparent"
      >
        {selectedTime}
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {/* Dropdown List */}
      {open && (
        <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg p-2 z-10">
          {codes.map((code, index) => (
            <label
              onClick={() => {
                setselectedTime(code);
                setOpen(false);
              }}
              key={index}
              className={`flex ${selectedTime === code ? "bg-blue-100" : ""} items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer`}
            >
              {/* <input type="checkbox" className="form-checkbox" /> */}
              <span>{code}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
export default MonthOption;