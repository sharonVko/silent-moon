
import React, { useState, useRef, useEffect } from 'react';
import supabase from '../../utils/supabase';
import { useParams } from 'react-router-dom';
import { Backbutton } from '../../components/backButton/Backbutton';
import { FavouriteButton } from '../../components/favouriteButton.tsx/FavouriteButton';
import { DownloadButton } from '../../components/downloadButton/DownloadButton';

interface MeditationPlayerProps{
  track_url : string;
  title:string;
  artist: string;
  duration: string
}

export const MeditationPlayer:React.FC<MeditationPlayerProps> = (props) => {
  const [music, setMusic] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchMusic = async () => {
      const { data, error } = await supabase
        .from('playlist_tracks')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        setMusic(data);
        console.log(data);
      }
    };

    fetchMusic();
  }, [id]);


  const handlePlayAndPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(event.target.value);
    }
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 15;
    }
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 15;
    }
  };

  return (
      <div className="relative h-screen flex flex-col items-center justify-center bg-[url(/img/player_meditation.png)] bg-cover bg-center">
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between">
          <Backbutton />
          <div className="flex gap-4">
            <FavouriteButton />
            <DownloadButton musik={music?.track_url} />
          </div>
        </div>
        <div className='audio-info text-center py-24 '>
          <p className='text-[#4A503D] f-s-36 sans-pro-900'>{music.title ?? ""}</p>
          <p className='text-[#A0A3B1] f-s-14 sans-pro-600'>{music.artist}</p>
        </div>
        <div className="audioplayer flex flex-col items-center bg-transparent p-4 rounded z-20 max-w-lg mx-auto ">
          <div className="flex items-center gap-10 pb-4">
            <button onClick={handleRewind}>
              <img src="/img/rewind-btn.png" alt="Rewind" className="w-10 h-10" />
            </button>
            <button onClick={handlePlayAndPause}>
              <img src={isPlaying ? "/img/pause-btn-olive.png" : "/svg/play-btn-olive.svg"} alt="Play/Pause" className="w-20 h-20 " />
            </button>
            <button onClick={handleForward}>
              <img src="/img/forward-btn.png" alt="Forward" className="w-10 h-10 " />
            </button>
          </div>
          <input
            type="range"
            value={currentTime}
            max={duration}
            onChange={handleSeek}
            className="range-input  w-full mt-6 bg-[#a0a2b17f] accent-[#4a503d]"
          />
          <audio
            ref={audioRef}
            src={music?.track_url}
            onTimeUpdate={handleTimeUpdate}
          ></audio>
        </div>
      </div>
    );
  };