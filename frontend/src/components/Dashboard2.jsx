import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard2 = () => {
  const data = {
    labels: [
      "01-Aug",
      "03-Aug",
      "07-Aug",
      "09-Aug",
      "11-Aug",
      "13-Aug",
      "15-Aug",
      "17-Aug",
      "19-Aug",
      "21-Aug",
      "23-Aug",
      "25-Aug",
      "27-Aug",
      "29-Aug",
    ],
    datasets: [
      {
        data: [
          1200, 1900, 2500, 2500, 2200, 1800, 1600,
          2300, 2400, 800, 1200, 2200, 1900, 2400,
        ],
        backgroundColor: "rgba(59, 130, 246, 1)",
        borderRadius: 8,
        barPercentage: 0.2,
      },
    ],
  };

  const options = {
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
      },
    },
    scales: {
      y: {
        min: 0,
        max: 2500,
      },
      x: {
        ticks: {
          font: { size: 10 },
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow h-100">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Dashboard2;
