import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import { ArticleCard } from '../articleCard/ArticleCard';
import { Meditation, Yoga } from '../../pages/home/Home';
import { Loader } from '../loader/Loader';
import { useLocation } from 'react-router-dom';

export const ArticleList = ({ yoga, meditation }: { yoga: Yoga[]; meditation: Meditation[] }) => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="recomendet__yoga">
        <h2 className="font-black text-[24px] text-[#4A503D] mb-6">
          {' '}
          {pathname === '/home' ? 'Recommended Yoga for you' : 'Favourite Yoga Sessions'}
        </h2>

        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          className="mySwiper">
          {!yoga ? (
            <Loader />
          ) : yoga.length === 0 ? (
            <p>{pathname === '/home' ? <Loader /> : ' No Favourite Yoga Available'}</p>
          ) : (
            yoga.map(yogaSingle => (
              <SwiperSlide key={yogaSingle.id}>
                <ArticleCard yogaSingle={yogaSingle} />
              </SwiperSlide>
            ))
          )}
        </Swiper>

        <div className="recomendet__meditation">
          <h2 className="font-black text-[24px] text-[#4A503D] mb-6">
            {pathname === '/home' ? 'Recommended Meditation for you' : 'Favourite Meditation '}
          </h2>
          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            freeMode={true}
            modules={[FreeMode, Pagination]}
            className="mySwiper">
            {!meditation ? (
              <Loader />
            ) : meditation.length === 0 ? (
              <p>{pathname === '/home' ? <Loader /> : ' No Favourite Meditation Available'}</p>
            ) : (
              meditation.map(meditationSingle => (
                <SwiperSlide key={meditationSingle.id}>
                  <ArticleCard meditationSingle={meditationSingle} />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
      </div>
    </>
  );
};
