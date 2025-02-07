
import { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import supabase from "../../utils/supabase";
import { Footer } from "../../components/footer/Footer";
import { useUserContext } from "../../context/UserProvider";
import { Search } from "../../components/search/Search";
import { Meditation, Yoga } from "../home/Home";
import { ArticleList } from "../../components/articleList/ArticleList";
import UserAvatar from "../../components/userAvatar/UserAvatar";
import { Link } from "react-router-dom";
import Reminder from '/svg/reminder_icon.svg'

type YogaFavoriteResponse = {
  item_id: number;
  yoga: Yoga;
}

type MeditationFavoriteResponse = {
  item_id: number;
  meditation: Meditation;
}

const Profile = () => {
  const { user } = useUserContext();
  const [favouriteYoga, setFavouriteYoga] = useState<Yoga[]>([]);
  const [favouriteMeditation, setFavouriteMeditation] = useState<Meditation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        // Get favorite yoga items with full yoga data
        const { data: yogaFavorites } = await supabase
          .from('user_favorites_yoga')
          .select(`
            item_id,
            yoga:yoga(*)
          `)
          .eq('user_id', user.id) as { data: YogaFavoriteResponse[] | null };


        // Get favorite meditation items with full meditation data  
        const { data: meditationFavorites } = await supabase
          .from('user_favorites_meditation')
          .select(`
            item_id,
            meditation:meditation(*)
          `)
          .eq('user_id', user.id) as { data: MeditationFavoriteResponse[] | null };

        // Extract the full yoga/meditation objects from the joined results
        const yogaData = yogaFavorites?.map(fav => fav.yoga) || [];
        const meditationData = meditationFavorites?.map(fav => fav.meditation) || [];

        setFavouriteYoga(yogaData);
        setFavouriteMeditation(meditationData);
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      <Header />
      <div>
        <UserAvatar />
        <Link to="/profile/reminders">
          <img src={Reminder} alt="" />
          <p>Remind Me!</p>
        </Link>
        
      </div>
      <Search />
      {(favouriteYoga.length > 0 || favouriteMeditation.length > 0) ? (
      <ArticleList yoga={favouriteYoga} meditation={favouriteMeditation} /> ) : (
        <div>
          <h1>No favorites yet</h1>
        </div>
      )}
      <Footer />
    </>
  );
};


export default Profile;
