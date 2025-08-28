
// Options to reduce font size for PolarArea charts
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
import React from 'react'
import { Doughnut,PolarArea } from 'react-chartjs-2'
import ChartCard from './ChartCard';

import {Chart as ChartJS,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

const doughnutData = {
    // labels: ["Windows", "MacOS", "Linux", "Other"],
    datasets: [
      {
        data: [300, 200, 100, 150],
        backgroundColor: ["#10b981", "#3b82f6", "#1e3a8a", "#f87171"],
      },
    ],
  };

const countryData = {
    // labels: ["USA", "India", "Germany", "UK"],
    datasets: [
      {
        data: [120, 90, 70, 50],
        backgroundColor: ["#60a5fa", "#f87171", "#facc15", "#34d399"],
      },
    ],
  };

const cityData = {
    // labels: ["New York", "Mumbai", "Berlin", "London"],
    datasets: [
      {
        data: [80, 60, 100, 40],
        backgroundColor: ["#93c5fd", "#fda4af", "#fde047", "#6ee7b7"],
      },
    ],
  };

const Dashboard1 = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      <ChartCard title={"Scans by operating system"}>
        <Doughnut data={doughnutData} />
      </ChartCard>

      <ChartCard title={"Scans by country"}>
        <PolarArea data={countryData} options={polarOptions} />
      </ChartCard>

      <ChartCard title={"Scans by city"}>
        <PolarArea data={cityData} options={polarOptions} />
      </ChartCard>
    </div>
  )
}

export default Dashboard1
