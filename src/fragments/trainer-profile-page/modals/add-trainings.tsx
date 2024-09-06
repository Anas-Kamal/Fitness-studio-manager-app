import React from 'react'
import cls from 'classnames'
import { useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import ENDPOINTS from '../../../features/endpoints'
import styles from './add-trainings.module.scss'
import LabelWrapper from '../../form/label-wrapper'
import Modal from '../../form/modal'
import { TrainerAddType, TrainerTable } from '../../../features/api-types'
import { Input } from '../../components/input'
import { mongoSelector } from '../../../features/fetchers'
import { getMutateKey } from '../../../features/trainer'

interface EditTrainerModalProps {
  className?: string
  style?: React.CSSProperties
  visible: boolean
  onClose: () => void
  trainer: TrainerTable
}

const AddTrainingsModal: React.FC<EditTrainerModalProps> = ({ className, style, onClose, visible, trainer }) => {
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string>()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TrainerAddType>()

  React.useEffect(() => {
    reset(trainer)
  }, [trainer])

  const { mutate } = useSWRConfig()

  const onSubmit = async (data: TrainerAddType) => {
    setSubmitting(true)
    setError(undefined)

    try {
      await mongoSelector({
        from: ENDPOINTS.INSTRUCTOR.PATCH_SINGLE_INSTRUCTOR_PATCH,
        method: 'PATCH',
        body: {
          ...data,
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

  const renderBody = () => (
    <form className={cls(styles.wrapper)}>
      <LabelWrapper title="שם מלא" style={{ gridArea: 'name' }} error={'name' in errors ? 'Required' : null}>
        {({ id }) => <Input id={id} {...register('name')} />}
      </LabelWrapper>
    </form>
  )
  return (
    <Modal
      error={error}
      loading={submitting}
      style={style}
      className={className}
      onOk={handleSubmit(onSubmit)}
      onClose={onClose}
      visible={visible}
      footerStyles={styles.footerStyles}
      title="הוספת מדריך חדש"
      subTitle="מלא את הפרטים הבאים על מנת ליצור כרטיס מאמן חדש "
      okTitle="הוסף מאמן"
    >
      {renderBody()}
    </Modal>
  )
}

export default AddTrainingsModal
