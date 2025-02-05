import { Link } from "react-router-dom";


export const Welcome = () => {
  return <div className="p-4 mx-auto">
    <div className="bg-[url('/img/welcome_page.png')] bg-contain bg-no-repeat  h-screen w-full mb-8 flex relative">
    <h3 className="light-cream text-center text-xl tracking-widest absolute inset-x-0 top-8 z-1 ">SILENT MOON</h3>
      <p className="light-cream text-3xl/normal tracking-wider font-extrabold pl-8 pt-28">Hi Leon, <br /> welcome <br />
      to Silent <br /> Moon</p>
    </div>
    <Link to={'/home'} className="btn-pink">GET STARTED</Link>
  </div>;
};

