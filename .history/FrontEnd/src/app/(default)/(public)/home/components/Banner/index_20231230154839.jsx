'use client';

import { useState } from 'react';
import BannerItem from '../BannerItem';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAllBookWithPagination } from '@/services/bookService';
import { useEffect } from 'react';

const Banner = () => {
  const [listBook, setListBook] = useState([]);
  const fectchBannerBook = async () => {
    const res = await getAllBookWithPagination(3, 8);
    if (res && res?.data) {
      setListBook(res?.data?.books);
    }
  };
  useEffect(() => {
    fectchBannerBook();
  }, []);
  return (
    <div className="mt-5 cursor-pointer">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {listBook?.length > 0 &&
          listBook?.slice(0, 4)?.map((book, index) => (
            <SwiperSlide key={index} className="z-10">
              <BannerItem book={book}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Banner;
