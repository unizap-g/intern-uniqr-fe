import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Dashboard3 from "./Dashboard3";
import DisplayData from "./DisplayData";
import QrSelect from "./QrSelect";
import Dashboard1 from "./Dashboard1";
import MonthOption from "./MonthOption";
import Dashboard2 from "./Dashboard2";
import DashboardData from "../data/Data.json";

const MainDashboard = () => {
//   console.log(DashboardData);
  const [totalScans, setTotalScans] = useState(0);
  const [selectedTime, setselectedTime] = useState("This Month");
  const [uniqueScans, setUniqueScans] = useState(0);
  const [totalVisit, setTotalVisit] = useState(0);
  // console.log(DashboardData);
  useEffect(() => {
    DashboardData.qrCodes.forEach((e) => {
      setTotalScans((prev) => prev + e.scans);
      setUniqueScans((prev) => prev + e.uniqueScans);

      setTotalVisit((prev) => prev + e.visits);
    });
  }, []);
  // useEffect(() => {
  //   const todayDate = new Date();
  //   let newScanDate = new Date();

  //   switch (selectedTime) {
  //     case "Today":
  //       // Keep today's date
  //       newScanDate = todayDate;
  //       break;

  //     case "Yesterday":
  //       newScanDate.setDate(todayDate.getDate() - 1);
  //       break;

  //     case "Last 7 days":
  //       newScanDate.setDate(todayDate.getDate() - 7);
  //       break;

  //     case "This Month":
  //       // Start from the 1st day of this month
  //       newScanDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
  //       break;

  //     case "Last Month":
  //       // Start from the 1st day of last month
  //       newScanDate = new Date(todayDate.getFullYear(), todayDate.getMonth() - 1, 1);
  //       break;

  //     case "This Year":
  //       // Start from Jan 1st of this year
  //       newScanDate = new Date(todayDate.getFullYear(), 0, 1);
  //       break;

  //     default:
  //       newScanDate = todayDate;
  //       break;
  //   }


  //   console.log("Selected:", selectedTime, "| Scan Date set to:", newScanDate);
  //   const filterData = DashboardData.map((qr) => {
  //     const qrDate = 
  //     return qrDate >= newScanDate && qrDate <= todayDate;
  //   });
  // }, [selectedTime]);
  return (
    <div className="bg-blue-50 w-full md:w-4/5">
      <Navbar />
      <div className="p-8">
        <div className="flex justify-between items-center w-full">
          <QrSelect />
          <MonthOption selectedTime={selectedTime} setselectedTime={setselectedTime} />
        </div>
        <div className="mt-8 mb-8">
          <DisplayData
            TotalQr={DashboardData.qrCodes.length}
            Totalscan={totalScans}
            uniqueScans={uniqueScans}
            totalVisit={totalVisit}
          />
        </div>
        <Dashboard1 scanByOs={DashboardData.scansByOS} scanByCountry={DashboardData.scansByCountry} scanByCity={DashboardData.scansByCity} />
        <div className="mt-5 mb-5">
            <Dashboard2 scanActivity={DashboardData.scanActivity} />
        </div>
        <div>
            <Dashboard3 scanByBrowser={DashboardData.scansByBrowser} scanByQrName={DashboardData.scansByQRName} scanByTimeOfDay={DashboardData.scansByTimeOfDay} />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
