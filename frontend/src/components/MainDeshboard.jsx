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
  console.log(DashboardData);
  const [totalScans, setTotalScans] = useState(0);
  const [uniqueScans, setUniqueScans] = useState(0);
  const [totalVisit, setTotalVisit] = useState(0);
  useEffect(() => {
    DashboardData.qrCodes.forEach((e) => {
      setTotalScans((prev) => prev + e.scans);
      setUniqueScans((prev) => prev + e.uniqueScans);

      setTotalVisit((prev) => prev + e.visits);
    });
  }, []);
  console.log(totalScans);
  console.log(uniqueScans);

  return (
    <div className="bg-blue-50 w-4/5">
      <Navbar />
      <div className="p-8">
        <div className="flex justify-between items-center w-full">
          <QrSelect />
          <MonthOption />
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
