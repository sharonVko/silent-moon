import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../../components/header/Header';
import { CategoriesBar } from '../../components/categoriesBar/CategoriesBar';
import { fetchMeditation, fetchYoga } from '../../api/fetchContent';
import { Search } from '../../components/search/Search';

import ActivityCard from '../../components/activityCard/ActivityCard';

import Masonry from '@mui/lab/Masonry';
import { Meditation, Yoga } from '../home/Home';
import { Footer } from '../../components/footer/Footer';
import { MiniPlayerBar } from '../../components/miniPlayerBar/MiniPlayerBar';

// const ActivityCard = lazy(() => import('../../components/activityCard/ActivityCard'));

export type Activity = Yoga | Meditation;

export const ActivityPage = () => {
  const [activity, setActivity] = useState<Activity[] | null>([]); // Changed from Activity | null to Activity[] | null
  const [visibleActivities, setVisibleActivities] = useState<Activity[] | null>(null);

  const { type } = useParams();

  useEffect(() => {
    const fetchBase = async () => {
      const fetchData = type === 'yoga' ? fetchYoga : fetchMeditation;
      const data = (await fetchData()) ?? [];
      setActivity(data);
      setVisibleActivities(data.slice(0, 4));
    };

    fetchBase();
  }, [type]);

  useEffect(() => {
    if (activity && activity.length > 0) {
      return setVisibleActivities(activity.slice(0, 4));
    }

    setVisibleActivities(null);
  }, [activity]);

  const loadContent = () => {
    if (activity && visibleActivities) {
      const newVisibleActivities = activity.slice(visibleActivities.length, visibleActivities.length + 4);
      setVisibleActivities(prev => [...(prev || []), ...newVisibleActivities]);
    }
  };

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
      <MiniPlayerBar />
      <Search />
      <div className="flex flex-col items-center justify-center">
        <Masonry columns={2} spacing={2}>
          {visibleActivities && visibleActivities.length > 0 ? (
            visibleActivities.map((singleActivity, index) => {
              const heightClass = index % 4 === 0 || (index + 1) % 4 === 3 ? 'h-[210px]' : 'h-[167px]';

              return (
                <Link
                  to={`/${type}/${singleActivity.id}`}
                  key={singleActivity.id ?? index}
                  className={`w-[177px] ${heightClass} rounded-2xl overflow-hidden relative`}>
                  {singleActivity.video_url ? (
                    <ActivityCard video={singleActivity.video_url} title={singleActivity.title} />
                  ) : (
                    <ActivityCard img={singleActivity.image_url} title={singleActivity.title} />
                  )}
                </Link>
              );
            })
          ) : (
            <div>No activities available</div> // Optionaler Fallback, falls activity leer ist
          )}
        </Masonry>
        {activity && visibleActivities && visibleActivities.length < activity.length && (
          <div className="font-black dark-green text-3xl cursor-pointer text-center" onClick={loadContent}>
            ...
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
