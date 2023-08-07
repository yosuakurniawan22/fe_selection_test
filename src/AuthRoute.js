import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AuthRoute({ children }) {
  const isLoggedIn = localStorage.getItem('token') && localStorage.getItem('id') !== null;

  if (isLoggedIn === undefined) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}
