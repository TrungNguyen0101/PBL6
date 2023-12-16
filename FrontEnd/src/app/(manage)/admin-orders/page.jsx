'use client';
import React, { useEffect, useState } from 'react';
import { Select, Table } from 'antd';
import { getAllPayment, updatePayment } from '@/services/paymentService';
import ModelOrder from '@/components/ModelOrder';
import { toast } from 'react-toastify';

const OrderPage = () => {
  const { Option } = Select;
  const [data, setData] = useState([]);
  const [dataOld, setDataOld] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [checkView, setCheckView] = useState(false);
  const handleGetAllPayment = async () => {
    const { data } = await getAllPayment();
    if (data) {
      let newArray = data.map((item) => ({
        address: item?.address,
        orderId: item?.orderId,
        phone: item?.phone,
        cart: item?.cart?.length,
        status: item?.status,
        totalmoney: parseFloat(item?.totalmoney / 100).toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        }),
        username: item?.user?.username,
      }));
      setData(newArray);
      setDataOld(data);
    }
  };
  useEffect(() => {
    handleGetAllPayment();
  }, []);

  const handleChangeStatus = (record, selectedStatus) => {
    // Thực hiện xử lý khi chọn status ở đây, có thể gửi request đến server, cập nhật dữ liệu, v.v.
    console.log(`Order ID: ${record.status} - New Status: ${selectedStatus}`);
    // Ví dụ: Cập nhật trạng thái của đơn hàng
  };
  const handleChangeStatus123 = async (record, selectedValue) => {
    let state;
    if (selectedValue === 'Prepare') {
      state = 1;
    } else if (selectedValue === 'Shipping') {
      state = 2;
    } else if (selectedValue === 'Successful') {
      state = 3;
    } else if (selectedValue === 'Fail') {
      state = 4;
    }
    const result = await updatePayment({
      orderId: record.orderId,
      status: state,
    });
    if (result) {
      toast.success('Edit successfuly');
      handleGetAllPayment();
    }
  };
  const handleView = (rowId) => {
    const result = dataOld.filter((item) => item.orderId === rowId);
    setCheckView(true);
    setOrderItem(result);
  };

  const handleOffActive = () => {
    setCheckView(false);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return 'Prepare';
      case 2:
        return 'Shipping';
      case 3:
        return 'Successful';
      case 4:
        return 'Fail';
      default:
        return 'Select action';
    }
  };

  const columns = [
    {
      title: 'Address',
      width: 12,
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 7,
    },
    {
      title: 'User name',
      dataIndex: 'username',
      key: 'username',
      width: 8,
    },
    {
      title: 'Total book',
      dataIndex: 'cart',
      key: 'cart',
      width: 8,
    },
    {
      title: 'Total money',
      dataIndex: 'totalmoney',
      key: 'totalmoney',
      width: 10,
    },
    {
      title: 'Status',
      key: 'action',
      width: 10,
      render: (_, record) => (
        <Select
          defaultValue={getStatusText(record.status)}
          value={getStatusText(record.status)}
          style={{ width: 120 }}
          onChange={(value) => handleChangeStatus123(record, value)}
        >
          <Option value="Prepare">Prepare</Option>
          <Option value="Shipping">Shipping</Option>
          <Option value="Successful">Successful</Option>
          <Option value="Fail">Fail</Option>
        </Select>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 7,
      render: (text, record) => (
        <button type="button" onClick={() => handleView(record.orderId)}>
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
        </button>
      ),
    },
  ];

  return (
    <>
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
            x: 850,
            y: 380,
          }}
        />
      </div>
      <ModelOrder
        active={checkView}
        orderItem={orderItem}
        handleOffActive={handleOffActive}
      ></ModelOrder>
    </>
  );
};
export default OrderPage;
