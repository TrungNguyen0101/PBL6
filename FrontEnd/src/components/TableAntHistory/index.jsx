import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

const TableAntHistory = ({ listHistory }) => {
  console.log(listHistory);
  const [data, setData] = useState([]);
  const columns = [
    {
      title: 'Tên người nhận',
      dataIndex: 'name',
      width: 140,
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      width: 110,
    },
    {
      title: 'Địa Chỉ',
      dataIndex: 'address',
      width: 150,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalmoney',
      width: 110,
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'payment_method',
      width: 190,
      render: (_, record) => {
        let state;
        let css;
        if (record.payment_method === 'OFF') {
          state = 'Thanh toán khi nhận hàng';
        } else if (record.payment_method === 'ON') {
          state = 'Thanh toán online';
        }
        console.log('state', state);
        return (
          <span className={`font-semibold rounded-xl  ${css}`}>{state}</span>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 110,
      render: (_, record) => {
        let state;
        let css;
        if (record.payment_method === 'OFF') {
          state = 'Thanh toán khi nhận hàng';
        } else if (record.payment_method === 'ON') {
          state = 'Thanh toán online';
        }
        console.log('state', state);
        return (
          <span className={`font-semibold rounded-xl  ${css}`}>{state}</span>
        );
      },
    },
  ];
  useEffect(() => {
    setData(listHistory);
  }, [listHistory]);
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 5,
      }}
      scroll={{
        x: 300,
        y: 200,
      }}
    />
  );
};
export default TableAntHistory;
