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
      <div className="py-2 font-semibold">
        <p className="mb-2 text-sm leading-5">{data?.booktitle}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#bc1313dd] text-sm">{data?.author}</span>
          <span className="text-[#bc1313dd] text-xs font-semibold">
            {data?.price?.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
