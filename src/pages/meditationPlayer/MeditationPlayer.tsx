import React, { useEffect, useState } from 'react';
import { Backbutton } from '../../components/backButton/Backbutton';
import { DownloadButton } from '../../components/downloadButton/DownloadButton';
import supabase from '../../utils/supabase';
import { useParams } from 'react-router-dom';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export const MeditationPlayer = () => {
  const [music, setMusic] = useState('');
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
      }
    };

    fetchMusic();
  }, [id]);

  return (
    <div className="relative  ">
      <img src="/img/player_meditation.png" alt="light camouflage img" />
      <Backbutton />
      <DownloadButton musik={music?.track_url} />
      <div className=' player-container absolute top-80 left-18'>
      <AudioPlayer
    src={music}
    onPlay={() => console.log('onPlay')}
    showSkipControls={true}
    showJumpControls={true}
    customAdditionalControls={[]}
    customVolumeControls={[]}
  />
      </div>

    </div>
  );
};
