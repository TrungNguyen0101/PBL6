import routes from '@/constant/routes';
import Link from 'next/link';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';

const CategoryColumnContent = () => {
  return (
    <>
      <div className="flex items-start w-full p-3 gap-x-2">
        <div className="w-[60px] h-[80px] flex-shrink-0">
          <Link href={routes.HOME}>
            <img
              src="https://images.unsplash.com/photo-1682685797507-d44d838b0ac7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt=""
              className="w=full h-full object-cover rounded-md"
            />
          </Link>
        </div>
        <div className="text-xs font-semibold">
          <Link href={routes.HOME}>
            <span className="">Ngày ấy bạn và tôi</span>
          </Link>
          <p className="flex items-center gap-x-[2px]">
            5
            <AiFillStar color="#eabe12" />
          </p>
          <span className="text-[#6d4eec]">10.000</span>
        </div>
      </div>
    </>
  );
};

export default CategoryColumnContent;
