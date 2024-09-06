/* eslint-disable no-underscore-dangle */
import React from 'react'
import cls from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import ENDPOINTS from '../../../features/endpoints'
import styles from './group-session-edit.module.scss'
import Modal from '../../form/modal'
import LabelWrapper from '../../form/label-wrapper'
import Clock from '../../../icons/clock'
import DatePickerIcon from '../../../icons/data-picker'
import DatePicker from '../../components/date-picker'
import { GroupSessionType } from '../../../features/api-types'
import { Input } from '../../components/input'
import Select from '../../components/select'
import useAuth from '../../../features/auth'
import { mongoSelector } from '../../../features/fetchers'
import { getGroupSessionMutateKey } from '../../../features/calendar-groups-sessions'
import EditGroupSessionConfirm from './group-session-edit-confirm'
import useTrainerStudio from '../../../features/trainer'
import useRooms from '../../../features/rooms'
import { TYPES_OF_TRAININGS } from '../../../lib/constants'

interface EditGroupSessionProps {
  className?: string
  style?: React.CSSProperties
  isVisible: boolean
  onClose: () => void
  event: GroupSessionType
}

const EditGroupSession: React.FC<EditGroupSessionProps> = ({ className, style, onClose, isVisible, event }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    watch,
  } = useForm<GroupSessionType>({
    defaultValues: { group_isGroup: true },
  })

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false)
  const [error, setError] = React.useState('')

  const { profile, view } = useAuth()
  const { mutate } = useSWRConfig()
  const watchAllFields = watch()

  const { collection: roomsCollection, isLoading: isRoomsLoading } = useRooms({ studio_id: profile?._id })
  const { collection: trainersCollection, isLoading: isTrainersLoading } = useTrainerStudio({ studio_id: profile?._id })

  const getFormattedRooms = () => roomsCollection.map(room => ({ label: room.name_of_room, value: room._id }))
  const getFormattedTrainers = () => trainersCollection.map(trainer => ({ label: trainer.name, value: trainer._id }))
  const getFormattedTypesOfTrainings = () =>
    TYPES_OF_TRAININGS.map(training => ({ label: training.label.localization.he, value: `${training._id}` }))

  const handleSingleEdit = async (data: GroupSessionType) => {
    try {
      await mongoSelector({
        from: ENDPOINTS.EVENT.EDIT_GROUP_SESSION_POST,
        method: 'POST',
        body: { ...data, _id: event._id },
      })
    } catch (err) {
      setIsSubmitting(false)
      setError(err as string)
    }
    setIsSubmitting(false)
    if (!error && !isSubmitting) {
      await mutate(getGroupSessionMutateKey())
      onClose()
    }
  }

  const handleMultipleEdit = async (data: GroupSessionType) => {
    try {
      const body = {
        ...event,
        ...data,
      }
      await mongoSelector({
        from: ENDPOINTS.EVENT.EDIT_RECURRING_GROUP_SESSION,
        method: 'POST',
        body,
      })
    } catch (err) {
      setIsSubmitting(false)
      setError(err as string)
    }
    setIsSubmitting(false)
    if (!error && !isSubmitting) {
      await mutate(getGroupSessionMutateKey())
      onClose()
    }
  }

  const onSubmit = async (data: GroupSessionType) => {
    setIsSubmitting(true)
    if (!event.group_weekly_repeat) {
      handleSingleEdit(data)
    } else {
      setIsConfirmVisible(true)
    }
  }

  const renderGroupBody = () => (
    <>
      <div className={cls(styles.small, styles.groupBody)}>
        <LabelWrapper title="סיום" style={{ gridArea: 'finish' }} error={'group_finish' in errors ? 'Required' : null}>
          {({ id }) => <Input icon={<Clock />} type="time" id={id} {...register('group_finish')} />}
        </LabelWrapper>
        <LabelWrapper title="התחלה" style={{ gridArea: 'start' }} error={'group_start' in errors ? 'Required' : null}>
          {({ id }) => <Input icon={<Clock />} type="time" id={id} {...register('group_start')} />}
        </LabelWrapper>
        <LabelWrapper
          title="תאריך"
          style={{ gridArea: 'date' }}
          className={styles.dataPicker}
          error={'group_date' in errors ? 'Required' : null}
        >
          {({ id }) => (
            <div className={styles.svg}>
              <DatePickerIcon style={{ color: '#000' }} />
              <DatePicker id={id} {...register('group_date')} />
            </div>
          )}
        </LabelWrapper>
      </div>
      <div className={cls(styles.small, styles.groupFooter)}>
        <LabelWrapper
          title="מדריך"
          style={{ gridArea: 'instructor' }}
          error={'group_instructor' in errors ? 'Required' : null}
        >
          {({ id }) => (
            <Controller
              control={control}
              name="group_instructor"
              render={({ field }) => (
                <Select
                  searchable={false}
                  disabled={view !== 'studio'}
                  loading={isTrainersLoading}
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
        <LabelWrapper
          title="סוג אימון"
          style={{ gridArea: 'type_of_studying' }}
          error={'group_type_of_studying' in errors ? 'Required' : null}
        >
          {({ id }) => (
            <Controller
              control={control}
              name="group_type_of_studying"
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
        <LabelWrapper title="חדר" style={{ gridArea: 'room' }} error={'group_room' in errors ? 'Required' : null}>
          {({ id }) => (
            <Controller
              control={control}
              name="group_room"
              render={({ field }) => (
                <Select
                  searchable={false}
                  disabled={view !== 'studio'}
                  loading={isRoomsLoading}
                  options={getFormattedRooms()}
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

  const renderGroupFooter = () => (
    <div className={cls(styles.small, styles.groupFooter)} style={{ marginTop: 0 }}>
      <button
        type="button"
        className={styles.editButton}
        disabled={
          !Object.values(watchAllFields).every(item => item) || Object.keys(watchAllFields).length !== 8 || isSubmitting
        }
        onClick={handleSubmit(onSubmit)}
      >
        שמירה
      </button>
      <div className={styles.participantsText}>
        ישנם 12 משתתפים אשר אשרו השתתפותם בשיעור. לא ניתן להוריד את כמות המשתתפים מתחת למספר זה.
      </div>
      <LabelWrapper
        title="כמות משתתפים"
        className={styles.participantsNumber}
        error={'group_number_of_partipiciants' in errors ? 'Required' : null}
      >
        {({ id }) => <Input id={id} {...register('group_number_of_partipiciants')} />}
      </LabelWrapper>
    </div>
  )

  return (
    <>
      <Modal
        title="עריכות אימון אישי קיים"
        subTitle="צור אימון חדש על פי מה שבא לך  ומה שקבעת עם המתאמן שלך אישי או זוגי או קבוצתי או מה שבא לך היום או מחר או מחרתיים או אימון שנמשך שנתיים"
        style={style}
        error={error}
        className={cls(styles.wrapper, className)}
        visible={isVisible}
        onClose={onClose}
        renderFooter={false}
      >
        <>
          {renderGroupBody()}
          {renderGroupFooter()}
        </>
      </Modal>
      <EditGroupSessionConfirm
        onClose={() => setIsConfirmVisible(false)}
        isVisible={isConfirmVisible}
        onSingleClick={() => handleSingleEdit(getValues())}
        onAllClick={() => handleMultipleEdit(getValues())}
        style={{ width: 649, height: 266.5 }}
      />
    </>
  )
}

export default EditGroupSession
