import React from "react";

const ChartCard = ({ title, children }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-sm">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="h-64 flex items-center justify-center">{children}</div>
    </div>
  );
};

export default ChartCard;
// export default ChartCard;
