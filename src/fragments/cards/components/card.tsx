import React from 'react'
import cls from 'classnames'
import styles from './event.module.scss'
import { CardType } from '../../../features/api-types'
import PencilIcon from '../../../icons/pencil'
import ThrashIcon from '../../../icons/thrash'
import { TIME_PERIODS } from '../../../lib/constants'

interface CardProps {
  className?: string
  card: CardType
  onEdit: () => void
  onDelete: () => void
}

const Card: React.FC<CardProps> = ({ className, card, onEdit, onDelete }) => (
  <div style={{minWidth:"350px"}} className={cls(styles.wrapper, className)}>
    <div className={styles.title}>{card.card_name}</div>
    <div className={styles.separatorLine} />
    <div>
      <div className={styles.info}>{`${card.card_participants_number} כניסות לסטודיו •`}</div>
      <div className={styles.info}>
        {`${TIME_PERIODS.filter((period) => period.value === card.card_duration)[0]?.label} •`}
      </div>
    </div>
    <div className={styles.separatorLine} />
    <div className={cls(styles.description, styles.info)}>{card.card_description}</div>
    <div className={styles.separatorLine} />
    <div className={styles.price}>{`₪${card.card_price}`}</div>
    <PencilIcon className={styles.edit} onClick={onEdit} />
    <ThrashIcon className={styles.delete} onClick={onDelete} />
  </div>
)

export default Card
