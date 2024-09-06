/* eslint-disable no-underscore-dangle */
import React from 'react'
import cls from 'classnames'
import { useSWRConfig } from 'swr'
import ENDPOINTS from '../../../features/endpoints'
import styles from './event-cancel.module.scss'
import Modal from '../../form/modal'
import { mongoSelector } from '../../../features/fetchers'
import { getGroupSessionMutateKey } from '../../../features/calendar-groups-sessions'
import { getPrivateSessionMutateKey } from '../../../features/calendar-private-session'
import CancelEventSuccess from './event-cancel-success'
import CheckBox from '../../components/checkbox'

interface CancelEventInputProps {
  className?: string
  style?: React.CSSProperties
  isVisible: boolean
  onClose: () => void
  event: any
  eventType: 'availability' | 'event'
}

const CancelEvent: React.FC<CancelEventInputProps> = ({ event, onClose, isVisible, className, eventType, style }) => {
  const [isSuccessVisible, setIsSuccessVisible] = React.useState(false)
  const [cancelAllToggle, setCancelAllToggle] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState('')
  const { mutate } = useSWRConfig()

  const renderEventCancelBody = () => (
    <div className={styles.body}>
      <div className={styles.spacerLine} />
      <div className={styles.eventText}>האם ברצונך לבטל את האימון ולהודיע למשתתפים?</div>
      {event.group_weekly_repeat && (
        <div className={styles.recurring}>
          <CheckBox on={cancelAllToggle} onChange={() => setCancelAllToggle(!cancelAllToggle)} />
          <span>בטל את כל האימון הבאים ביומן</span>
        </div>
      )}
    </div>
  )

  const onSubmit = async () => {
    if (event.group_weekly_repeat && cancelAllToggle) {
      setIsSubmitting(true)
      try {
        await mongoSelector({
          from: `${ENDPOINTS.EVENT.DELETE_RECURRING_GROUP_EVENT_DELETE}/${event.group_recurring_id}`,
          method: 'DELETE',
        })
        await mutate(getGroupSessionMutateKey())
        setIsSuccessVisible(true)
        onClose()
      } catch (err) {
        setIsSubmitting(false)
        setError(err as string)
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setIsSubmitting(true)
      try {
        await mongoSelector({
          from: `${ENDPOINTS.EVENT.DELETE_SESSION_EVENT_DELETE}/${event.group_isGroup ? 'group' : 'private'}/${
            event._id
          }`,
          method: 'DELETE',
        })
        await mutate(event.group_isGroup ? getGroupSessionMutateKey() : getPrivateSessionMutateKey())
        setIsSuccessVisible(true)
        onClose()
      } catch (err) {
        setIsSubmitting(false)
        setError(err as string)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <>
      <Modal
        title="ביטול אימון קבוצתי"
        subTitle={
          eventType === 'event'
            ? `${new Date(event.private_date).toLocaleDateString('he', {
                weekday: 'long',
              })} ,
        ${new Date(event.private_date).toLocaleDateString('he', {
          month: 'long',
        })}
        ${new Date(event.private_date).getDate()} • ${event.private_finish}-${event.private_start}`
            : `${new Date(event.group_date).toLocaleDateString('he', {
                weekday: 'long',
              })} ,
      ${new Date(event.group_date).toLocaleDateString('he', { month: 'long' })}
      ${new Date(event.group_date).getDate()} • ${event.group_finish}-${event.group_start}`
        }
        style={style}
        error={error}
        isSubmitDisabled={isSubmitting}
        className={cls(styles.wrapper, className)}
        visible={isVisible}
        onClose={onClose}
        onOk={onSubmit}
        okTitle="שמירה"
      >
        {renderEventCancelBody()}
      </Modal>
      <CancelEventSuccess
        style={{ width: 397 }}
        isVisible={isSuccessVisible}
        onClose={() => setIsSuccessVisible(false)}
      />
    </>
  )
}

export default CancelEvent
