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
import { Activity } from '../../pages/activity/Activity';
import { useState } from 'react';

interface CategoriesBarProps {
  setActivity: React.Dispatch<React.SetStateAction<Activity[] | null>>;
}

export const CategoriesBar = ({ setActivity }: CategoriesBarProps) => {
  const { type } = useParams<{ type?: string }>();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const addAllActivity = async () => {
    if (!type) return;
    const activity: Activity[] = (type === 'yoga' ? await fetchYoga() : await fetchMeditation()) ?? [];
    setActivity(activity);
    setActiveCategory('all');
  };

  const fetchFav = async () => {
    if (!type) return;
    const favorites = type === 'yoga' ? await fetchFavYoga() : await fetchFavMeditation();
    setActivity(favorites);
    setActiveCategory('favorites');
  };

  const fetchCategory = async (categoryId: number) => {
    if (!type) return;
    setActivity(await fetchWithCategory(type, categoryId));
    setActiveCategory(`category-${categoryId}`);
  };

  const categoryItems = [
    { id: 3, icon: <AnxiousIcon />, label: 'Anxious' },
    { id: 4, icon: <SleepIcon />, label: 'Sleep' },
    { id: 5, icon: <KidsIcon />, label: 'Kids' },
  ];

  return (
    <div>
      <Swiper slidesPerView={5} spaceBetween={20} freeMode modules={[FreeMode, Pagination]} className="mySwiper">
        <SwiperSlide>
          <div className="text-center" onClick={addAllActivity}>
            <div
              className={`w-[65px] h-[65px] rounded-3xl flex items-center justify-center ${
                activeCategory === 'all' ? 'active__bar bg-[#6C63FF]' : 'bg-[#A1A4B2]'
              }`}>
              <AllIcon />
            </div>
            <p>All</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="text-center" onClick={fetchFav}>
            <div
              className={`w-[65px] h-[65px] rounded-3xl flex items-center justify-center ${
                activeCategory === 'favorites' ? 'active__bar bg-[#6C63FF]' : 'bg-[#A1A4B2]'
              }`}>
              <HeartBarIcon />
            </div>
            <p>Favorites</p>
          </div>
        </SwiperSlide>

        {categoryItems.map(({ id, icon, label }) => (
          <SwiperSlide key={id}>
            <div className="text-center" onClick={() => fetchCategory(id)}>
              <div
                className={`w-[65px] h-[65px] rounded-3xl flex items-center justify-center ${
                  activeCategory === `category-${id}` ? 'active__bar bg-[#6C63FF]' : 'bg-[#A1A4B2]'
                }`}>
                {icon}
              </div>
              <p>{label}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
