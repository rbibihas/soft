import React from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { AdminLogin } from '../../pages/admin/AdminLogin';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <>{children}</>;
};