'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import routes from '@/constant/routes';
import ChartBar from '../components/chart/CharBar';
import classNames from 'classnames';
const Page = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={`${isLoading ? 'cursor-wait' : ''}`}>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-y-[20px]  gap-x-[20px]">
        <div className="text-white">
          <div className="p-[20px] bg-[#17a2b8] rounded-t-lg ">
            <h2 className="text-[25px] font-semibold">Accounts</h2>
            <span className="text-[20px]">20+</span>
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
            <span className="text-[20px]">100+</span>
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
            <span className="text-[20px]">50+</span>
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
          <div className="flex items-center gap-x-[10px] text-[#3cd188]">
            <span className="text-[20px]">%</span>
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
            </svg>
            <span className="text-[25px]">+12,5</span>
          </div>
          <span className="inline-block float-right mt-[30px] text-[25px]">
            2.300.000 VNĐ
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center w-full mt-[50px]">
        <ChartBar></ChartBar>
      </div>
    </div>
  );
};

export default Page;
