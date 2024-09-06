import React from 'react'
import cls from 'classnames'

interface LoginPageProps {
  className?: string
  style?: React.CSSProperties
}

const LoginPageLayout: React.FC<LoginPageProps> = ({ className, style }) => (
  <div style={style} className={cls(className)}>
    LoginPage
  </div>
)

export default LoginPageLayout
