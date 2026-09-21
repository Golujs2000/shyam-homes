import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminData } from '../../context/AdminDataContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAdminData();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
