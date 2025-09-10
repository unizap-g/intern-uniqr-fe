// Options to reduce font size for PolarArea charts
import React from 'react'
import { Doughnut,PolarArea,Bar,Line, Bubble } from 'react-chartjs-2'
import ChartCard from './ChartCard';

import {Chart as ChartJS,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement,
  BubbleController,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement,
  BubbleController
);

const polarOptions = {
  plugins: {
    legend: {
      labels: {
        font: {
          size: 10 // Legend font size
        }
      }
    },
    tooltip: {
      bodyFont: {
        size: 10 // Tooltip font size
      }
    }
  },
  scales: {
    r: {
      ticks: {
        font: {
          size: 10 // Value label font size
        }
      }
    }
  }
};

const noLabelOptions = {
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
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


const DashboardComp = ({ scansByOS, scansByCountry, scansByCity, scanActivity, scansByBrowser, scansByQrName, scansByTimeOfDay }) => {

  const OSData = {
    labels: scansByOS.map(item => item.os),
    datasets: [
      {
        data: scansByOS.map(item => item.count),
        backgroundColor: ["#10b987", "#3b82f6", "#1e3a8a", "#f87171"],
      },
    ],
  };

  const countryData = {
    labels: scansByCountry.map(item => item.country),
    datasets: [
      {
        data: scansByCountry.map(item => item.count),
        backgroundColor: ["#60a5fa", "#f87171", "#facc15", "#34d399"],
      },
    ],
  };

  const cityData = {
    labels: scansByCity.map(item => item.city),
    datasets: [
      {
        data: scansByCity.map(item => item.count),
        backgroundColor: ["#93c5fd", "#fda4af", "#fde047", "#6ee7b7"],
      },
    ],
  };

  const barData = {
    labels: scanActivity.map((item) => item.datetime),
    datasets: [
      {
        data: scanActivity.map((item) => item.count),
        backgroundColor: "rgba(59, 130, 246, 1)",
        borderRadius: 8,
        barPercentage: 0.3,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Scan Activity",
        font: {
          size: 16,
          weight: "bold",
          lineHeight: 1.2,
        },
        align: "start",
        padding: { bottom: 24 },
      },
    },
    scales: {
      y: {
        min: 0,
        max: Math.max(...scanActivity.map((item) => item.scans)) + 20,
        ticks: {
          font: { size: 12 },
        },
      },
      x: {
        ticks: {
          font: { size: 10 },
        },
      },
    },
  };

  const doughnutData = {
    labels: scansByBrowser.map(item => item.browser),
    datasets: [
      {
        data: scansByBrowser.map(item => item.count),
        backgroundColor: ["#00C49F", "#FF8042", "#0088FE"],
        borderWidth: 0,
      },
    ],
  };

  const lineData = {
    labels: scansByQrName.map(item => item.qrName),
    datasets: [
      {
        label: "Scan 1",
        data: scansByQrName.map(item => item.count),
        borderColor: "#FF6384",
        fill: false,
      },
      {
        label: "Scan 2",
        data: scansByQrName.map(item => item.count),
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
        data: scansByTimeOfDay.map((item) => {
          const date = new Date(item.timeUTC);
          const hours = date.getUTCHours();

          return{
            x: hours,
            y: item.count,
            r: Math.sqrt(item.count) *  2
          }
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className='mt-6 space-y-6'>
    
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      <ChartCard title={"Scans by operating system"}>
        <Doughnut data={OSData} />
      </ChartCard>

      <ChartCard title={"Scans by country"}>
        <PolarArea data={countryData} options={polarOptions} />
      </ChartCard>

      <ChartCard title={"Scans by city"}>
        <PolarArea data={cityData} options={polarOptions} />
      </ChartCard>
      </div>

      <div className="bg-white p-4 rounded-xl shadow w-full h-[300px] sm:h-[250px] md:h-[350px] lg:h-[500px]">
      <Bar data={barData} options={barOptions} />
    </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      <ChartCard title="Scans by Browser">
        <Doughnut data={doughnutData} />
      </ChartCard>

      <ChartCard title="Scans by QR Name">
        <Line data={lineData} options={axisFontOptions} />
      </ChartCard>

      <ChartCard title="Scans by Time of Day">
        <Bubble data={bubbleData} />
      </ChartCard>
      </div>

    
    </div>
  )
}

export default DashboardComp;