import React from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export default function AdminRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      return <Navigate to="/login" />;
    }

    const isAdmin = decodedToken.userRole === 1;

    if (!isAdmin) {
      return <Navigate to="/unauthorized" />;
    }
  } catch (error) {
    return <Navigate to="/login" />;
  }

  return children;
}