/* eslint-disable no-underscore-dangle */
import React from 'react'
import cls from 'classnames'
import { useSWRConfig } from 'swr'
import ENDPOINTS from '../../../features/endpoints'
import styles from './card.module.scss'
import Modal from '../../form/modal'
import { CardType, SubscriptionType } from '../../../features/api-types'
import { mongoSelector } from '../../../features/fetchers'
import { getCardsMutateKey } from '../../../features/cards'
import { getSubscriptionsMutateKey } from '../../../features/subscriptions'

interface DeleteCardProps {
  className?: string
  style?: React.CSSProperties
  isVisible: boolean
  onClose: () => void
  card?: CardType | SubscriptionType
}

const DeleteCard: React.FC<DeleteCardProps> = ({ className, style, onClose, isVisible, card }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState('')
  const { mutate } = useSWRConfig()

  const onSubmit = async () => {
    setIsSubmitting(true)
    try {
      await mongoSelector({
        from: `${ENDPOINTS.EVENT.DELETE_SUBSCRIPTION_DELETE}/${card?._id}`,
        method: 'DELETE'
      })
    } catch (err) {
      setIsSubmitting(false)
      setError(err as string)
    }
    if (!error && !isSubmitting) {
      await mutate(getSubscriptionsMutateKey())
      onClose()
    }
    setIsSubmitting(false)
  }

  const renderCourseBody = () => (
    <div className={styles.deleteCardText}>
      <div className={styles.textWrapper}>אתה הולך למחוק את הכרטיסיה, אתה בטוח שברצונך להמשיך?</div>
    </div>
  )

  return (
    <Modal
      title="מחיקת כרטיסייה"
      style={style}
      error={error}
      isSubmitDisabled={isSubmitting}
      className={cls(styles.wrapper, className)}
      visible={isVisible}
      onClose={onClose}
      okTitle="מחק"
      onOk={onSubmit}
      footerStyle={{ width: 528, alignSelf: 'center', marginBottom: 20 }}>
      <>{renderCourseBody()}</>
    </Modal>
  )
}

export default DeleteCard
