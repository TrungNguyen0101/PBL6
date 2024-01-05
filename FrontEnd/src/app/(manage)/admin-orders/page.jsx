'use client';
import React, { useEffect, useState } from 'react';
import { Select, Table } from 'antd';
import { getAllPayment, updatePayment } from '@/services/paymentService';
import ModelOrder from '@/components/ModelOrder';
import { toast } from 'react-toastify';
import { compareAsc, format, parse } from 'date-fns';
// import { spacing } from 'react-select/dist/declarations/src/theme';
import { Button, message, Popconfirm } from 'antd';
import './styled.scss';
import LoadingPage from '@/components/LoadingPage';
import moment from 'moment';
const OrderPage = () => {
  const { Option } = Select;
  const [data, setData] = useState([]);
  const [dataOld, setDataOld] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [checkView, setCheckView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetAllPayment = async () => {
    const { data } = await getAllPayment();
    if (data) {
      let newArray = data.map((item) => ({
        address: item?.address,
        orderId: item?.orderId,
        phone: item?.phone,
        cart: item?.cart?.length,
        createdAt: format(new Date(item.createdAt), 'dd/MM/yyyy'),
        status: item?.status,
        totalmoney: parseFloat(item?.totalmoney).toLocaleString('it-IT', {
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
    const handleLoading = async () => {
      await setIsLoading(true);
      await handleGetAllPayment();
      await setIsLoading(false);
    };
    handleLoading();
  }, []);

  const handleView = (rowId) => {
    const result = dataOld.filter((item) => item.orderId === rowId);
    setCheckView(true);
    setOrderItem(result);
  };

  const handleOffActive = () => {
    setCheckView(false);
  };

  const confirmStatus_2 = async (status, orderId) => {
    const result = await updatePayment({
      orderId: orderId,
      status: status + 1,
    });
    if (result) {
      message.success('Updated successfully');
      handleGetAllPayment();
    }
  };
  const confirmStatus_3 = async (status, orderId) => {
    const result = await updatePayment({
      orderId: orderId,
      status: status + 1,
    });
    if (result) {
      message.success('Updated successfully');
      handleGetAllPayment();
    }
  };
  const confirmStatus_4 = async (status, orderId) => {
    const result = await updatePayment({
      orderId: orderId,
      status: status + 2,
    });
    if (result) {
      message.success('Updated successfully');
      handleGetAllPayment();
    }
  };
  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
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
      title: 'Total money',
      dataIndex: 'totalmoney',
      key: 'totalmoney',
      width: 7,
    },
    {
      title: 'Date time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => {
        // Assuming dates are in the format 'dd/MM/yyyy', use the appropriate format for your data
        let dateA = parse(a.createdAt, 'dd/MM/yyyy', new Date());
        let dateB = parse(b.createdAt, 'dd/MM/yyyy', new Date());

        // Use compareAsc from date-fns to compare the dates or standard JS Date object comparison
        return compareAsc(dateA, dateB);
      },
      width: 7,
    },
    {
      title: 'Status',
      key: 'action',
      width: 5,
      sorter: (a, b) => a.status - b.status,
      render: (_, record) => {
        let state;
        let css;
        if (record.status === 1) {
          state = 'Prepare';
          css = 'bg-[#ee9b00]';
        } else if (record.status === 2) {
          state = 'Shipping';
          css = 'bg-orange-500';
        } else if (record.status === 3) {
          state = 'Successful';
          css = 'bg-green-500';
        } else if (record.status === 4) {
          state = 'Fail';
          css = 'bg-red-500';
        }
        return (
          <span
            className={`px-2 py-1 font-semibold text-white rounded-xl whitespace-nowrap ${css}`}
          >
            {state}
          </span>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: 7,
      render: (text, record) => {
        if (record.status === 1) {
          return (
            <Popconfirm
              title="Order confirmation successful"
              description="Are you sure the order has been successfully prepared?"
              onConfirm={() => confirmStatus_2(record.status, record.orderId)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <button
                type="button"
                className="bg-[#80ed99] px-[8px] py-[6px] inline-block rounded-lg"
              >
                <span className="font-semibold text-white whitespace-nowrap">
                  Order confirm
                </span>
              </button>
            </Popconfirm>
          );
        } else if (record.status === 2) {
          return (
            <div className="flex flex-col items-start justify-start gap-y-[5px]">
              <Popconfirm
                title="Delivery confirmation successful."
                description="Are you sure the order has been successfully delivered?"
                onConfirm={() => confirmStatus_3(record.status, record.orderId)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <button
                  type="button"
                  className="bg-[#4361ee] px-[8px] py-[6px] inline-block rounded-lg"
                >
                  <span className="font-semibold text-white whitespace-nowrap">
                    Confirm success
                  </span>
                </button>
              </Popconfirm>
              <Popconfirm
                title="Delivery confirmation failed."
                description="Are you sure the order delivery has failed?"
                onConfirm={() => confirmStatus_4(record.status, record.orderId)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <button
                  type="button"
                  className="bg-[#ef233c] px-[8px] py-[6px] inline-block rounded-lg"
                >
                  <span className="font-semibold text-white whitespace-nowrap">
                    Confirm cancel
                  </span>
                </button>
              </Popconfirm>
            </div>
          );
        } else if (record.status === 3) {
          return (
            <span className="font-semibold text-green-500 ">
              Order delivery successfully
            </span>
          );
        } else if (record.status === 4) {
          return (
            <span className="font-semibold text-red-500 whitespace-nowrap">
              Order delivery failed.
            </span>
          );
        }
      },
    },
    {
      title: 'View',
      key: 'view',
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
      <div className="max-h-[600px]">
        {isLoading ? (
          <div className="mx-auto mt-10 w-max">
            <LoadingPage></LoadingPage>
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            height={600}
            pagination={{
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '20'],
              defaultPageSize: 5,
            }}
            scroll={{
              y: 430, // Vertical scrolling
              x: 1210, // Enable horizontal scrolling
            }}
          />
        )}
      </div>
      {checkView && (
        <ModelOrder
          active={checkView}
          orderItem={orderItem}
          handleOffActive={handleOffActive}
        ></ModelOrder>
      )}
    </>
  );
};
export default OrderPage;
