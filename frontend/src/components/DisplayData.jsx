// import React from 'react'
// import { QrCode, Printer, Gem, CircleUserRound } from 'lucide-react'



// const DisplayData = ({ TotalQr, Totalscan, uniqueScans, totalVisit }) => {
//   const stats = [
//     {
//       title: "Total QR Codes",
//       value: TotalQr,
//       icon: QrCode,
//     bg: "bg-orange-100",
//     color: "text-orange-500"
//   },
//   {
//     title: "Total Scans",
//     value: Totalscan,
//     icon: Printer,
//     bg: "bg-pink-100",
//     color: "text-pink-500"
//   },
//   {
//     title: "Total Unique Scans",
//     value: uniqueScans,
//     icon: Gem,
//     bg: "bg-blue-100",
//     color: "text-blue-500"
//   },
//   {
//     title: "Total Visits",
//     value: totalVisit,
//     icon: CircleUserRound,
//     bg: "bg-green-100",
//     color: "text-green-500"
//   }
// ]
//   return (
//     <div className="w-full h-[20%] bg-white p-2 rounded-xl flex gap-16">
//       {stats.map((item, index) => (
//         <div
//           key={index}
//           className={`flex gap-4 p-5 ${index !== 0 ? "border-l border-gray-200" : ""}`}
//         >
//           <div className={`flex justify-center items-center ${item.bg} p-3 rounded-md`}>
//             <item.icon className={`w-10 h-10 ${item.color}`} />
//           </div>
//           <div className="mt-2 text-gray-400">
//             <h1>{item.title}</h1>
//             <h1 className={`mt-2 font-bold ${item.color}`}>{item.value}</h1>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default DisplayData




import React from "react";
import { QrCode, Printer, Gem, CircleUserRound } from "lucide-react";

const DisplayData = ({ TotalQr, Totalscan, uniqueScans, totalVisit }) => {
  const stats = [
    {
      title: "Total QR Codes",
      value: TotalQr,
      icon: QrCode,
      bg: "bg-orange-100",
      color: "text-orange-500",
    },
    {
      title: "Total Scans",
      value: Totalscan,
      icon: Printer,
      bg: "bg-pink-100",
      color: "text-pink-500",
    },
    {
      title: "Total Unique Scans",
      value: uniqueScans,
      icon: Gem,
      bg: "bg-blue-100",
      color: "text-blue-500",
    },
    {
      title: "Total Visits",
      value: totalVisit,
      icon: CircleUserRound,
      bg: "bg-green-100",
      color: "text-green-500",
    },
  ];

  return (
    <div className="w-full bg-white p-4 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg shadow-sm"
        >
          <div
            className={`flex justify-center items-center ${item.bg} p-3 rounded-md`}
          >
            <item.icon className={`w-10 h-10 ${item.color}`} />
          </div>
          <div className="text-gray-600">
            <h1 className="text-sm font-medium">{item.title}</h1>
            <h1 className={`mt-1 text-lg font-bold ${item.color}`}>
              {item.value}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayData;