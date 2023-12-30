import Link from 'next/link';
import React from 'react';
import { Container, Alert, Heading, Text, Button } from 'tailwindcss';

export default function page() {
  const orderId = '833883794';
  const deliveryDate = '2024-01-05';
  const check = false;
  return (
    <div className="w-full  max-w-[600px] mx-auto my-[50px] min-h-[450px] pt-4 px-4 bg-white  text-gray-500 text-center rounded-xl shadow-lg">
      {check ? (
        <div className="mt-[20px]">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhLUjvZxYG3cFjZb-pyaof20zvvG6ctBK10g&usqp=CAU"
            alt=""
            className="w-[150px] h-[150px] rounded-full mx-auto"
          />
          <h1 className="text-3xl font-bold text-green-600">
            Thanh toán thành công
          </h1>
          <p className="pt-[10px]">
            Mã số đơn hàng của bạn là{' '}
            <span className="text-xl font-bold">{orderId}</span>.
          </p>
          <p className="pt-[10px]">
            Bạn có thể xem chi tiết trong :{' '}
            <Link
              href="/customer-history"
              className="font-bold text-xl hover:text-gray-500/80"
            >
              Lịch sử mua hàng
            </Link>
          </p>
          <p className="pt-[10px]">
            Thời gian dự kiến giao hàng là{' '}
            <span className="text-xl font-bold">{deliveryDate}</span>.
          </p>
          <div className="mt-4 flex justify-center p-t[10px]">
            <Link href="/">
              <button className="w-40 h-10 mt-[10px] rounded-full bg-green-500 text-white hover:bg-green-500/80">
                Tiếp tục mua hàng
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-[20px]">
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/payment-failed-8544024-6728349.png"
            alt=""
            className="w-[150px] h-[150px] rounded-full mx-auto"
          />
          <h1 className="text-3xl font-bold text-red-700">
            Thanh toán thất bại
          </h1>
          <p className="pt-[10px]">
            Vui lòng kiểm tra lại quá trình thanh toán của bạn. Chúc bạn sẽ có
            những trải nghiệm tuyệt vời!
          </p>
          <div className="mt-4 flex justify-center p-t[10px]">
            <Link href="/">
              <button className="w-40 h-10 mt-[10px] rounded-full bg-green-500 text-white hover:bg-green-500/80">
                Tiếp tục mua hàng
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
