import React from 'react'
import { useSWRConfig } from 'swr'
import ENDPOINTS from '../../../features/endpoints'
import styles from './edit-time.module.scss'
import Modal from '../../form/modal'
import { TrainerSchedule } from '../../../features/api-types'
import { mongoSelector } from '../../../features/fetchers'
import { getMutateKey } from '../../../features/trainer'
import Schedule from '../../components/schedule'

interface EditTimeModalProps {
  className?: string
  style?: React.CSSProperties
  visible: boolean
  onClose: () => void
  trainerId: string
}

const EditTimeModal: React.FC<EditTimeModalProps> = ({ className, style, onClose, visible, trainerId }) => {
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string>()

  const { mutate } = useSWRConfig()

  const onSubmit = async (data: TrainerSchedule[]) => {
    try {
      await mongoSelector({
        from: ENDPOINTS.INSTRUCTOR.PATCH_SINGLE_INSTRUCTOR_PATCH,
        method: 'PATCH',
        body: {
          _id: trainerId,
          schedule: data,
        },
      })

      await mutate(getMutateKey())
      onClose()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }
// @ts-ignore
  const renderBody = () => <Schedule title="שעות פעילות" buttonText="ישור" onSubmit={onSubmit} />

  return (
    <Modal
      error={error}
      loading={submitting}
      style={style}
      className={className}
      onClose={onClose}
      visible={visible}
      footerStyles={styles.footerStyles}
      renderFooter={false}
    >
      {renderBody()}
    </Modal>
  )
}

export default EditTimeModal
