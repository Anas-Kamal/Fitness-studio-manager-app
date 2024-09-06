import * as React from 'react'
import cls from 'classnames'
import styles from './alert.module.scss'

export interface AlertProps {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ children, style, className }, ref) => {
  if (!children) {
    return null
  }

  return (
    <div ref={ref} className={cls(styles.wrapper, className)} style={style}>
      {children}
    </div>
  )
})

export default Alert
