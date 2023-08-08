import React from 'react';
import jwtDecode from 'jwt-decode';
import { Navigate } from 'react-router-dom';

export default function AuthRoute({ children }) {
  const token = localStorage.getItem('token');
  const isLoggedIn = token !== null && localStorage.getItem('id') !== null;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      return <Navigate to="/login" />;
    }
  } catch (error) {
    return <Navigate to="/login" />;
  }

  return children;
}