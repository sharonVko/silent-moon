
import { Header } from "../../components/header/Header";
import { ItemSong } from "../../components/itemSong/ItemSong";
import { UserCount } from "../../components/userCount/UserCount";

const Music = () => {


  return ( <>
  <Header/>
        <div className="py-24 px-10 text-center">
          <p className="f-s-36 sans-pro-900 text-[#3F414E]">Playlist Title</p>
          <p className="text-[#3F414E] fr-s-36 grey">PLAYLIST</p>
          <p className="grey">description</p>
        </div>
        <UserCount/>
        <section className="playlist-wrapper p-4">
          <div className="text-center mx-auto">
          <ItemSong/>
          </div>
        </section>
  </> );
}
 
export default Music;