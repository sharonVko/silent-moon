import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/header/Header';
import { CategoriesBar } from '../../components/categoriesBar/CategoriesBar';
import { fetchMeditation, fetchYoga } from '../../api/fetchContent';
import { Search } from '../../components/search/Search';
import { ActivityCard } from '../../components/activityCard/ActivityCard';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

export const Activity = () => {
  const [activity, setActivity] = useState();

  const { type } = useParams();

  useEffect(() => {
    const fetchBase = async () => {
      const fetchData = type === 'yoga' ? fetchYoga : fetchMeditation;
      const data = await fetchData();
      setActivity(data);
    };

    fetchBase();
  }, [type]);

  return (
    <div>
      <Header />
      <h1 className="text-center text-[36px] font-black text-[#3F414E] mt-24">
        {type === 'yoga' ? 'Yoga' : 'Meditate'}
      </h1>
      <p className="mb-11 text-center text-[16px] font-semibold text-[#A0A3B1]">
        {type === 'yoga'
          ? 'Find your inner zen from annywhere.'
          : 'Audio-only meditation techniques to help you minimize your screen time and practice on the go.'}
      </p>

      <CategoriesBar setActivity={setActivity} />
      <Search />
      <div className="">
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2 }}
          gutterBreakpoints={{ 350: '12px', 750: '16px', 900: '24px' }}>
          <Masonry columnsCount={2}>
            {activity?.map((singleActivity, index) => (
              <div className={`w-[177px] ${index % 3 === 0 ? 'h-[210px]' : 'h-[167px]'}`}>
                <ActivityCard
                  key={singleActivity.id}
                  img={singleActivity.image_url}
                  video={singleActivity.video_url}
                  title={singleActivity.title}
                />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};
