import { Link } from "react-router-dom";

export const Welcome = () => {
  return <div className=" mx-auto">
    <div className="bg-[url('/img/welcome_page.png')] bg-contain bg-no-repeat h-screen w-full mb-12">
    </div>
    <h3 className="light-cream text-center text-[16px] font-medium tracking-widest absolute inset-x-0 top-8 z-1 ">SILENT MOON</h3>
      <p className="light-cream text-3xl/normal tracking-wider font-extrabold pl-8 pt-2 absolute top-24 left-1">Hi Leon , <br /> welcome <br />
      to Silent <br /> Moon</p>
    <Link to={'/home'} className="btn-pink absolute bottom-18 left-8">GET STARTED</Link>
  </div>;
};
