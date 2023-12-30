'use client';
import React from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
// import './styled.scss';
import { useEffect } from 'react';

const TableAnt = ({ dataAccount }) => {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    if (dataAccount?.book?.length === 1) {
      setData(dataAccount?.book);
    } else {
      const bookList = sessionStorage.getItem('bookList');
      console.log('bl', JSON.parse(bookList));
      setData(JSON.parse(bookList)?.book);
    }
  }, [dataAccount?.book]);
  // useEffect(() => {
  //   const count = sessionStorage.getItem('count');
  //   if (!count) return;
  //   const handleGetAllAccount = async () => {
  //     const newData = dataAccount?.book?.map((x) => {
  //       return {
  //         ...x,
  //         price: Number((x.price * count * (100 - x.discount)) / 100),
  //       };
  //     });
  //     if (dataAccount?.book?.length > 0) {
  //       setData(newData);
  //     }
  //   };
  //   handleGetAllAccount();
  // }, [dataAccount?.book]);

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
      width: 7,
      render: (_, record) => {
        console.log('rc', record);
        let state;
        let css;
        if (record.discount === 0) {
          state = Number(record.Count * record.price);
        } else if (record.discount > 0) {
          state = Number(
            (record.price * record.Count * (100 - record.discount)) / 100
          );
        }
        return (
          <span className={`font-semibold rounded-xl  ${css}`}>{state}</span>
        );
      },
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
