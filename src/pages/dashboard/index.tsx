import React from 'react'
import cls from 'classnames'

interface DashboardProps {
  className?: string
  style?: React.CSSProperties
}

const Dashboard: React.FC<DashboardProps> = ({ className, style }) => (
  <div style={style} className={cls(className)}>
    Dashboard
  </div>
)

export default Dashboard
