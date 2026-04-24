import { Navigate, useLocation } from 'react-router-dom';

/**
 * A wrapper component that only allows authenticated users to access a route.
 * Checks for both user and admin tokens.
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const userToken = localStorage.getItem('userToken');
  const adminToken = localStorage.getItem('adminToken');

  // If neither token is present, redirect to login
  if (!userToken && !adminToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
