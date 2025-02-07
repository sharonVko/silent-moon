import { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import supabase from "../../utils/supabase";
import { Footer } from "../../components/footer/Footer";
import { useUserContext } from "../../context/UserProvider";
import { Search } from "../../components/search/Search";
import { Meditation, Yoga } from "../home/Home";
import { ArticleList } from "../../components/articleList/ArticleList";
import UserAvatar from "../../components/userAvatar/UserAvatar";



const Profile = () => {

  const { user } = useUserContext()
  const [favouriteYoga, setFavouriteYoga] = useState<Yoga[]>([])
  const [favouriteMeditation, setFavouriteMeditation] = useState<Meditation[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if(user?.id){
        const {data: yogaResult, error: yogaError} = await 
          supabase
          .from('user_favorites_yoga')
          .select('*')
          .eq('user_id', user.id);
          
        const {data: mediResult, error: mediError} = await
          supabase
          .from('user_favorites_meditation')
          .select('*')
          .eq('user_id', user.id)
        
        if(yogaResult) setFavouriteYoga(yogaResult)
          else console.error(yogaError);

        if(mediResult) setFavouriteMeditation(mediResult)
          else console.error(mediError);
      }
    }

    fetchData()
  }, [user])

  console.log(user);
  console.log(favouriteMeditation);
  console.log(favouriteYoga);

  return ( 
    <>
      <Header/>
      <div>
        <UserAvatar/>
      </div>
      <Search/>
      <ArticleList yoga={favouriteYoga} meditation={favouriteMeditation}/>
      <Footer/>
    </>
  );
}

export default Profile;