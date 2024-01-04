import React, { useEffect, useState } from 'react';
import { Popconfirm, Table, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { updatePayment } from '@/services/paymentService';
import { FaEye } from 'react-icons/fa';
import './styles.scss';
import ModalOrder from '../ModalOrder';

const TableAntHistory = ({
  listHistory,
  fecthDataHistoryCustomer = () => {},
}) => {
  const { t } = useTranslation('info');
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idOrder, setIdOrder] = useState(null);
  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };
  const confirmStatus_2 = async (status, orderId) => {
    const result = await updatePayment({
      orderId: orderId,
      status: 4,
    });
    if (result) {
      message.success('Updated successfully');
      fecthDataHistoryCustomer();
    }
  };
  const handleGetIdOrder = (id) => {
    setIsModalOpen(true);
    setIdOrder(id);
  };
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
      width: 250,
      render: (_, record) => {
        let state;
        let css;
        if (record.status === 1) {
          state = 'Đơn hàng chờ xác';
        } else if (record.status === 2) {
          state = 'Đơn hàng đang được giao';
        } else if (record.status === 3) {
          state = 'Giao hàng thành công';
        } else if (record.status === 4) {
          state = 'Giao hàng thất bại';
        }
        return (
          <span className={`font-semibold rounded-xl  ${css}`}>{state}</span>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: (_, record) => {
        let state;
        let css;
        if (record.status === 1) {
          state = 'Prepare';
          css = 'bg-[#ee9b00]';
        }
        return (
          <div>
            {record.status === 1 ? (
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
                    Orders delete
                  </span>
                </button>
              </Popconfirm>
            ) : (
              <button
                disabled
                type="button"
                className="bg-red-500 px-[8px] py-[6px] inline-block rounded-lg"
              >
                <span className="font-semibold text-white whitespace-nowrap">
                  Not delete
                </span>
              </button>
            )}
          </div>
        );
      },
    },
    {
      title: 'Details Order',
      key: 'detail',
      width: 200,
      render: (_, record) => {
        let state;
        let css;
        if (record.status === 1) {
          state = 'Prepare';
          css = 'bg-[#ee9b00]';
        }
        return (
          <button
            type="button"
            className="bg-[#80ed99] px-[8px] py-[6px] inline-block rounded-lg"
            onClick={() => handleGetIdOrder(record?._id)}
          >
            <span className="font-semibold text-white inline-block cursor-pointer">
              View Details
            </span>
          </button>
        );
      },
    },
  ];
  useEffect(() => {
    setData(listHistory);
  }, [listHistory]);
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 5,
        }}
        scroll={{
          x: 300,
          y: 250,
        }}
      />
      <ModalOrder
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        idOrder={idOrder}
      />
    </div>
  );
};
export default TableAntHistory;
