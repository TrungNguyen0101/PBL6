'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { getAllBookWithPagination } from '@/services/bookService';
import { useEffect } from 'react';
import Link from 'next/link';
import '../../styles/SwiperButton.scss';
import BookItem from '../BookItem';
import routes from '@/constant/routes';
import { useTranslation } from 'react-i18next';

const BookList = () => {
  const { t } = useTranslation();
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
          listBook?.slice(0, 11)?.map((book, index) => (
            <SwiperSlide key={index}>
              <BookItem data={book} />
            </SwiperSlide>
          ))}
      </Swiper>
      <span className="flex justify-end mt-7">
        <Link
          href={routes.ALLBOOK}
          className="inline-block py-1 text-xs px-4 bg-[#6d4eec] text-white rounded-3xl hover:bg-opacity-70 transition-all"
        >
          {t('DisscoverAll')}
        </Link>
      </span>
    </div>
  );
};

export default BookList;
