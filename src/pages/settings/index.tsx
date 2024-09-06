import React from 'react'
import cls from 'classnames'
import Settingspage from '../../fragments/settings/Settings-page'
import PageContainer from '../../fragments/components/page-container'
import useAuth from '../../features/auth'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../lib/constants'

interface SettingsPageLayoutProps {
  className?: string
  style?: React.CSSProperties
}

const SettingspageLayout: React.FC<SettingsPageLayoutProps> = ({ className, style }) => {
  const { isAuthenticated, loadUserProfile, isLoading } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN)
    }
  }, [isAuthenticated])

  return (
    <div style={style} className={cls(className)}>
      <PageContainer>
        <Settingspage />
      </PageContainer>
    </div>
  )
}

export default SettingspageLayout
