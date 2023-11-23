import React from 'react';
import Link from 'next/link';

const CategoryColumnContent = ({ data }) => {
  return (
    <>
      <div class="p-3 flex items-center gap-x-[10px]">
        {data?.descImage?.length > 0 &&
          data?.descImage?.slice(0, 1)?.map((img, index) => (
            <Link
              class="w-[30%] h-[100px]"
              href={`/product/${data._id}`}
              key={index}
            >
              <img
                src={img?.url}
                alt=""
                class="w-full h-full object-cover rounded-md"
              />
            </Link>
          ))}
        <div class="font-semibold w-[70%]">
          <p className="mb-1 text-sm leading-5">{data?.booktitle}</p>
          <div className="flex items-center justify-between">
            <p className="text-[#bc1313dd] text-xs">{data?.author}</p>
            <p className="text-[#bc1313dd] text-xs">{data?.price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryColumnContent;
