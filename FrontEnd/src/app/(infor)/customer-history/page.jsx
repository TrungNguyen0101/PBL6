'use client';
import '../../../styles/ScrollStyles.scss';
import TableAntHistory from '@/components/TableAntHistory';
import { getCustomerHistory } from '@/services/paymentService';
import { useEffect, useState } from 'react';

const CustomerHistoryPage = () => {
  const [listHistory, setListHistory] = useState([]);
  const fecthDataHistoryCustomer = async () => {
    const res = await getCustomerHistory();
    if (res && res.data) {
      setListHistory(res.data);
    }
  };
  useEffect(() => {
    fecthDataHistoryCustomer();
  }, []);
  return (
    <div className="w-[800px] bg-[#f2f3f4] shadow-md rounded p-8 h-[550px] overflow-auto">
      <h1 className="font-semibold text-3xl mb-3">Lịch sử đơn hàng</h1>
      <div>
        <TableAntHistory listHistory={listHistory} />
      </div>
    </div>
  );
};

export default CustomerHistoryPage;
