import { useSwiper } from 'swiper/react';

const SwiperNavButton = () => {
  const swiper = useSwiper();
  return (
    <div className="swiperbtn">
      <button onClick={() => swiper.slidePrev()} className="text-black">
        Pre
      </button>
      <button onClick={() => swiper.slideNext()} className="text-black">
        Next
      </button>
    </div>
  );
};

export default SwiperNavButton;
