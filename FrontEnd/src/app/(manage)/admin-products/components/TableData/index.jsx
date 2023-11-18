'use client';
import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table, message } from 'antd';
import './styled.scss';
import axios from 'axios';

const TableData = () => {
  const columns = [
    {
      title: 'Title',
      width: 20,
      dataIndex: 'booktitle',
      key: 'booktitle',
    },
    {
      title: 'Price',
      width: 10,
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      width: 15,
    },
    {
      title: 'Publisher',
      dataIndex: 'publisher',
      key: 'publisher',
      width: 10,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 10,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 10,
    },

    {
      title: 'Action',
      key: 'action',
      width: 10,
      render: (text, record) => (
        <div className="flex items-center gap-x-[10px] pl-[-10px] ml-[-10px]">
          <Popconfirm
            title="Are you sure to delete this record?"
            onConfirm={() => handleDelete(record.id)}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" size="small">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7 21q-.825 0-1.413-.588T5 19V6q-.425 0-.713-.288T4 5q0-.425.288-.713T5 4h4q0-.425.288-.713T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"
                />
              </svg>
            </Button>
          </Popconfirm>
          <button type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6V19ZM19.3 8.925l-4.25-4.2L17.875 1.9L22.1 6.125l-2.8 2.8ZM3 21v-4.25l10.6-10.6l4.25 4.25L7.25 21H3ZM14.325 9.675l-.7-.7l1.4 1.4l-.7-.7Z"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log('file: index.jsx:93 ~ TableData ~ isLoading:', isLoading);
  const handleDelete = (rowId) => {
    const updatedData = data.filter((row) => row.id !== rowId);
    setData(updatedData);
    message.success('Record deleted successfully');
  };
  useEffect(() => {
    try {
      setIsLoading(true);
      const hanldeGetAllBooks = async () => {
        const { data } = await axios.get('http://localhost:3030/api/book');
        setData(data.data.books);
        setIsLoading(false);
      };
      hanldeGetAllBooks();
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="max-h-[400px]">
      {isLoading ? (
        <div></div>
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          className="max-h-[400px]"
          pagination={{
            showSizeChanger: true, // Hiển thị tùy chọn lựa chọn pageSize
            pageSizeOptions: ['4', '8', '12'], // Các tùy chọn pageSize
            defaultPageSize: 4, // Kích thước mặc định của pageSize
          }}
          scroll={{
            x: 800,
            y: 227,
          }}
        />
      )}
    </div>
  );
};
export default TableData;
