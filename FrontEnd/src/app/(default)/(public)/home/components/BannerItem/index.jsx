import Button from '@/components/Button';
import routes from '@/constant/routes';
import React from 'react';

const BannerItem = () => {
  return (
    <div className="w-full h-[600px] relative">
      <div className="absolute inset-0 bg-black rounded-md bg-opacity-40"></div>
      <img
        src="https://images.unsplash.com/photo-1695071336116-f61c2042630c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        alt=""
        className="object-cover w-full h-full"
      />
      <div className="absolute bottom-16 left-10 text-white w-[600px] flex flex-col gap-y-3">
        <h2 className="text-2xl">
          Tên sách: Cô gái năm ấy tôi từng theo theo đuổi
        </h2>
        <span className="inline-block text-lg">Thể loại: Tình Yêu</span>
        <p className="mb-2 text-base leading-6 font-extralight">
          Mô tả: "Cô gái năm ấy tôi từng theo theo đuổi" kể về câu chuyện tình
          ngọt ngào, ngốc nghếch của cậu sinh viên - Kha Cảnh Đằng và Thẩm Giai
          Nghi. Chuyện tình thời sinh viên ngây thơ, chân thành nhưng cũng đầy
          nuối tiếc của họ sẽ mang đọc giả về với những ngày tháng hồn nhiên
          nhất của cuộc đời, cảm nhận sâu sắc hơn tình yêu, có hạnh phúc và cũng
          có nhiều lưu luyến.
        </p>
        <Button kind="primary" to={routes.HOME}>
          Watch now
        </Button>
      </div>
    </div>
  );
};

export default BannerItem;
