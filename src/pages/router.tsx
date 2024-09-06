import React from 'react'

import { Navigate } from 'react-router-dom'
import Login from '../fragments/login/login'
import { ROUTES } from '../lib/constants'

import CalendarPageLayout from './calendar'
import TrainersPageLayout from './trainer'
import TrainerProfilePageLayout from './trainer-page'
import TraineesPageLayout from './trainee'
import TraineesProfilePageLayout from './trainees-page'
import RoomsPageLayout from './rooms'
import TrainingsPageLayout from './trainings'
import CardAndSubscriptionsPageLayout from './cards'
import RegistrationPageLayout from './registration'

type RouteType = {
  path: string
  element: React.ReactNode
  exact: boolean
}

export const publicRoutes: RouteType[] = [
  { exact: true, path: ROUTES.LOGIN, element: <Login /> },
  { exact: true, path: ROUTES.REGISTRATION, element: <RegistrationPageLayout /> },
  {
    exact: true,
    path: '*',
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
]
export const privateRoutes: RouteType[] = [
  { exact: true, path: ROUTES.CALENDAR, element: <CalendarPageLayout /> },

  { exact: true, path: ROUTES.TRAININGS, element: <TrainingsPageLayout /> },

  { exact: true, path: ROUTES.TRAINERS, element: <TrainersPageLayout /> },
  { exact: true, path: ROUTES.TRAINER_PROFILE_PAGE, element: <TrainerProfilePageLayout /> },

  { exact: true, path: ROUTES.TRAINEES, element: <TraineesPageLayout /> },
  { exact: true, path: ROUTES.TRAINEES_PROFILE_PAGE, element: <TraineesProfilePageLayout /> },

  { exact: true, path: ROUTES.ROOM_LIST, element: <RoomsPageLayout /> },

  { exact: true, path: ROUTES.TRAININGS, element: <TrainingsPageLayout /> },

  { exact: true, path: ROUTES.CARDS_AND_SUBSCRIPTION, element: <CardAndSubscriptionsPageLayout /> },

  {
    exact: true,
    path: '*',
    element: <Navigate to={ROUTES.CALENDAR} replace />,
  },
]
