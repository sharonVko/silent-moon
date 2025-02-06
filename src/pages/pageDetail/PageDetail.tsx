import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../utils/supabase';
import { Meditation, Yoga } from '../home/Home';
import { Backbutton } from '../../components/backButton/Backbutton';
import { FavouriteButton } from '../../components/favouriteButton.tsx/FavouriteButton';
import { UserCount } from '../../components/userCount/UserCount';
import { ItemSong } from '../../components/itemSong/ItemSong';
import { DownloadButton } from '../../components/downloadButton/DownloadButton';

export const PageDetail = () => {
  const { article, id } = useParams();
  const [activity, setActivity] = useState<Yoga | Meditation | null>(null);
  const [favouriteCounter, setFavoriteCounter] = useState<number>(0);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const fetchSingleArticle = async () => {
      try {
        const { data, error } = await supabase.from(article).select('*').eq('id', id).single();
        if (error) throw error;
        setActivity(data);

        const { data: favData, error: favError } = await supabase
          .from(article === 'yoga' ? 'user_favorites_yoga' : 'user_favorites_meditation')
          .select('*')
          .eq('item_id', id);
        if (favError) throw favError;
        setFavoriteCounter(favData.length);

        if (article === 'meditation' && data?.playlist_id) {
          const { data: tracksData, error: trackError } = await supabase
            .from('playlist_tracks')
            .select('*')
            .eq('playlist_id', data.playlist_id);
          if (trackError) throw trackError;
          setPlaylist(tracksData);
        }
      } catch (err) {
        console.error('Error fetch playlist', err);
      }
    };

    fetchSingleArticle();
  }, [id, article]);

  useEffect(() => {
    console.log('update playlist:', playlist);
  }, [playlist]);

  return (
    <div className="relative">
      <div className={`${article === 'yoga' ? 'h-[500px]' : 'h-[289px]'} `}>
        {article === 'yoga' ? (
          <video src={activity?.video_url} autoPlay muted className="w-full h-full object-cover z-10"></video>
        ) : (
          <img src={activity?.image_url} alt="" />
        )}
      </div>
      <div className="px-3 flex flex-col gap-3.5 mt-10">
        <h1 className="text-4xl font-black text-[#4A503D]">{activity?.title}</h1>
        <p className="text-[16px] font-semibold text-[#A1A4B2]">{activity?.level}</p>
        <p className="text-[16px] font-semibold text-[#A1A4B2]">{activity?.description}</p>
        <UserCount />
        <div className="playlist flex flex-col gap-7 mt-5">
          {article === 'meditation' &&
            playlist.length > 0 &&
            playlist.map(track => <ItemSong title={track.title} id={track.id} duration={track.duration} />)}
        </div>
      </div>
      <Backbutton />
      <DownloadButton video={activity?.video_url} image={activity?.image_url} />
      <FavouriteButton article={article} id={id} />
    </div>
  );
};
