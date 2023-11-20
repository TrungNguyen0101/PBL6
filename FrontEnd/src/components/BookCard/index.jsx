import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import Link from 'next/link';
import '../../styles/BookItem.scss';

const BookCard = ({ data }) => {
  return (
    <div className="w-[calc(20%-20px)]">
      <div className="rounded-lg book-item">
        <Link href={`/product/${data._id}`}>
          {data?.descImage?.length > 0 &&
            data?.descImage
              ?.slice(0, 1)
              .map((image) => (
                <img
                  src={image?.url}
                  alt=""
                  className="object-cover w-full h-[200px] cursor-pointer"
                />
              ))}
        </Link>
      </div>
      <div className="p-1 font-semibold">
        <div className="flex items-center justify-between">
          <Link href={`/product/${data._id}`}>
            <span className="cursor-pointer">{data?.booktitle}</span>
          </Link>
          <span className="flex items-center gap-x-[2px] text-sm">
            {data?.quantity}
            <AiFillStar color="#eabe12" />
          </span>
        </div>
        <span className="text-[#bc1313dd] text-xs">{data?.price}</span>
      </div>
    </div>
  );
};

export default BookCard;
