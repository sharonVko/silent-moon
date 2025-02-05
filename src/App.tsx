import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import { RootLayout } from './RootLayout/RootLayout';
import { Login } from './pages/login/Login';
import { Welcome } from './pages/welcome/Welcome';
import { Home } from './pages/home/Home';
import { PageDetail } from './pages/pageDetail/PageDetail';
import { Music } from './pages/music/Music';
import { Reminders } from './pages/reminders/Reminders';
import { MeditationPlayer } from './pages/meditationPlayer/MeditationPlayer';
import { Activity } from './pages/activity/Activity';
import { Profile } from './pages/profile/Profile';

import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';




function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/welcome" element={<Welcome />} />
        <Route path="/home" element={<Home />} />


        <Route path="activity/:type" element={<Activity />} />

        <Route path="/music" element={<Music />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/:article/:id" element={<PageDetail />} />
        <Route path="/player/:id" element={<MeditationPlayer />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
