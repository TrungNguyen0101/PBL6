'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import routes from '@/constant/routes';
import ChartBar from '../components/chart/CharBar';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { getAllAccount } from '@/services/authService';
import { getAllBook } from '@/services/bookService';
import {
  getAllPayment,
  getAllPaymentByStatus,
} from '@/services/paymentService';

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lengthAccount, setLengthAccount] = useState(0);
  const [lengthProduct, setLengthProduct] = useState(0);
  const [lengthOrder, setLengthOrder] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [sale, setSale] = useState(0);
  console.log('file: page.jsx:26 ~ Page ~ sale:', parseFloat(sale) < 0);
  // console.log('file: page.jsx:24 ~ Page ~ paymentStatus:', paymentStatus);

  // const account =
  //   typeof window !== 'undefined'
  //     ? JSON.parse(sessionStorage.getItem('auth'))
  //     : null;
  // const router = useRouter();
  // if (account?.user?.roleID !=='1') {
  //   router.push('/');
  //   toast.error("You do not have access");
  // }
  useEffect(() => {
    const handleGetAllAccount = async () => {
      const result = await getAllAccount();
      if (result?.account?.length > 0) {
        setLengthAccount(result.account.length);
      }
    };
    const handleGetAllBooks = async () => {
      const { data } = await getAllBook();
      if (data?.books.length > 0) {
        setLengthProduct(data.books.length);
      }
    };
    const handleGetAllPayment = async () => {
      const { data } = await getAllPayment();
      if (data.length > 0) {
        setLengthOrder(data.length);
      }
    };
    handleGetAllPayment();
    handleGetAllAccount();
    handleGetAllBooks();
  }, []);

  useEffect(() => {
    const handleGetAllPaymentByStatus = async () => {
      const result = await getAllPaymentByStatus();
      if (result.data.length > 0) {
        let totalSum = result.data.reduce((accumulator, currentValue) => {
          return parseFloat(accumulator) + parseFloat(currentValue.totalmoney);
        }, 0);
        setTotalMoney(totalSum);
        setPaymentStatus(result.data);
      }
    };
    handleGetAllPaymentByStatus();
  }, []);

  return (
    <div className={`${isLoading ? 'cursor-wait' : ''} overflow-auto`}>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-y-[20px]  gap-x-[20px]">
        <div className="text-white">
          <div className="p-[20px] bg-[#17a2b8] rounded-t-lg ">
            <h2 className="text-[25px] font-semibold">Accounts</h2>
            <span className="text-[20px]">{lengthAccount}+</span>
          </div>
          <Link
            as={routes.ACCOUNT}
            href={routes.ACCOUNT}
            onClick={() => setIsLoading(true)}
            className={classNames(
              'bg-[#1591a5] text-center rounded-b-lg py-[3px] flex gap-x-[10px] items-center justify-center cursor-pointer duration-300 hover:text-black',
              { 'cursor-wait': isLoading }
            )}
          >
            <span className="text-[20px]">See more</span>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m11 19l3.425-6H2v-2h12.425L11 5l11 7l-11 7Z"
                />
              </svg>
            </div>
          </Link>
        </div>
        <div className="text-white">
          <div className="p-[20px] bg-[#dc3545] rounded-t-lg ">
            <h2 className="text-[25px] font-semibold">Products</h2>
            <span className="text-[20px]">{lengthProduct}+</span>
          </div>
          <Link
            as={routes.PRODUCT}
            href={routes.PRODUCT}
            onClick={() => setIsLoading(true)}
            className={classNames(
              'bg-[#c6303e] text-center rounded-b-lg py-[3px] flex gap-x-[10px] items-center justify-center cursor-pointer duration-300 hover:text-black',
              { 'cursor-wait': isLoading }
            )}
          >
            <span className="text-[20px]">See more</span>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m11 19l3.425-6H2v-2h12.425L11 5l11 7l-11 7Z"
                />
              </svg>
            </div>
          </Link>
        </div>
        <div className="text-white">
          <div className="p-[20px] bg-[#ffc107] rounded-t-lg ">
            <h2 className="text-[25px] font-semibold">Orders</h2>
            <span className="text-[20px]">{lengthOrder}+</span>
          </div>
          <Link
            as={routes.ORDER}
            href={routes.ORDER}
            onClick={() => setIsLoading(true)}
            className={classNames(
              'bg-[#e5ad06] text-center rounded-b-lg py-[3px] flex gap-x-[10px] items-center justify-center cursor-pointer duration-300 hover:text-black',
              { 'cursor-wait': isLoading }
            )}
          >
            <span className="text-[20px]">See more</span>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m11 19l3.425-6H2v-2h12.425L11 5l11 7l-11 7Z"
                />
              </svg>
            </div>
          </Link>
        </div>
        <div className="p-[20px] bg-[#4f5051] rounded-lg h-full text-white">
          <span className="text-[25px] font-semibold float-right">Sales</span>
          <div
            className={`flex items-center gap-x-[10px] ${
              parseFloat(sale) > 0 ? 'text-[#3cd188]' : 'text-red-500'
            }`}
          >
            {/* <span className="text-[20px]">%</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 14 14"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.5 3.5h4v4" />
                <path d="M13.5 3.5L7.85 9.15a.5.5 0 0 1-.7 0l-2.3-2.3a.5.5 0 0 0-.7 0L.5 10.5" />
              </g>
            </svg> */}
            {parseFloat(sale) > 0 ? (
              <span className="text-[18px]">+{sale}% / Last month</span>
            ) : (
              <span className="text-[18px]">{sale}% / Last month</span>
            )}
          </div>
          <span className="block text-right mt-[30px] text-[25px]">
            {totalMoney.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center w-full mt-[50px]  overflow-auto">
        <ChartBar
          paymentStatus={paymentStatus}
          percent={(data) => setSale(data)}
        ></ChartBar>
      </div>
    </div>
  );
};

export default Page;
