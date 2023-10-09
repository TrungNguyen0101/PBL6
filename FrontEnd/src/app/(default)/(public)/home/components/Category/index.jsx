'use client';

import CategoryItem from '../CategoryItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';

const Category = () => {
  return (
    <div className="mt-5 category-list h-[220px]">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={'auto'}
        navigation
        grabCursor={'true'}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <CategoryItem />
        </SwiperSlide>
        <SwiperSlide>
          <CategoryItem />
        </SwiperSlide>
        <SwiperSlide>
          <CategoryItem />
        </SwiperSlide>
        <SwiperSlide>
          <CategoryItem />
        </SwiperSlide>
        <SwiperSlide>
          <CategoryItem />
        </SwiperSlide>
        <SwiperSlide>
          <CategoryItem />
        </SwiperSlide>
        <SwiperSlide>
          <CategoryItem />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Category;
