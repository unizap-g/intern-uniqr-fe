// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const Dashboard2 = ({scanActivity}) => {
//   const data = {
//     labels: scanActivity.map(item => item.date),
//     datasets: [
//       {
//         data: scanActivity.map(item => item.scans),
//         backgroundColor: "rgba(59, 130, 246, 1)",
//         borderRadius: 8,
//         barPercentage: 0.2,
//         opacity : 0.7,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     // maintainAspectRatio: false, 
//     plugins: {
//       legend: { display: false },
//       title: {
//         display: true,
//         text: "Scan Activity",
//         font: {
//           size: 16,
//           weight: "bold",
//           lineHeight: 1.2,
//         },
//         align: "start",
//         padding : {
//          bottom : 24
//         }
//       },
//     },
//     scales: {
//       y: {
//         min: 0,
//         max: Math.max(...scanActivity.map(item => item.scans)) + 20,
//       },
//       x: {
//         ticks: {
//           font: { size: 10 },
//         },
//       },
//     },
//   };

//   return (
//     <div className="bg-white p-4 rounded-xl shadow h-full ">
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default Dashboard2;

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

const Dashboard2 = ({ scanActivity }) => {
  const data = {
    labels: scanActivity.map((item) => item.date),
    datasets: [
      {
        data: scanActivity.map((item) => item.scans),
        backgroundColor: "rgba(59, 130, 246, 1)",
        borderRadius: 8,
        barPercentage: 0.3,
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

  return (
    <div className="bg-white p-4 rounded-xl shadow w-full h-[300px] sm:h-[250px] md:h-[350px] lg:h-[500px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Dashboard2;

