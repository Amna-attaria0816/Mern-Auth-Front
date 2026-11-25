import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Splash() {
  return (
    <div className="splash">
      <span className="spinner spinner-dark" />
    </div>
  );
}

export function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Splash />;
  return user ? children : <Navigate to="/login" replace />;
}

export function GuestRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Splash />;
  return user ? <Navigate to="/dashboard" replace /> : children;
}
