import React, { useEffect, useState } from 'react';
import supabase from '../../utils/supabase';
import { PreviewCard } from '../../components/previewCard/PreviewCard';
import { fetchMeditation, fetchYoga } from '../../api/fetchContent';
import { ArticleList } from '../../components/articleList/ArticleList';
import { PreviewCardContainer } from '../../components/previewCardContainer/PreviewCardContainer';
import { Header } from '../../components/header/Header';
import { Search } from '../../components/search/Search';
import { Footer } from '../../components/footer/Footer';

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
    <> 
    <div className=" px-5">
      <Header />
      <h2 className="text-2xl font-black text-[#4A503D] mb-3.5 mt-12">Good morning User</h2>
      <p className="text-[16px] font-semibold text-[#A1A4B2] mb-5">We hope you have a good day</p>
      <div className="preview__container flex gap-5 mb-14">
        <PreviewCardContainer />
      </div>
      <Search />
      <ArticleList yoga={filteredYoga} meditation={filteredMeditation} />
    </div>
      <Footer/>
    </>
  );
};
