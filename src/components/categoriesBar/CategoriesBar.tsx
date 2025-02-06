import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import { AllIcon } from '../../assets/svg/AllIcon';
import { HeartBarIcon } from '../../assets/svg/HeartBarIcon';
import { AnxiousIcon } from '../../assets/svg/AnxiousIcon';
import { SleepIcon } from '../../assets/svg/SleepIcon';
import { KidsIcon } from '../../assets/svg/KidsIcon';
import {
  fetchFavMeditation,
  fetchFavYoga,
  fetchMeditation,
  fetchWithCategory,
  fetchYoga,
} from '../../api/fetchContent';

export const CategoriesBar = ({ setActivity }) => {
  const { type } = useParams();

  const addAllActivity = async () => {
    if (type === 'yoga') {
      setActivity(await fetchYoga());
    } else {
      setActivity(await fetchMeditation());
    }
  };

  const fetchFav = async () => {
    if (type === 'yoga') {
      setActivity(await fetchFavYoga());
    } else {
      setActivity(await fetchFavMeditation());
    }
  };

  const fetchCategory = async (categoryId: number) => {
    setActivity(await fetchWithCategory(type, categoryId));
  };

  return (
    <div>
      <Swiper slidesPerView={5} spaceBetween={20} freeMode={true} modules={[FreeMode, Pagination]} className="mySwiper">
        <SwiperSlide>
          <div className="text-center" onClick={addAllActivity}>
            <div className="w-[65px] h-[65px] rounded-3xl  bg-[#A1A4B2] active__bar flex items-center justify-center">
              <AllIcon />
            </div>
            <p>All</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="text-center" onClick={fetchFav}>
            <div className="w-[65px] h-[65px] rounded-3xl  bg-[#A1A4B2] flex items-center justify-center">
              <HeartBarIcon />
            </div>
            <p>Favorites</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="text-center" onClick={() => fetchCategory(3)}>
            <div className="w-[65px] h-[65px] rounded-3xl  bg-[#A1A4B2] flex items-center justify-center">
              <AnxiousIcon />
            </div>
            <img src="" alt="" />
            <p>Anxious</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="text-center" onClick={() => fetchCategory(4)}>
            <div className="w-[65px] h-[65px] rounded-3xl bg-[#A1A4B2] flex items-center justify-center">
              <SleepIcon />
            </div>
            <p>Sleep</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" text-center" onClick={() => fetchCategory(5)}>
            <div className="w-[65px] h-[65px] rounded-3xl bg-[#A1A4B2]  flex items-center justify-center">
              <KidsIcon />
            </div>
            <p>Kids</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
