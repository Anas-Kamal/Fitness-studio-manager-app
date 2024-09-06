import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../../features/auth'
import { ROUTES } from '../../lib/constants'


export const PrivateRoute = () => {
  const location = useLocation()
  const { isAuthenticated, loadUserProfile } = useAuth()

  React.useEffect(() => {
    if (isAuthenticated) {
      loadUserProfile()
    }
  }, [isAuthenticated])

  return !isAuthenticated ? <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace /> : <Outlet />
}
