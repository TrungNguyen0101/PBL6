'use client';
import React from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
// import './styled.scss';
import { useEffect } from 'react';

const TableAnt = ({ dataAccount }) => {
  console.log(dataAccount);
  const [data, setData] = React.useState([]);
  useEffect(() => {
    const handleGetAllAccount = async () => {
      if (dataAccount.length > 0) {
        setData(dataAccount);
      }
    };
    handleGetAllAccount();
  }, [dataAccount]);
  const columns = [
    {
      title: 'Title',
      dataIndex: 'booktitle',
      key: 'booktitle',
      width: 10,
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      width: 10,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 10,
    },
    {
      title: 'Count',
      dataIndex: 'Count',
      key: 'Count',
      width: 7,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 7,
    },
  ];

  return (
    <div className="max-h-[400px]">
      <h1 className="mb-2 text-2xl font-semibold">Thông tin các sách đặt</h1>
      <Table
        columns={columns}
        dataSource={data}
        className="max-h-[400px] mb-5"
        pagination={{
          showSizeChanger: true, // Hiển thị tùy chọn lựa chọn pageSize
          pageSizeOptions: ['2', '4', '8'], // Các tùy chọn pageSize
          defaultPageSize: 2, // Kích thước mặc định của pageSize
        }}
        scroll={{
          x: 620,
          y: 227,
        }}
      />
    </div>
  );
};
export default TableAnt;
