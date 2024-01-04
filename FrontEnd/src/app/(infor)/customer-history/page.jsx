'use client';
import '../../../styles/ScrollStyles.scss';
import TableAntHistory from '@/components/TableAntHistory';
import { getCustomerHistory } from '@/services/paymentService';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const CustomerHistoryPage = () => {
  const { t } = useTranslation('info');
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
    <div className="w-[800px]">
      <h1 className="font-semibold text-3xl mb-3">{t('PurchaseHistory')}</h1>
      <div>
        <TableAntHistory
          listHistory={listHistory}
          fecthDataHistoryCustomer={fecthDataHistoryCustomer}
        />
      </div>
    </div>
  );
};

export default CustomerHistoryPage;
