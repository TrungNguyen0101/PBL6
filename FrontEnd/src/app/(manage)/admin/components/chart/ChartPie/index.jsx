'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';

function ChartPie() {
  const data = {
    labels: ['Đà Nẵng', 'Hồ Chí Minh', 'Hà Nội'],
    datasets: [
      {
        label: 'Số lượng của khu vực',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    type: 'doughnut',
    data,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: 'black',
          font: {
            size: 16,
          },
        },
      },
      tooltip: {
        enabled: true, // Enable the tooltip
        callbacks: {
          label: (context) => {
            const { dataset } = context;
            const label = dataset.label || '';
            const value = dataset.data[context.dataIndex];
            const total = dataset.data.reduce((acc, curr) => acc + curr, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            const city = data.labels[context.dataIndex]; // Get the corresponding city from the labels array
            return `${label}: ${city}: ${value} (${percentage}%)`;
          },
        },
      },
      datalabels: {
        display: true, // Enable datalabels
        color: 'red', // Set the color of the labels
        font: {
          size: 10, // Set the font size for labels
        },
        formatter: (value, context) => {
          const { dataset } = context;
          const total = dataset.data.reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );
          const percentage = Math.round((value / total) * 100);
          return `${value} (${percentage}%)`;
        },
      },
    },
  };

  const chartStyle = {
    height: '400px',
    width: '400px',
  };
  // console.log(Chart.plugins.getAll());

  return (
    <div className="bg-[#f9fbfc] p-[20px]  max-w-[400px] max-h-[400px]">
      <h2 className="text-[20px] font-semibold text-center">Sơ đồ tròn</h2>
      <Pie data={data} options={options} />
    </div>
  );
}

export default ChartPie;
