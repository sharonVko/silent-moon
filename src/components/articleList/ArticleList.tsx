import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import { ArticleCard } from '../articleCard/ArticleCard';
import { Meditation, Yoga } from '../../pages/home/Home';

export const ArticleList = ({ yoga, meditation }: { yoga: Yoga[]; meditation: Meditation[] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="recomendet__yoga">
        <h2 className="font-black text-[24px] text-[#4A503D] mb-6">Recomended Yoga for you</h2>

        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          className="mySwiper">
          {yoga?.map(yogaSingle => (
            <SwiperSlide>
              <ArticleCard yogaSingle={yogaSingle} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="recomendet__meditation">
        <h2 className="font-black text-[24px] text-[#4A503D] mb-6">Recomended Meditation for you</h2>{' '}
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          className="mySwiper">
          {meditation?.map(meditationSingle => (
            <SwiperSlide>
              <ArticleCard meditationSingle={meditationSingle} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
