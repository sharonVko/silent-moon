import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import { RootLayout } from './RootLayout/RootLayout';
import { Login } from './pages/login/Login';
// import { SignIn } from './pages/signIn/SignIn';
// import { SignUp } from './pages/signUp/SignUp';
import { Welcome } from './pages/welcome/Welcome';
import { Home } from './pages/home/Home';
import { PageDetail } from './pages/pageDetail/PageDetail';
import { Music } from './pages/music/Music';
ihttps://github.com/FranticMario/silent-moon/pull/2/conflict?name=src%252Fpages%252Flogin%252FLogin.tsx&ancestor_oid=0a4793a7dde518709ce953771b9b56f3be5b731a&base_oid=cc65acd2b61662040a0175c8d9daa37628d4a8de&head_oid=2a4c5aa59de68d553faa57e7fbb2e8defd2c3041mport { Profile } from './pages/profile/Profile';
import { Reminders } from './pages/reminders/Reminders';
import { MeditationPlayer } from './pages/meditationPlayer/MeditationPlayer';
import { Activity } from './pages/activity/Activity';

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
        <Route path="/meditationplayer/:id" element={<MeditationPlayer />} />
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
