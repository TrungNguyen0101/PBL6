import routes from '@/constant/routes';
import React from 'react';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import '../../styles/BookItem.scss';

const BookItem = () => {
  return (
    <>
      <div className="rounded-lg book-item">
        <Link href={routes.HOME}>
          <img
            src="https://images.unsplash.com/photo-1682685797661-9e0c87f59c60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt=""
            className="object-cover w-full h-full rounded-lg"
          />
        </Link>
      </div>
      <div className="p-1 font-semibold">
        <div className="flex items-center justify-between">
          <Link href={routes.HOME}>
            <span>Star wars Jedi</span>
          </Link>
          <span className="flex items-center gap-x-[2px] text-sm">
            5
            <AiFillStar color="#eabe12" />
          </span>
        </div>
        <span className="text-[#6d4eec] text-xs">20.000</span>
      </div>
    </>
  );
};

export default BookItem;
