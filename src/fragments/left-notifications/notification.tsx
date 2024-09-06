import React from 'react'
import cls from 'classnames'
import styles from './left-notifications.module.scss'
import NotifyCalendar from '../../icons/norification-calendar'

interface Notification {
  className?: string
  type: 'approve'
  title: string
  time: string
  style?: React.CSSProperties
}

const ENUM_ICONS = {
  approve: NotifyCalendar,
}

const Notification: React.FC<Notification> = ({ className, style, type, title, time }) => {
  const ProperIcon = ENUM_ICONS[type]
  return (
    <div style={style} className={cls(styles.notificationWrapper, className)}>
      <div>
        <div>
          <span>{title}</span>
          <span>{time}</span>
        </div>
        <span>
          <ProperIcon />
        </span>
      </div>

      {type === 'approve' && (
        <div className={cls(styles.btns)}>
          <button type="button">סירוב</button>
          <button type="button">אישור</button>
        </div>
      )}
    </div>
  )
}

export default Notification
