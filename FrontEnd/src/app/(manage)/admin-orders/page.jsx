'use client';
import React from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: 'Name',
    width: 20,
    dataIndex: 'name',
    key: 'name',
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
    render: () => <a>action</a>,
  },
];
// const data = [];
// for (let i = 0; i < 10; i++) {
//   data.push({
//     key: i,
//     name: `Edward ${i}`,
//     price: 32,
//     address: `London Park no. ${i}`,
//   });
// }
const data = [
  {
    id: 1,
    name: 'Doremon',
    price: '5.000',
    author: ' Fujiko F. Fujio',
    publisher: 'Nhật Bản',
    category: 'Cartoon',
    quantity: '5',
    action: 'delete',
  },
  {
    id: 2,
    name: 'Doremon',
    price: '25.000',
    author: ' Fujiko F. Fujio',
    publisher: 'Nhật Bản',
    category: 'Cartoon',
    quantity: '5',
    action: 'delete',
  },
  {
    id: 3,
    name: 'Doremon',
    price: '30.000',
    author: ' Fujiko F. Fujio',
    publisher: 'Nhật Bản',
    category: 'Cartoon',
    quantity: '5',
    action: 'delete',
  },
  {
    id: 4,
    name: 'Doremon',
    price: '20.000',
    author: ' Fujiko F. Fujio',
    publisher: 'Nhật Bản',
    category: 'Cartoon',
    quantity: '5',
    action: 'delete',
  },
  {
    id: 4,
    name: 'Doremon',
    price: '20.000',
    author: ' Fujiko F. Fujio',
    publisher: 'Nhật Bản',
    category: 'Cartoon',
    quantity: '5',
    action: 'delete',
  },
  {
    id: 4,
    name: 'Doremon',
    price: '20.000',
    author: ' Fujiko F. Fujio',
    publisher: 'Nhật Bản',
    category: 'Cartoon',
    quantity: '5',
    action: 'delete',
  },
  {
    id: 4,
    name: 'Doremon',
    price: '20.000',
    author: ' Fujiko F. Fujio',
    publisher: 'Nhật Bản',
    category: 'Cartoon',
    quantity: '5',
    action: 'delete',
  },
  {
    id: 4,
    name: 'Doremon',
    price: '20.000',
    author: ' Fujiko F. Fujio',
    publisher: 'Nhật Bản',
    category: 'Cartoon',
    quantity: '5',
    action: 'delete',
  },
  {
    id: 4,
    name: 'Doremon',
    price: '20.000',
    author: ' Fujiko F. Fujio',
    publisher: 'Nhật Bản',
    category: 'Cartoon',
    quantity: '5',
    action: 'delete',
  },
  {
    id: 4,
    name: 'Doremon',
    price: '20.000',
    author: ' Fujiko F. Fujio',
    publisher: 'Nhật Bản',
    category: 'Cartoon',
    quantity: '5',
    action: 'delete',
  },
  {
    id: 4,
    name: 'Doremon',
    price: '20.000',
    author: ' Fujiko F. Fujio',
    publisher: 'Nhật Bản',
    category: 'Cartoon',
    quantity: '5',
    action: 'delete',
  },
  {
    id: 4,
    name: 'Doremon',
    price: '20.000',
    author: ' Fujiko F. Fujio',
    publisher: 'Nhật Bản',
    category: 'Cartoon',
    quantity: '5',
    action: 'delete',
  },
];

const OrderPage = () => (
  <div className="max-h-[400px]">
    <Table
      columns={columns}
      dataSource={data}
      className="max-h-[400px]"
      pagination={{
        showSizeChanger: true, // Hiển thị tùy chọn lựa chọn pageSize
        pageSizeOptions: ['5', '10', '20'], // Các tùy chọn pageSize
        defaultPageSize: 5, // Kích thước mặc định của pageSize
      }}
      scroll={{
        x: 800,
        y: 275,
      }}
    />
  </div>
);
export default OrderPage;
