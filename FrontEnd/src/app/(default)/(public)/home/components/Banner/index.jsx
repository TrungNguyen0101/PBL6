'use client';

import BannerItem from '../BannerItem';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const Banner = () => {
  return (
    <div className="mt-5 cursor-pointer">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <BannerItem></BannerItem>
        </SwiperSlide>
        <SwiperSlide>
          <BannerItem></BannerItem>
        </SwiperSlide>
        <SwiperSlide>
          <BannerItem></BannerItem>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
