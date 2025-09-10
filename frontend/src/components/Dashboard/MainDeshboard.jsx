import React, { useEffect, useState } from "react";
import DisplayData from "./DisplayData";
import QrSelect from "./QrSelect";
import DashboardComp from "./DashboardComp";
import MonthOption from "./MonthOption";
import { useOutletContext } from "react-router-dom";
// import DashboardData from "../../data/Data.json";

const MainDashboard = () => {
  // Get dashboard data from outlet context
  const { dashboardData } = useOutletContext() || {};
  //console.log("[DEBUG] MainDashboard received dashboardData:", dashboardData);
  
  const [totalScans, setTotalScans] = useState(0);
  const [selectedTime, setselectedTime] = useState(" ");
  const [uniqueScans, setUniqueScans] = useState(0);
  const [totalVisit, setTotalVisit] = useState(0);
  const [totalQr, setTotalQr] = useState(0);
  
  useEffect(() => {
    if(dashboardData?.summary){
      setTotalQr(dashboardData.summary.totalQRCodes || 0);
      setTotalScans(dashboardData.summary.totalScans || 0);
      setUniqueScans(dashboardData.summary.totalUniqueScans || 0);
      setTotalVisit(dashboardData.summary.totalVisits || 0);
    }
  },[dashboardData]);

  return (
    <div className="bg-blue-50 mt-0 w-full">
      {/* <Navbar /> */}
      <div className="p-8">
        <div className="flex justify-between items-center w-full">
          <QrSelect />
          <MonthOption
            selectedTime={dashboardData.filters.dateRange.type || " "}
            setselectedTime={selectedTime}
          />
        </div>
        <div className="mt-8 mb-8">
          <DisplayData
            TotalQr={totalQr}
            Totalscan={totalScans}
            uniqueScans={uniqueScans}
            totalVisit={totalVisit}
          />
        </div>
        
        {dashboardData?.charts && (
          <DashboardComp
          scansByOS={dashboardData.charts.scansByOS}
          scansByCountry={dashboardData.charts.scansByCountry}
          scansByCity={dashboardData.charts.scansByCity}
          scanActivity={dashboardData.charts.scanActivity}
          scansByBrowser={dashboardData.charts.scansByBrowser}
          scansByQrName={dashboardData.charts.scansByQRName}
          scansByTimeOfDay={dashboardData.charts.scansByTimeOfDay}
        />
        )}
      </div>
    </div>
  );
};

export default MainDashboard;
