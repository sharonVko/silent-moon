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
import { ActivityPage } from './pages/activity/Activity';
import Profile from './pages/profile/Profile';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import { ProtectedRoute } from './RootLayout/ProtectedRoute';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/welcome"
          element={
            <ProtectedRoute>
              <Welcome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="activity/:type"
          element={
            <ProtectedRoute>
              <ActivityPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/music"
          element={
            <ProtectedRoute>
              <Music />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reminders"
          element={
            <ProtectedRoute>
              <Reminders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:article/:id"
          element={
            <ProtectedRoute>
              <PageDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/player/:id"
          element={
            <ProtectedRoute>
              <MeditationPlayer />
            </ProtectedRoute>
          }
        />
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
