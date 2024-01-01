'use client';

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

// Chart.register(
//   ArcElement,
//   Tooltip,
//   CategoryScale,
//   LinearScale
// LineController,
// LineElement,
// PointElement,
// );

function ChartBar({ paymentStatus, percent }) {
  const [sortedMonths, setSortedMonths] = useState([]);

  useEffect(() => {
    const handleData = () => {
      const newData =
        paymentStatus.length > 0 &&
        paymentStatus.map((item) => {
          const date = new Date(item.createdAt);
          const monthName = new Intl.DateTimeFormat('en-US', {
            month: 'long',
          }).format(date);
          const year = date.getFullYear();

          return {
            createdAt: monthName,
            totalmoney: item.totalmoney,
            year: year,
          };
        });

      const newData1 =
        newData &&
        newData?.reduce((acc, item) => {
          const existingMonthIndex = acc.findIndex(
            (entry) => entry.createdAt === item.createdAt
          );

          if (existingMonthIndex !== -1) {
            acc[existingMonthIndex].totalmoney = (
              parseInt(acc[existingMonthIndex].totalmoney) +
              parseInt(item.totalmoney)
            ).toString();
          } else {
            acc.push({
              createdAt: item.createdAt,
              totalmoney: item.totalmoney,
              year: item.year,
            });
          }

          return acc;
        }, []);

      // Tính thời gian hiện tại
      // const currentDate = new Date();

      // Tạo mảng 4 tháng gần nhất
      // const recentMonths = Array.from({ length: 4 }, (_, index) => {
      //   const date = new Date(currentDate);
      //   date.setMonth(currentDate.getMonth() - index);
      //   return date.toLocaleString('en-US', { month: 'long' });
      // });
      // console.log(
      //   'file: index.jsx:70 ~ recentMonths ~ recentMonths:',
      //   recentMonths
      // );
      const currentMonth = new Date().getMonth() + 1;
      const recentMonths = [];

      for (let i = 0; i < 4; i++) {
        const month = ((currentMonth - i - 1 + 12) % 12) + 1;
        const monthName = new Date(2000, month - 1, 1).toLocaleString(
          'default',
          { month: 'long' }
        );
        recentMonths.push(monthName);
      }

      // Map qua mảng dữ liệu và trả về kết quả
      const newData123 = recentMonths.map((month) => {
        const dataForMonth =
          newData1 && newData1?.find((item) => item.createdAt === month);
        return {
          createdAt: month,
          totalmoney: dataForMonth ? dataForMonth.totalmoney : '0',
          year: dataForMonth ? dataForMonth.year : null,
        };
      });
      // Sắp xếp mảng theo tháng
      newData123.sort((a, b) => {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        if (a.year !== b.year) {
          return a.year - b.year;
        }
        return months.indexOf(a.createdAt) - months.indexOf(b.createdAt);
      });
      setSortedMonths(newData123);
    };
    handleData();
  }, [paymentStatus]);

  useEffect(() => {
    // Lấy thông tin về totalmoney của tháng cuối và tháng trước đó
    if (sortedMonths.length > 0) {
      let lastMonthTotalMoney = parseFloat(
        sortedMonths[sortedMonths.length - 1].totalmoney
      );
      let previousMonthTotalMoney = parseFloat(
        sortedMonths[sortedMonths.length - 2].totalmoney
      );

      // Tính phần trăm giảm (tăng)
      let percentageChange =
        ((lastMonthTotalMoney - previousMonthTotalMoney) /
          previousMonthTotalMoney) *
        100;
      if (percentageChange) {
        percent(percentageChange.toFixed(2));
      }
    }
  }, [sortedMonths]);
  const data = {
    labels: sortedMonths.map((month) => month.createdAt),
    datasets: [
      {
        label: 'Revenue over the past 4 months ',
        data: sortedMonths.map((month) => month.totalmoney),
        backgroundColor: [
          'rgba(52, 162, 235, 0.6)',
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
            const value = parseFloat(context.raw).toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            }); // Làm tròn giá trị đến 2 chữ số thập phân
            return `Sales: ${value}  VNĐ`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (Month)',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'VNĐ (đ)',
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
