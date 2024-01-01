'use client';
import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table, message } from 'antd';
import './styled.scss';
import axios from 'axios';
import { deleteBook, getAllBook } from '@/services/bookService';
import Link from 'next/link';
import LoadingPage from '@/components/LoadingPage';

const TableData = ({ handleOnEdit, listBook, hanldeGetAllBooks }) => {
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
        <div className="flex items-center gap-x-[10px] ">
          <Popconfirm
            title="Are you sure to delete this record?"
            onConfirm={() => handleDelete(record._id)}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" size="small" className="p-0">
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
          <button type="button" onClick={() => handleEdit(record._id)}>
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
          <Link href={`product/${record._id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 48 48"
            >
              <g fill="none">
                <path
                  d="M29 24.048a5 5 0 1 1-1.748-3.798a1.5 1.5 0 1 0 .547.547A4.98 4.98 0 0 1 29 24.046z"
                  fill="currentColor"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M44 24.048s-11-12-19.947-12c-8.948 0-20.053 12-20.053 12s11.105 12 20.053 12c8.947 0 19.947-12 19.947-12zM7.255 23.62c-.158.15-.306.292-.444.427a59.368 59.368 0 0 0 5.08 4.416a43.151 43.151 0 0 0 3.518 2.455A10.954 10.954 0 0 1 13 24.048c0-2.6.902-4.988 2.41-6.87a43.176 43.176 0 0 0-3.518 2.454a59.368 59.368 0 0 0-4.637 3.989zm28.9 4.846a42.227 42.227 0 0 1-3.64 2.546A10.955 10.955 0 0 0 35 24.048c0-2.643-.932-5.068-2.485-6.965a42.227 42.227 0 0 1 3.64 2.545a58.582 58.582 0 0 1 5.047 4.42l-.446.433a58.582 58.582 0 0 1-4.6 3.986zM24 33.047a9 9 0 1 0 0-18a9 9 0 0 0 0 18z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </Link>
        </div>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleDelete = async (rowId) => {
    const result = await deleteBook(rowId);
    console.log('file: index.jsx:117 ~ handleDelete ~ result:', result);
    // const updatedData = data.filter((row) => row._id !== rowId);
    // setData(updatedData);
    hanldeGetAllBooks();
    message.success('Record deleted successfully');
  };
  const handleEdit = (rowId) => {
    handleOnEdit(rowId);
    message.warning('Data will not be saved when canceling or returning!');
  };
  useEffect(() => {
    try {
      setIsLoading(true);
      const hanldeGetAllBooks = async () => {
        const { data } = await getAllBook();
        setData(data?.books);
        setIsLoading(false);
      };
      hanldeGetAllBooks();
    } catch (error) {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    if (listBook?.length > 0) {
      setData(listBook);
    }
  }, [listBook]);

  return (
    <div className="max-h-[500px]">
      {isLoading ? (
        <div className="mx-auto mt-10 w-max">
          <LoadingPage></LoadingPage>
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          className="max-h-[500px]"
          pagination={{
            showSizeChanger: true, // Hiển thị tùy chọn lựa chọn pageSize
            pageSizeOptions: ['4', '8', '12'], // Các tùy chọn pageSize
            defaultPageSize: 4, // Kích thước mặc định của pageSize
          }}
          scroll={{
            x: 800,
            y: 275,
          }}
        />
      )}
    </div>
  );
};
export default TableData;
