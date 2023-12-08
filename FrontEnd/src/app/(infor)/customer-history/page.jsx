import CustomerHistoryItem from '../components/customerhistoryitem';
import '../../../styles/ScrollStyles.scss';

const CustomerHistoryPage = () => {
  return (
    <div className="w-[800px] bg-[#f2f3f4] shadow-md rounded p-8 h-[550px] overflow-auto">
      <h1 className="font-semibold text-3xl mb-3">Lịch sử đơn hàng</h1>
      <div>
        <CustomerHistoryItem />
        <CustomerHistoryItem />
        <CustomerHistoryItem />
        <CustomerHistoryItem />
        <CustomerHistoryItem />
        <CustomerHistoryItem />
      </div>
    </div>
  );
};

export default CustomerHistoryPage;
