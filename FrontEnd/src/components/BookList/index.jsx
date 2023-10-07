'use client';

import React from 'react';
import BookItem from '../BookItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import ButtonSlide from '../ButtonSlide';

const BookList = () => {
  return (
    <div className="mt-5 book-list">
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
        <ButtonSlide />
      </Swiper>
    </div>
  );
};

export default BookList;
