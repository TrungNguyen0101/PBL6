import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useTranslation } from 'react-i18next';

const TableAntHistory = ({ listHistory }) => {
  const { t } = useTranslation('info');
  const [data, setData] = useState([]);
  const columns = [
    {
      title: t('RecipientName'),
      dataIndex: 'name',
      width: 140,
    },
    {
      title: t('Phone'),
      dataIndex: 'phone',
      width: 110,
    },
    {
      title: t('Address'),
      dataIndex: 'address',
      width: 150,
    },
    {
      title: t('Totalmoney'),
      dataIndex: 'totalmoney',
      width: 110,
    },
    {
      title: t('Paymentmethods'),
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
        return (
          <span className={`font-semibold rounded-xl  ${css}`}>{state}</span>
        );
      },
    },
    {
      title: t('Status'),
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
