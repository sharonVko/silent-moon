import { Header } from '../../components/header/Header';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import { Link } from 'react-router-dom';
import { Footer } from '../../components/footer/Footer';
import WeekToggle from '../../components/weekToggle/WeekToggle';

export const Reminders = () => {
  return (
    <div>
      <Header />
      <div className="p-5 mt-10">
        <h1 className="f-s-24 sans-pro-900 dark-green">
          What time would you <br /> like to meditate?
        </h1>
        <p className="grey f-s-16 sans-pro-600 mt-2">
          Any time you can choose but We <br /> recommend first thing in th morning.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['MultiSectionDigitalClock']}>
            <DemoItem>
              <MultiSectionDigitalClock className="dark-green-bg " />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className="p-5">
        <h1 className="f-s-24 sans-pro-900 dark-green">
          Which day would you <br /> like to meditate?
        </h1>
        <p className="grey f-s-16 sans-pro-600 mt-2">
          Everyday is best, but we recommend <br /> picking <br />
          at least five.
        </p>
      </div>

      <WeekToggle />

      <div className="flex flex-col items-center">
        <Link to="/home">
          <button className="btn-pink mt-1.5 uppercase">Save</button>
        </Link>
        <Link to="/profile">
          <button className="no-reminder f-s-16 text-center mt-1.5 mb-1.5 sans-pro-600 f-s-16 uppercase">
            No thanks
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  );
};
