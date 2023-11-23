import React from 'react';
import Link from 'next/link';
import '../../styles/BookItem.scss';

const BookItem = ({ data }) => {
  return (
    <>
      <div className="rounded-lg book-item">
        <Link href={`/product/${data._id}`}>
          {data?.descImage?.length > 0 &&
            data?.descImage
              ?.slice(0, 1)
              ?.map((img, index) => (
                <img
                  key={index}
                  src={img?.url}
                  alt=""
                  className="object-cover w-full h-[140px] rounded-lg"
                />
              ))}
        </Link>
      </div>
      <div className="py-2 font-semibold">
        <p className="mb-1 text-sm leading-5">{data?.booktitle}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#bc1313dd] text-xs">{data?.author}</span>
          <span className="text-[#bc1313dd] text-xs font-semibold">
            {data?.price}
          </span>
        </div>
      </div>
    </>
  );
};

export default BookItem;
