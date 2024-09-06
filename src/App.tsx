import './styles.css'
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { PublicRoute } from './fragments/routing/PublicRoute'
import { PrivateRoute } from './fragments/routing/PrivateRoute'
import { UserRoute } from './fragments/routing/UserRoute'
import { ROUTES } from './lib/constants'
import TrainersPageLayout from './pages/trainer'
import TrainerProfilePageLayout from './pages/trainer-page'
import RoomsPageLayout from './pages/rooms'
import CalendarPageLayout from './pages/calendar'
import TrainingsPageLayout from './pages/trainings'
import TraineesPageLayout from './pages/trainee'
import SettingsPageLayout from './pages/settings'
import TraineesProfilePageLayout from './pages/trainees-page'
import CardAndSubscriptionsPageLayout from './pages/cards'
import RegistrationPageLayout from './pages/registration'
import Login from './fragments/login/login'
import CreateSeller from './pages/registration/create-seller'

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to={ROUTES.CALENDAR} replace />} />
    <Route element={<PrivateRoute />}>
      <Route element={<UserRoute />}>
        <Route path={ROUTES.TRAINERS} element={<TrainersPageLayout />} />
        <Route path={ROUTES.TRAINER_PROFILE_PAGE} element={<TrainerProfilePageLayout />} />
        <Route path={ROUTES.ROOM_LIST} element={<RoomsPageLayout />} />
      </Route>
      <Route path={ROUTES.CALENDAR} element={<CalendarPageLayout />} />
      <Route path={ROUTES.TRAININGS} element={<TrainingsPageLayout />} />
      <Route path={ROUTES.TRAINEES} element={<TraineesPageLayout />} />
      <Route path={ROUTES.TRAINEES_PROFILE_PAGE} element={<TraineesProfilePageLayout />} />
      <Route path={ROUTES.TRAININGS} element={<TrainingsPageLayout />} />
      <Route path={ROUTES.CARDS_AND_SUBSCRIPTION} element={<CardAndSubscriptionsPageLayout />} />
      <Route path={ROUTES.CREATE_SELLER} element={<CreateSeller />} />
      <Route path={ROUTES.SETTINGS} element={<SettingsPageLayout />} />
      
    </Route>
    <Route element={<PublicRoute />}>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTRATION} element={<RegistrationPageLayout />} />
    </Route>
  </Routes>
)

export default App
