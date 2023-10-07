'use client';

import CategoryItem from '../CategoryItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import ButtonSlide from '@/components/ButtonSlide';

const Category = () => {
  return (
    <div className="mt-5 category-list">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={30}
        slidesPerView={'auto'}
        navigation={{
          nextEl: '.button-next-slide',
          prevEl: '.button-prev-slide',
        }}
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
        <ButtonSlide />
      </Swiper>
    </div>
  );
};

export default Category;
