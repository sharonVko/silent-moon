import { Outlet } from 'react-router-dom';
import { Footer } from '../components/footer/Footer';

export const RootLayout = () => {
  return (
    <div className="">
      <main className="max-w-[414px] mx-auto">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};
