import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

const ProtectedRoute = ({ token, children }) => {
  if (!token) {
    console.log('Token (failed): ' + token);
    return <Navigate to="/login" replace />;
  }

  console.log("Token (succeed): " + token);
  return children;
};

export default React.memo(ProtectedRoute)
