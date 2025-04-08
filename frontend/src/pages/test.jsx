// components/LineChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần cần dùng của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: ["Ngày 1", "Ngày 2", "Ngày 3", "Ngày 4", "Ngày 5"], // Các ngày
    datasets: [
      {
        label: "Lượng calo ăn",
        data: [2200, 2500, 2100, 2300, 2400], // Dữ liệu calo ăn mỗi ngày
        borderColor: "rgba(34, 197, 94, 1)", // Màu đường line
        backgroundColor: "rgba(34, 197, 94, 0.2)", // Màu nền của đường line
        fill: true, // Làm nền cho biểu đồ
        tension: 0.4, // Làm cho đường line mềm mại
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Lượng Calo ăn theo ngày",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Ngày",
        },
      },
      y: {
        title: {
          display: true,
          text: "Calo (kcal)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 max-w-3xl mx-auto">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
