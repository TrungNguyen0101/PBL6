'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  ArcElement,
  CategoryScale,
  // LinearScale,
  // LineController,
  // LineElement,
  // PointElement,
  // Tooltip,
} from 'chart.js';

Chart.register(
  ArcElement,
  CategoryScale
  // Tooltip,
  // LinearScale,
  // LineController,
  // LineElement,
  // PointElement
);

function ChartBar() {
  const data = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
    datasets: [
      {
        label: 'Doanh Thu',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw.toFixed(2); // Làm tròn giá trị đến 2 chữ số thập phân
            return `Doanh thu: ${value} triệu VNĐ`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Thời gian (Tháng)',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Triệu (VNĐ)',
        },
      },
    },
  };

  return (
    // <div className="flex flex-col items-center justify-center bg-[#f9fbfc] p-[20px] md:max-w-[600px] sm:max-w-[500px] max-w-[400px]">
    <div className="flex flex-col items-center justify-center bg-[#f9fbfc] p-[20px] lg:w-[80%] w-full">
      <h2 className="text-[20px] font-semibold text-center">Sales Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ChartBar;
