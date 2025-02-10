import { useEffect, useState } from 'react';
import { fetchRandomTrack } from '../../api/fetchContent';
import { MiniPlayerBackground } from '../../assets/svg/miniPlayerIcons/MiniPlayerBackground';
import { GrunPlayIcon } from '../../assets/svg/GrunPlayIcon';
import { Link, useParams } from 'react-router-dom';

export type Playlist = {
  created_at: string;
  description: string | null;
  favorites_count: number | null;
  id: string;
  title: string | null;
  updated_at: string | null;
  views_count: number | null;
};

export const MiniPlayerBar = () => {
  const [randomPlaylist, setRandomPlaylist] = useState<Playlist | null>(null);
  const { type } = useParams();

  useEffect(() => {
    const loadRandomPlaylist = async () => {
      const playlist = await fetchRandomTrack();
      setRandomPlaylist(playlist);
    };

    loadRandomPlaylist();
  }, [type]);

  return (
    <div className="relative">
      <Link to={`/music/${randomPlaylist?.id}`}>
        <div className="flex flex-col absolute z-100 top-8 left-8">
          <p className="text-[16px] font-semibold text-[#4A503D]">{randomPlaylist?.title}</p>
          <p className="text-[11px] font-semibold text-[#A1A4B2] line-clamp-3">
            {randomPlaylist?.description
              ? randomPlaylist.description.split(' ').slice(0, 7).join(' ') +
                (randomPlaylist.description.split(' ').length > 7 ? '...' : '')
              : ''}
          </p>
        </div>

        <MiniPlayerBackground />

        <GrunPlayIcon />
      </Link>
    </div>
  );
};
