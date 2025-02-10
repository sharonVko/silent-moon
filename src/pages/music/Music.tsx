
import { useEffect, useState } from "react";
import { FavIcon } from "../../assets/svg/FavIcon";
import { ListenerIcon } from "../../assets/svg/ListenerIcon";
import { Header } from "../../components/header/Header";
import { ItemSong } from "../../components/itemSong/ItemSong";
import supabase from "../../utils/supabase";
import {useParams } from "react-router-dom";

interface IPlaylistMusic {
  title: string;
  description: string;
  favorites_count: number;
  views_count: number;
}

interface IPlaylistTrack {
  id: number;
  title: string;
  artist: string;
  duration: string;
  track_url: string;
}

const Music = () => {

  const { playlistId } = useParams();

  const [playlistTrack, setPlaylistTrack] = useState<IPlaylistTrack[]>([])
  const [playlistMusic, setPlaylistMusic] = useState<IPlaylistMusic>({
    title: '',
    description: '',
    favorites_count: 0,
    views_count: 0,
    
  })

  useEffect(() => {
    const fetchPlaylistData = async () => {
      const { data, error } = await supabase
        .from('music_playlists')
        .select('*')
        .eq('id', playlistId) 
        .single();

      if (data) {
        const { data: trackData, error } = await supabase
        .from('playlist_tracks')
        .select('*')
        .eq('playlist_id', playlistId);

        if (trackData) {
          setPlaylistTrack(trackData)
          console.log(trackData,error);
          
        }

        setPlaylistMusic(data);
      } else {
        console.error(error);
      }
    };

    fetchPlaylistData();
  }, [playlistId]);


  return ( <>
  <Header/>
        <div className="pt-24 pb-8 px-10 text-center">
          <p className="f-s-36 sans-pro-900 text-[#3F414E] pb-4 tracking-wide">{playlistMusic.title}</p>
          <p className="text-[#3F414E] fr-s-36 sans-pro-600 grey pb-4">PLAYLIST</p>
          <p className="grey">{playlistMusic.description}</p>
        </div>
        <article className="fav__info flex justify-evenly pb-8">
          <div className="fav__container flex items-center gap-1.5">
            <FavIcon />
            <p className="grey">{playlistMusic.favorites_count} Favorites</p>
          </div>

          <div className="listener__container flex items-center gap-1.5">
            <ListenerIcon />
            <p className="grey">{playlistMusic.views_count} Listening</p>
          </div>
        </article>
        <section className="playlist-wrapper p-4">
          <div className="text-center mx-auto">
          {playlistTrack.map((singleTrack) => (
          <ItemSong key={singleTrack.id} id={singleTrack.id} title={singleTrack.title} duration={singleTrack.duration}/>
          ))}
          </div>
        </section>
  </> );
}
 
export default Music;