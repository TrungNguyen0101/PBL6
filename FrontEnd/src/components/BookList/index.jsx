'use client';

import React from 'react';
import BookItem from '../BookItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import '../../styles/SwiperButton.scss';

const BookList = () => {
  return (
    <div className="mt-5 book-list h-[220px]">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={'auto'}
        navigation
        grabCursor={'true'}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <BookItem />
        </SwiperSlide>
        <SwiperSlide>
          <BookItem />
        </SwiperSlide>
        <SwiperSlide>
          <BookItem />
        </SwiperSlide>
        <SwiperSlide>
          <BookItem />
        </SwiperSlide>
        <SwiperSlide>
          <BookItem />
        </SwiperSlide>
        <SwiperSlide>
          <BookItem />
        </SwiperSlide>
        <SwiperSlide>
          <BookItem />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BookList;
