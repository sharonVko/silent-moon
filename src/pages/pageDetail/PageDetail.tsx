import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../utils/supabase';
import { Meditation, Yoga } from '../home/Home';
import { Backbutton } from '../../components/backButton/Backbutton';
import { FavouriteButton } from '../../components/favouriteButton.tsx/FavouriteButton';
import { UserCount } from '../../components/userCount/UserCount';
import { ItemSong } from '../../components/itemSong/ItemSong';
import { DownloadButton } from '../../components/downloadButton/DownloadButton';
interface Track {
  id: number;
  title: string | null;
  artist: string | null;
  duration: string | null;
  track_url: string | null;
  playlist_id: string | null;
  created_at: string;
}

export const PageDetail = () => {
  const { article, id } = useParams<string>();
  const [activity, setActivity] = useState<Yoga | Meditation | null>(null);

  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Ladezustand
  const [error, setError] = useState<string | null>(null); // Fehlerzustand

  useEffect(() => {
    const fetchSingleArticle = async () => {
      try {
        setLoading(true); // Ladezustand aktivieren
        setError(null); // Fehlerzustand zurücksetzen
        const relation = article || '';
        const { data, error } = await supabase.from(relation).select('*').eq('id', id).single();
        if (error) throw error;
        setActivity(data);

        // const { data: favData, error: favError } = await supabase
        //   .from(article === 'yoga' ? 'user_favorites_yoga' : 'user_favorites_meditation')
        //   .select('*')
        //   .eq('item_id', id);
        // if (favError) throw favError;

        if (article === 'meditation' && data?.playlist_id) {
          const { data: tracksData, error: trackError } = await supabase
            .from('playlist_tracks')
            .select('*')
            .eq('playlist_id', data.playlist_id);
          if (trackError) throw trackError;
          setPlaylist(tracksData);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Something went wrong while fetching the data. Please try again later.');
      } finally {
        setLoading(false); // Ladezustand deaktivieren
      }
    };

    fetchSingleArticle();
  }, [id, article]);

  if (loading) {
    return <div>Loading...</div>; // Ladeanzeige
  }

  if (error) {
    return <div>{error}</div>; // Fehleranzeige
  }

  return (
    <div className="relative">
      <div className={`${article === 'yoga' ? 'h-[500px]' : 'h-[289px]'}`}>
        {article === 'yoga' ? (
          <video src={activity?.video_url} autoPlay muted className="w-full h-full object-cover z-10"></video>
        ) : (
          <img src={activity?.image_url} alt="Activity" />
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
            playlist.map(track => (
              <ItemSong key={track.id} title={track.title ?? ''} id={track.id} duration={track.duration ?? ''} />
            ))}
        </div>
      </div>
      <Backbutton />
      <DownloadButton video={activity?.video_url} image={activity?.image_url} />
      <FavouriteButton article={article ?? ''} id={id ?? ''} />
    </div>
  );
};
