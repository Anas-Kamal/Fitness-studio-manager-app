import React from 'react'
import cls from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import { format } from 'date-fns'
import ENDPOINTS from '../../../features/endpoints'
import styles from './add-trainer.module.scss'
import LabelWrapper from '../../form/label-wrapper'
import Modal from '../../form/modal'
import { TrainerAddType } from '../../../features/api-types'
import Select from '../../components/select'
import { Input } from '../../components/input'
import DatePickerIcon from '../../../icons/data-picker'
import { mongoSelector } from '../../../features/fetchers'
import useAuth from '../../../features/auth'
import { getMutateKey } from '../../../features/trainer'
import DatePicker from '../../components/date-picker'

interface AddTrainerProps {
  className?: string
  style?: React.CSSProperties
  visible: boolean
  onClose: () => void
}

const AddTrainerModal: React.FC<AddTrainerProps> = ({ className, style, onClose, visible }) => {
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string>()
  const {
    register,
    handleSubmit,
    control,

    formState: { errors }
  } = useForm<TrainerAddType>({
    defaultValues: {}
  })

  const { profile } = useAuth()

  const { mutate } = useSWRConfig()

  const onSubmit = async (data: TrainerAddType) => {
    setSubmitting(true)
    setError(undefined)

    try {
      await mongoSelector({
        from: ENDPOINTS.INSTRUCTOR.CREATE_SINGLE_INSTRUCTOR_POST,
        method: 'POST',
        body: {
          ...data,
          studio: profile?._id,
          created_at: format(new Date(), 'dd/MM/yyyy'),
          date_of_last_training: '-',
          amount_of_trainings: '-',
          schedule: []
        }
      })

      // Add hook for fetching
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
      <LabelWrapper
        title="שם מלא"
        style={{ gridArea: 'name' }}
        error={'name' in errors ? 'Required' : null}>
        {({ id }) => <Input id={id} {...register('name')} />}
      </LabelWrapper>
      <LabelWrapper
        title="מספר טלפון"
        style={{ gridArea: 'email' }}
        error={'email' in errors ? 'Required' : null}>
        {({ id }) => <Input id={id} type="email" {...register('email')} />}
      </LabelWrapper>
      <LabelWrapper
        title="מספר טלפון"
        style={{ gridArea: 'phone' }}
        error={'phone' in errors ? 'Required' : null}>
        {({ id }) => <Input id={id} {...register('phone')} />}
      </LabelWrapper>
      <LabelWrapper
        title="מין"
        style={{ gridArea: 'sex' }}
        error={'sex' in errors ? 'Required' : null}>
        {() => (
          <Controller
            control={control}
            name="sex"
            render={({ field }) => (
              <Select
                searchable={false}
                value={field.value}
                // @ts-ignore
                onChange={field.onChange}
                options={[
                  { value: 'male', label: 'זכר' },
                  { value: 'female', label: 'נקבה' }
                ]}
              />
            )}
          />
        )}
      </LabelWrapper>
      <LabelWrapper
        title="תאריך לידה"
        style={{ gridArea: 'birthday_date' }}
        error={'birthday_date' in errors ? 'Required' : null}>
        {({ id }) => (
          <div>
            <DatePicker id={id} {...register('birthday_date')} />
          </div>
        )}
      </LabelWrapper>
      <LabelWrapper
        title="סוגי אימונים"
        style={{ gridArea: 'type_of_trainings' }}
        error={'type_of_trainings' in errors ? 'Required' : null}>
        {() => (
          <Controller
            control={control}
            name="type_of_trainings"
            render={({ field }) => (
              <Select
                searchable={false}
                value={field.value}
                // @ts-ignore
                onChange={field.onChange}
                options={[{ value: 'hello', label: 'box' }]}
              />
            )}
          />
        )}
      </LabelWrapper>
    </form>
  )
  return (
    <Modal
      style={style}
      className={className}
      onOk={handleSubmit(onSubmit)}
      onClose={onClose}
      visible={visible}
      footerStyles={styles.footerStyles}
      title="הוספת מדריך חדש"
      subTitle="מלא את הפרטים הבאים על מנת ליצור כרטיס מאמן חדש "
      okTitle="הוסף מאמן">
      {renderBody()}
    </Modal>
  )
}

export default AddTrainerModal
