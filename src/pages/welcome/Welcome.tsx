import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserProvider';

export const Welcome = () => {
  const { user } = useUserContext();

  return (
    <div className="relative mx-auto">
      <div className="bg-[url('/img/welcome_page.png')] bg-contain bg-no-repeat h-screen w-full mb-12"></div>

      <h3 className="light-cream text-center text-[16px] font-medium tracking-widest absolute inset-x-0 top-6 z-1 ">
        SILENT MOON
      </h3>
      <p className="sans-pro-900 light-cream text-[36px] leading-11 tracking-wider font-extrabold pl-4 pt-2 absolute top-22 left-1">
        Hi {user?.user_metadata.first_name}, <br /> welcome <br />
        to Silent <br /> Moon
      </p>
      <Link to={'/home'} className="btn-pink light-cream absolute bottom-19 left-8 text-center pt-4">
        GET STARTED
      </Link>
    </div>
  );
};
