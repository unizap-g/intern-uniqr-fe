import React from 'react'
import { QrCode, Printer, Gem, CircleUserRound } from 'lucide-react'

const stats = [
  {
    title: "Total QR Codes",
    value: 0,
    icon: QrCode,
    bg: "bg-orange-100",
    color: "text-orange-500"
  },
  {
    title: "Total Scans",
    value: 6,
    icon: Printer,
    bg: "bg-pink-100",
    color: "text-pink-500"
  },
  {
    title: "Total Unique Scans",
    value: 0,
    icon: Gem,
    bg: "bg-blue-100",
    color: "text-blue-500"
  },
  {
    title: "Total Visits",
    value: 6,
    icon: CircleUserRound,
    bg: "bg-green-100",
    color: "text-green-500"
  }
]

const DisplayData = () => {
  return (
    <div className="w-full h-[20%] bg-white mt-24 p-2 rounded-xl flex gap-16">
      {stats.map((item, index) => (
        <div
          key={index}
          className={`flex gap-4 p-5 ${index !== 0 ? "border-l border-gray-200" : ""}`}
        >
          <div className={`flex justify-center items-center ${item.bg} p-3 rounded-md`}>
            <item.icon className={`w-10 h-10 ${item.color}`} />
          </div>
          <div className="mt-2 text-gray-400">
            <h1>{item.title}</h1>
            <h1 className={`mt-2 font-bold ${item.color}`}>{item.value}</h1>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DisplayData