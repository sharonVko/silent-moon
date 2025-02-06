import { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import supabase from "../../utils/supabase";
import { Footer } from "../../components/footer/Footer";
import { useUserContext } from "../../context/UserProvider";
import { Search } from "../../components/search/Search";
// import FavouriteList from "../../components/favouriteList/favouriteList";



const Profile = () => {

  const { user } = useUserContext()
  const [favouriteYoga, setFavouriteYoga] = useState([])
  const [favouriteMeditation, setFavouriteMeditation] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const {data: favYoga, error: yogaErr} = await supabase.from('user_favotires_yoga').select('*').eq('user_id', user?.id)
    
      if(yogaErr) console.error(yogaErr);
      
      const { data: favMedidation, error: meditationErr} = await supabase.from('user_favorites_meditation').select('*').eq('user_id' , user?.id)

      if(meditationErr) console.error(meditationErr);
      
      setFavouriteYoga(favYoga)
      setFavouriteMeditation(favMedidation)
    }
    fetchData()
  }, [user?.id])

  console.log(favouriteMeditation);
  console.log(favouriteYoga);
  
  

  return ( 
    <>
      <Header/>
      <Search/>
      {/* <FavouriteList yoga={favouriteYoga} meditation={favouriteMeditation}/> */}
      <Footer/>
    </>
  );
}

export default Profile;