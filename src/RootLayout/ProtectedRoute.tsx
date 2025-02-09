import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserProvider';
import { Loader } from '../components/loader/Loader';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUserContext();

  console.log(user);

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
