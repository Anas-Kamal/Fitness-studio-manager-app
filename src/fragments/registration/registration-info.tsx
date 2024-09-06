import React from 'react'
import cls from 'classnames'
import styles from './registration-info.module.scss'

interface Notification {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

const RegistrationInfo: React.FC<Notification> = ({ className, style, children }) => (
  <div style={style} className={cls(styles.wrapper, className)}>
    {children}
  </div>
)

export default RegistrationInfo
