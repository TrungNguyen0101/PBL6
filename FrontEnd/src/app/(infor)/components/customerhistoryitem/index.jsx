import { Button } from 'antd';

const CustomerHistoryItem = () => {
  return (
    <div className="border-b-2 border-b-[#646461] py-3 flex items-end justify-between last:border-0 last:pb-0">
      <div className="flex flex-col gap-y-1 font-semibold">
        <span className="text-xl font-semibold text-[#bc1313dd]">31.450</span>
        <span>Ngày đặt hàng: 08-12-2023</span>
        <span>Số điện thoại: 0934810216</span>
        <span>Địa chỉ nhận hàng: Đà Nẵng, Việt Nam</span>
        <span>Phương thức thanh toán: Nhận tiền khi giao hàng</span>
      </div>
      <div className="flex flex-col">
        <div className="-translate-y-[50px]">
          <p className="text-center">Đơn hàng đang được chuẩn bị</p>
        </div>
        <div className="flex gap-x-2">
          <Button type="primary" danger>
            Hủy đơn hàng
          </Button>
          <Button
            type="primary"
            className="bg-blue-500 hover:bg-opacity-80 transition-all"
          >
            Xem chi tiết đơn hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerHistoryItem;
