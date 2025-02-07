import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/header/Header';
import { CategoriesBar } from '../../components/categoriesBar/CategoriesBar';
import { fetchMeditation, fetchYoga } from '../../api/fetchContent';
import { Search } from '../../components/search/Search';

import ActivityCard from '../../components/activityCard/ActivityCard';

import Masonry from '@mui/lab/Masonry';
import { Meditation, Yoga } from '../home/Home';
import { Footer } from '../../components/footer/Footer';

// const ActivityCard = lazy(() => import('../../components/activityCard/ActivityCard'));

export type Activity = Yoga | Meditation;

export const ActivityPage = () => {
  const [activity, setActivity] = useState<Activity[] | null>(null); // Changed from Activity | null to Activity[] | null
  const [visibleActivities, setVisibleActivities] = useState(activity?.slice(0, 4));

  const { type } = useParams();

  useEffect(() => {
    const fetchBase = async () => {
      const fetchData = type === 'yoga' ? fetchYoga : fetchMeditation;
      const data = (await fetchData()) ?? [];
      setActivity(data); // Ensure data is an array, or handle accordingly if it might not be
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
          ? 'Find your inner zen from anywhere.'
          : 'Audio-only meditation techniques to help you minimize your screen time and practice on the go.'}
      </p>

      <CategoriesBar setActivity={setActivity} />
      <Search />
      <div>
        {/* Sicherstellen, dass activity nicht null oder undefined ist */}
        <Masonry columns={2} spacing={2}>
          {activity && activity.length > 0 ? (
            activity.map((singleActivity, index) => {
              const heightClass = index % 4 === 0 || (index + 1) % 4 === 3 ? 'h-[210px]' : 'h-[167px]';

              return (
                <div
                  key={singleActivity.id ?? index}
                  className={`w-[177px] ${heightClass} rounded-2xl overflow-hidden relative`}>
                  {singleActivity.video_url ? (
                    <ActivityCard video={singleActivity.video_url} title={singleActivity.title} />
                  ) : (
                    <ActivityCard img={singleActivity.image_url} title={singleActivity.title} />
                  )}
                </div>
              );
            })
          ) : (
            <div>No activities available</div> // Optionaler Fallback, falls activity leer ist
          )}
        </Masonry>
      </div>
      <Footer />
    </div>
  );
};
