import React from 'react'
import Registration from '../../fragments/registration/registration'

interface RegistrationPageLayoutProps {
  className?: string
  style?: React.CSSProperties
}

const RegistrationPageLayout: React.FC<RegistrationPageLayoutProps> = ({ className, style }) => (
  <div style={{...style}} className={className}>
    <Registration />
  </div>
)

export default RegistrationPageLayout
