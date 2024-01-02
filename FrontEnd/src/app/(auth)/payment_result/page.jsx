'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { successPayment } from '@/services/paymentService';
import { useTranslation } from 'react-i18next';
export default function page() {
  const { t } = useTranslation('checkout');
  const [check, setCheck] = useState(true);
  const searchParams = useSearchParams();
  const transactionStatus = searchParams.get('vnp_TransactionStatus');
  const code = searchParams.get('vnp_TmnCode');
  const Date = searchParams.get('vnp_PayDate');
  const date = moment(Date, 'YYYYMMDDHHmmss');
  const formattedDate = date.format('DD-MM-YYYY HH:mm');
  const deliveryDate = date.add(7, 'days');
  const formattedDateShip = deliveryDate.format('DD-MM-YYYY');
  const queryString = searchParams.toString();
  const decodedQueryString = decodeURIComponent(queryString);

  const handleClose = () => {
    window.close();
  };

  useEffect(() => {
    const handleSuccess = async () => {
      if (transactionStatus === '00' && check) {
        const result = await successPayment(decodedQueryString);
        setCheck(false);
      }
    };
    handleSuccess();
  }, []);

  return (
    <div className="w-full  max-w-[600px] mx-auto my-[50px] min-h-[450px] pt-4 px-4 bg-white  text-gray-500 text-center rounded-xl shadow-lg">
      {transactionStatus === '00' ? (
        <div className="mt-[20px]">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhLUjvZxYG3cFjZb-pyaof20zvvG6ctBK10g&usqp=CAU"
            alt=""
            className="w-[150px] h-[150px] rounded-full mx-auto"
          />
          <h1 className="text-3xl font-bold text-green-600">
            {t('Paymentsuccess')}
          </h1>
          <p className="pt-[10px]">
            {t('code')} <span className="text-xl font-bold">{code}</span>.
          </p>
          <p className="pt-[10px]">
            {t('time')}{' '}
            <span className="text-xl font-bold">{formattedDate}</span>.
          </p>
          {/* <p className="pt-[10px]">
            Bạn có thể xem chi tiết trong :{' '}
            <Link
              href="/customer-history"
              className="text-xl font-bold hover:text-gray-500/80"
            >
              Lịch sử mua hàng
            </Link>
          </p> */}
          <p className="pt-[10px]">
            {t('timedelivery')}{' '}
            <span className="text-xl font-bold">{formattedDateShip}</span>.
          </p>
          <div className="mt-4 flex justify-center p-t[10px]">
            <button
              onClick={() => handleClose()}
              className="w-40 h-10 mt-[10px] rounded-full bg-green-500 text-white hover:bg-green-500/80"
            >
              {t('Continueshopping')}
            </button>
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
            <button
              onClick={() => handleClose()}
              className="w-40 h-10 mt-[10px] rounded-full bg-green-500 text-white hover:bg-green-500/80"
            >
              {t('Continueshopping')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
