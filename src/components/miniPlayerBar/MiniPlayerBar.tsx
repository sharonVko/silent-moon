import { useEffect, useState } from 'react';
import { fetchRandomTrack } from '../../api/fetchContent';
import { MiniPlayerBackground } from '../../assets/svg/miniPlayerIcons/MiniPlayerBackground';
import { GrunPlayIcon } from '../../assets/svg/GrunPlayIcon';
import { Link, useParams } from 'react-router-dom';

export type Track = {
  artist: string | null;
  created_at: string;
  duration: string | null;
  id: number;
  playlist_id: string | null;
  title: string | null;
  track_url: string | null;
};

export const MiniPlayerBar = () => {
  const [randomTrack, setRandomTrack] = useState<Track | null>(null);
  const { type } = useParams();

  useEffect(() => {
    const loadRandomTrack = async () => {
      const track = await fetchRandomTrack();
      setRandomTrack(track);
    };

    loadRandomTrack();
  }, [type]);
  return (
    <div className=" relative">
      <Link to={`/player/${randomTrack?.id}`}>
        <div className="flex flex-col absolute z-100 top-8 left-8">
          <p className="text-[16px] font-semibold text-[#4A503D]">{randomTrack?.title}</p>
          <p className="text-[11px] font-semibold text-[#A1A4B2]">{randomTrack?.artist}</p>
        </div>

        <MiniPlayerBackground />

        <GrunPlayIcon />
      </Link>
    </div>
  );
};
