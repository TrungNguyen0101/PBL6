'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { getAllBookWithPagination } from '@/services/bookService';
import { useEffect } from 'react';
import '../../styles/SwiperButton.scss';
import BookItem from '../BookItem';

const BookList = () => {
  const [listBook, setListBook] = useState([]);
  const fetchAllBook = async () => {
    const res = await getAllBookWithPagination(1, 100000);
    if (res && res?.data) {
      setListBook(res?.data?.books);
    }
  };
  useEffect(() => {
    fetchAllBook();
  }, []);
  return (
    <div className="mt-5 book-list h-[250px]">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={6}
        navigation
        grabCursor={'true'}
        pagination={{ clickable: true }}
      >
        {listBook?.length > 0 &&
          listBook?.map((book, index) => (
            <SwiperSlide key={index}>
              <BookItem data={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default BookList;
