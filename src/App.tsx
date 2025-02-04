import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import { RootLayout } from './RootLayout/RootLayout';
import { Login } from './pages/login/Login';
import { SignIn } from './pages/signIn/SignIn';
import { SignUp } from './pages/signUp/SignUp';
import { Welcome } from './pages/welcome/Welcome';
import { Home } from './pages/home/Home';
import { PageDetail } from './pages/pageDetail/PageDetail';
import { Yoga } from './pages/yoga/Yoga';
import { Meditate } from './pages/meditate/Meditate';
import { Music } from './pages/music/Music';
import { Profile } from './pages/profile/Profile';
import { Reminders } from './pages/reminders/Reminders';
import { MeditationPlayer } from './pages/meditationPlayer/MeditationPlayer';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/welcome" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/yoga" element={<Yoga />} />
        <Route path="/meditate" element={<Meditate />} />
        <Route path="/music" element={<Music />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/:article/:id" element={<PageDetail />} />
        <Route path="/meditationplayer" element={<MeditationPlayer />} />
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
