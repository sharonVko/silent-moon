import React, { useEffect, useState } from 'react';
import supabase from '../../utils/supabase';
import { PreviewCard } from '../../components/previewCard/PreviewCard';
import { fetchMeditation, fetchYoga } from '../../api/fetchContent';
import { ArticleList } from '../../components/articleList/ArticleList';
import { PreviewCardContainer } from '../../components/previewCardContainer/PreviewCardContainer';
import { Header } from '../../components/header/Header';

export interface Yoga {
  id: number;
  title: string;
  description: string;
  video_url: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  category_id: number;
  created_at: string;
}

export interface Meditation {
  id: number;
  title: string;
  description: string;
  image_url: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  category_id: number;
  created_at: string;
}

export const Home = () => {
  const [recomendedListYoga, setRecomendedListYoga] = useState<Yoga[]>();
  const [recomendedListMeditation, setRecomendedListMeditation] = useState<Meditation[]>();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setRecomendedListYoga(await fetchYoga());
      setRecomendedListMeditation(await fetchMeditation());
    };
    fetchData();
  }, []);

  const filteredYoga = recomendedListYoga?.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredMeditation = recomendedListMeditation?.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" px-5">
      <Header />
      <h2 className="text-2xl font-black text-[#4A503D] mb-3.5">Good morning User</h2>
      <p className="text-[16px] font-semibold text-[#A1A4B2] mb-5">We hope you have a good day</p>
      <div className="preview__container flex gap-5 mb-14">
        <PreviewCardContainer />
      </div>

      <label className="input input-bordered flex items-center gap-2 bg-[#9da4a8] w-full mb-3 ">
        <input type="text" className="grow " placeholder="Search" onChange={e => setSearchTerm(e.target.value)} />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      <ArticleList yoga={filteredYoga} meditation={filteredMeditation} />
    </div>
  );
};
