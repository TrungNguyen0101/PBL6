import routes from '@/constant/routes';
import Link from 'next/link';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';

const CategoryColumnContent = () => {
  return (
    <>
      <div class="p-3 flex items-start gap-x-2" id="1">
        <div class="w-[70px] h-[90px]">
          <img
            src="https://gamek.mediacdn.vn/133514250583805952/2021/3/18/cona7-1616045526983664603292.jpg"
            alt=""
            class="w-full h-full object-cover"
          />
        </div>
        <div class="item-content">
          <div class="item-name">
            <Link href={routes.HOME}>
              <span>Conan Movie 20</span>
            </Link>
          </div>
          <div class="item-review">
            <p className="flex items-center gap-x-[2px]">
              5
              <AiFillStar color="#eabe12" />
            </p>
          </div>
          <>
            <span className="text-[#bc1313dd]">$49.99</span>
          </>
        </div>
      </div>
    </>
  );
};

export default CategoryColumnContent;
