import { Link } from "react-router-dom";


export const Welcome = () => {
  return <div className="p-8">
    <div className="bg-[url('/img/welcome_page.png')] bg-cover  h-screen w-full mb-12 flex items-center justify-center">
      <p className="light-cream text-3xl px-12 py-6">Hi Leon, <br /> welcome <br />
      to Silent <br /> Moon</p>
    </div>
    <Link to={'/home'} className="btn-pink">GET STARTED</Link>
  </div>;
};

