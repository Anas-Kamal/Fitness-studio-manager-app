import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../../features/auth'
import { ROUTES } from '../../lib/constants'


export const PublicRoute = () => {
  const location = useLocation()
  const locationState = location?.state as { from: { pathname: string } }
  const backPath = locationState?.from?.pathname
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={backPath ?? ROUTES.CALENDAR} state={{ from: location }} replace />
  }

  return <Outlet />
}
