import React from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export default function AdminRoute({ children }) {
  const token = localStorage.getItem('token');

  if(!token) {
    return <Navigate to="/login" />;
  }

  const decodedToken = jwtDecode(token);
  const isAdmin = decodedToken.userRole === 1;

  if (!isAdmin) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
