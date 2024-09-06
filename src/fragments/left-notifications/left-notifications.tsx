import React from 'react'
import cls from 'classnames'
import styles from './left-notifications.module.scss'
import Notification from './notification'
import useResizeObserver from '../../hooks/resize-observer'

interface LeftNotificationsProps {
  className?: string
  style?: React.CSSProperties
}
const collection = [
  { time: 'יום ראשון, 16:05', title: 'קיבלת בקשה לאימון חדש', type: 'approve' },
  { time: 'יום ראשון, 12:34', title: 'קיבלת בקשה לאימון חדש', type: 'approve' },
  { time: 'יום שבת, 10:45', title: 'קיבלת בקשה לאימון חדש', type: 'approve' },
] as const
const LeftNotifications: React.FC<LeftNotificationsProps> = ({ className, style }) => {
  const observer = useResizeObserver()

  return (
    <div style={style} className={cls(styles.wrapper, className, { [styles.hidden]: observer && observer < 1100 })}>
      <span>התראות</span>

      {collection.length > 0 &&
        collection.map((notif, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Notification key={idx} time={notif.time} title={notif.title} type={notif.type} />
        ))}
    </div>
  )
}

export default LeftNotifications
