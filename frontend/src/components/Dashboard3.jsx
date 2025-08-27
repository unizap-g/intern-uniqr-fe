import React from "react";
import { Doughnut, Line, Bubble, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BubbleController,
} from "chart.js";
import ChartCard from "./ChartCard";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BubbleController
);

const Dashboard3 = ({ scanByBrowser, scanByQrName }) => {
  const doughnutData = {
    labels: scanByBrowser.map(item => item.browser),
    datasets: [
      {
        data: scanByBrowser.map(item => item.scans),
        backgroundColor: ["#00C49F", "#FF8042", "#0088FE"],
        borderWidth: 0,
      },
    ],
  };

    const noLabelOptions = {
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      }
    };

    const axisFontOptions = {
      ...noLabelOptions,
      scales: {
        x: {
          ticks: {
            font: {
              size: 10 // x-axis font size
            }
          }
        },
        y: {
          ticks: {
            font: {
              size: 10 // y-axis font size
            }
          }
        }
      }
    };

  // Line chart data
  const lineData = {
    labels: scanByQrName.map(item => item.month),
    datasets: [
      {
        label: "Scan 1",
        data: scanByQrName.map(item => item.qr1),
        borderColor: "#FF6384",
        fill: false,
      },
      {
        label: "Scan 2",
        data: scanByQrName.map(item => item.qr2),
        borderColor: "#36A2EB",
        fill: false,
      },
    ],
  };

  // Bubble chart data
  const bubbleData = {
    datasets: [
      {
        label: "Scans",
        data: [
          { x: 0, y: 40, r: 10 },
          { x: 20, y: 30, r: 15 },
          { x: 30, y: 60, r: 12 },
          { x: 40, y: 50, r: 18 },
          { x: 50, y: 80, r: 8 },
        ],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Doughnut Chart */}
      <ChartCard title="Scans by browser">
          <Doughnut data={doughnutData} />

      </ChartCard>

      {/* Line Chart */}
      <ChartCard title="Scans by QR name">

          <Line data={lineData} options={axisFontOptions} />

      </ChartCard>

      {/* Bubble Chart */}
      <ChartCard title="Scans by time of day">
        <Bubble data={bubbleData}  />
      </ChartCard>
    </div>
  );
};

export default Dashboard3