'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';
Chart.register(ArcElement, Tooltip);

function ChartPie({role}) {
  const data = {
    labels: ['Admin', 'User'],
    datasets: [
      {
        label: 'Total Account',
        data: [role.role1, role.role3],
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
        display: false,
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
            const city = data.labels[context.dataIndex];
            return `${label} ${city}: ${value} (${percentage}%)`;
          },
        },
      },
      datalabels: {
        display: false, // Tắt hiển thị nhãn trên biểu đồ
        color: 'black',
        font: {
          size: 10,
        },
        formatter: (value, context) => {
          // ...
        },
      },
    },
  };

  return (
    <figure className="flex flex-col items-center">
      <h2 className="text-[20px] font-semibold text-center">
        Chart Of Accounts
      </h2>
      <div className="max-w-[250px] max-h-[300px]">
        <Pie data={data} options={options} />
      </div>
      <figcaption className="flex flex-wrap items-center gap-x-[15px] mt-[10px] gap-y-[10px]">
        <div className="flex items-center gap-x-[10px]">
          <div className="bg-[#36a2eb] w-[50px] h-[20px]" />
          <span>User</span>
        </div>
        {/* <div className="flex items-center gap-x-[10px]">
          <div className="bg-[#36a2eb] w-[50px] h-[20px]" />
          <span>Manage</span>
        </div> */}
        <div className="flex items-center gap-x-[10px]">
          <div className="bg-[#ff6384] w-[50px] h-[20px]" />
          <span>Admin</span>
        </div>
      </figcaption>
    </figure>
  );
}

export default ChartPie;
