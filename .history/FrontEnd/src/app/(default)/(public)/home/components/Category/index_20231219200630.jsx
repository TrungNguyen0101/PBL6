'use client';

import CategoryItem from '../CategoryItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { useState } from 'react';
import { getAllCategory } from '@/services/categories';
import { useEffect } from 'react';

const Category = () => {
  const [listCategory, setListCategory] = useState([]);
  const fetchListCategory = async () => {
    const res = await getAllCategory();
    if (res && res?.data?.errCode === 0) {
      setListCategory(res?.data?.categories);
    }
  };
  useEffect(() => {
    fetchListCategory();
  }, []);
  return (
    <div className="mt-5 category-list h-[220px]">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={6}
        navigation
        grabCursor={'true'}
        pagination={{ clickable: true }}
      >
        {listCategory?.length > 0 &&
          listCategory?.map((category, index) => (
            <SwiperSlide key={index}>
              <CategoryItem category={category} imageFolder="/Image/" />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Category;
