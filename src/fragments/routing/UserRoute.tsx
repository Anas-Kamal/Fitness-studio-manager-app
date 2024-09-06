import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../../features/auth'
import { ROUTES } from '../../lib/constants'


export const UserRoute = () => {
  const location = useLocation()
  const { view } = useAuth()

  return view !== 'studio' ? <Navigate to={ROUTES.CALENDAR} state={{ from: location }} replace /> : <Outlet />
}
