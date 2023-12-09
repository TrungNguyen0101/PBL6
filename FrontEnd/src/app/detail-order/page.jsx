import React from 'react';
import { Table } from 'antd';
import Header from '@/components/layout/Header';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
const DetailOrderPage = () => (
  <>
    <Header />
    <div className="mt-7 w-[900px] mx-auto">
      <h1 className="mb-3 text-2xl font-semibold">Chi tiết đơn hàng</h1>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 10,
        }}
        scroll={{
          y: 240,
        }}
      />
    </div>
  </>
);
export default DetailOrderPage;
