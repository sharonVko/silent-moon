import React, { useEffect, useState } from 'react';
import { Backbutton } from '../../components/backButton/Backbutton';
import { DownloadButton } from '../../components/downloadButton/DownloadButton';
import supabase from '../../utils/supabase';
import { useParams } from 'react-router-dom';

export const MeditationPlayer = () => {
  const [musik, setMusik] = useState('');
  const { id } = useParams();
  useEffect(() => {
    const fetchMusik = async () => {
      const { data, error } = await supabase.from('playlist_tracks').select('*').eq('id', id).single();

      if (data) {
        setMusik(data);
      }
    };

    fetchMusik();
  }, []);

  return (
    <div className="relative">
      <Backbutton />
      <DownloadButton musik={musik?.track_url} />
    </div>
  );
};
