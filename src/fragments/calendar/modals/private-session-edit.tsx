/* eslint-disable no-underscore-dangle */
import React from 'react'
import cls from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import ENDPOINTS from '../../../features/endpoints'
import styles from './private-session-edit.module.scss'
import Modal from '../../form/modal'
import LabelWrapper from '../../form/label-wrapper'
import Clock from '../../../icons/clock'
import DatePickerIcon from '../../../icons/data-picker'
import { PrivateSessionType } from '../../../features/api-types'
import { Input } from '../../components/input'
import Select from '../../components/select'
import useAuth from '../../../features/auth'
import { mongoSelector } from '../../../features/fetchers'
import { getPrivateSessionMutateKey } from '../../../features/calendar-private-session'
import { TYPES_OF_TRAININGS } from '../../../lib/constants'
import useTrainerStudio from '../../../features/trainer'

interface EditPrivateSessionProps {
  className?: string
  style?: React.CSSProperties
  isVisible: boolean
  onClose: () => void
  event: PrivateSessionType
}

const EditPrivateSession: React.FC<EditPrivateSessionProps> = ({ className, style, onClose, isVisible, event }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<PrivateSessionType>({
    defaultValues: { private_isPrivate: true },
  })

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState('')

  const { profile, view } = useAuth()
  const { mutate } = useSWRConfig()
  const watchAllFields = watch()

  const { collection: trainersCollection } = useTrainerStudio({ studio_id: profile?._id })

  const getFormattedTrainers = () => trainersCollection.map(trainer => ({ label: trainer.name, value: trainer._id }))
  const getFormattedTypesOfTrainings = () =>
    TYPES_OF_TRAININGS.map(training => ({ label: training.label.localization.he, value: `${training._id}` }))

  const onSubmit = async (data: PrivateSessionType) => {
    setIsSubmitting(true)
    try {
      await mongoSelector({
        from: ENDPOINTS.EVENT.EDIT_PRIVATE_SESSION_POST,
        method: 'POST',
        body: { ...data, _id: event._id },
      })
    } catch (err) {
      setIsSubmitting(false)
      setError(err as string)
    }
    setIsSubmitting(false)
    if (!error && !isSubmitting) {
      await mutate(getPrivateSessionMutateKey())
      onClose()
    }
  }

  const renderPrivateBody = () => (
    <>
      <div className={cls(styles.small, styles.privateBody)}>
        <LabelWrapper
          title="תאריך"
          style={{ gridArea: 'date' }}
          error={'private_date_of_end' in errors ? 'private_date_of_end' : null}
        >
          {({ id }) => (
            <div className={styles.svg}>
              <DatePickerIcon style={{ color: '#000' }} />
              <Input type="date" id={id} {...register('private_date')} />
            </div>
          )}
        </LabelWrapper>
        <LabelWrapper title="התחלה" style={{ gridArea: 'start' }} error={'start' in errors ? 'Required' : null}>
          {({ id }) => <Input icon={<Clock />} type="time" id={id} {...register('private_start')} />}
        </LabelWrapper>
        <LabelWrapper title="סיום" style={{ gridArea: 'finish' }} error={'finish' in errors ? 'Required' : null}>
          {({ id }) => <Input icon={<Clock />} type="time" id={id} {...register('private_finish')} />}
        </LabelWrapper>
      </div>
      <div className={cls(styles.small, styles.privateFooter)}>
        <LabelWrapper
          title="מיקום"
          style={{ gridArea: 'private_address' }}
          error={'private_address' in errors ? 'Required' : null}
        >
          {({ id }) => <Input id={id} {...register('private_address')} />}
        </LabelWrapper>
        <LabelWrapper
          title="סוג אימון"
          style={{ gridArea: 'room' }}
          error={'private_room' in errors ? 'Required' : null}
        >
          {({ id }) => (
            <Controller
              control={control}
              name="private_room"
              render={({ field }) => (
                <Select
                  searchable={false}
                  options={getFormattedTypesOfTrainings()}
                  id={id}
                  value={field.value}
                  // @ts-ignore
                  onChange={e => field.onChange(e)}
                />
              )}
            />
          )}
        </LabelWrapper>
        <LabelWrapper
          title="מדריך"
          style={{ gridArea: 'private_training' }}
          error={'private_instructor' in errors ? 'Required' : null}
        >
          {({ id }) => (
            <Controller
              control={control}
              name="private_instructor"
              render={({ field }) => (
                <Select
                  searchable={false}
                  disabled={view !== 'studio'}
                  options={getFormattedTrainers()}
                  id={id}
                  value={field.value}
                  // @ts-ignore
                  onChange={e => field.onChange(e)}
                />
              )}
            />
          )}
        </LabelWrapper>
      </div>
    </>
  )

  return (
    <Modal
      title="עריכות אימון אישי קיים"
      subTitle="צור אימון חדש על פי מה שבא לך  ומה שקבעת עם המתאמן שלך אישי או זוגי או קבוצתי או מה שבא לך היום או מחר או מחרתיים או אימון שנמשך שנתיים"
      style={style}
      footerStyle={{ marginBottom: 30, marginTop: 50 }}
      error={error}
      className={cls(styles.wrapper, className)}
      visible={isVisible}
      onClose={onClose}
      onOk={handleSubmit(onSubmit)}
      isSubmitDisabled={
        !Object.values(watchAllFields).every(item => item) || Object.keys(watchAllFields).length !== 7 || isSubmitting
      }
      okTitle="שמירה"
    >
      {renderPrivateBody()}
    </Modal>
  )
}

export default EditPrivateSession
