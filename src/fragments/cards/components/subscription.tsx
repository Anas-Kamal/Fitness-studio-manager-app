import React from 'react'
import cls from 'classnames'
import styles from './event.module.scss'
import { SubscriptionType } from '../../../features/api-types'
import PencilIcon from '../../../icons/pencil'
import ThrashIcon from '../../../icons/thrash'

interface CardProps {
  className?: string
  subscription: SubscriptionType
  onEdit: () => void
  onDelete: () => void
}

const Card: React.FC<CardProps> = ({ className, subscription, onEdit, onDelete }) => (
  <div style={{ minWidth: '350px' }} className={cls(styles.wrapper, className)}>
    <div className={styles.title}>{subscription.subscription_name}</div>
    <div className={styles.separatorLine} />
    <div>
      <div
        className={
          styles.info
        }>{`${subscription.subscription_participants_id.length} כניסות לסטודיו •`}</div>
      <div className={styles.info}>{`${subscription.subscription_duration} •`}</div>
    </div>
    <div className={styles.separatorLine} />
    <div className={cls(styles.description, styles.info)}>
      {subscription.subscription_description}
    </div>
    <div className={styles.separatorLine} />
    <div className={styles.price}>{`₪${subscription.subscription_price}`}</div>
    <PencilIcon className={styles.edit} onClick={onEdit} />
    <ThrashIcon className={styles.delete} onClick={onDelete} />
  </div>
)

export default Card
