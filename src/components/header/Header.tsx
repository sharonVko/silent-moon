import { Link } from "react-router-dom";

export const Header = () => {
  return <header>
    <Link to="/home">
      <h3 className="absolute inset-x-0 top-5  z-1 text-center sans-pro-700 f-s-16 dark-green tracking-widest">SILENT MOON</h3>
    </Link>
  </header>;
};

