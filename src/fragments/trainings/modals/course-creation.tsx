
// @ts-ignore
import React from 'react'
import cls from 'classnames'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import ThrashIcon from '../../../icons/thrash'
import ENDPOINTS from '../../../features/endpoints'
import styles from './course-creation.module.scss'
import Modal from '../../form/modal'
import LabelWrapper from '../../form/label-wrapper'
import Clock from '../../../icons/clock'
import DatePickerIcon from '../../../icons/data-picker'
import DatePicker from '../../components/date-picker'
import { CourseType } from '../../../features/api-types'
import { Input } from '../../components/input'
import Select from '../../components/select'
import useAuth from '../../../features/auth'
import { mongoSelector } from '../../../features/fetchers'
import { getGroupSessionMutateKey } from '../../../features/calendar-groups-sessions'
import PlusCircledIcon from '../../../icons/plusCircled'
import { HEBREW_DAYS_OF_WEEK, TYPES_OF_TRAININGS } from '../../../lib/constants'
import { getMutateKey } from '../../../features/calendar-course-session'
import useRooms from '../../../features/rooms'
import useTrainerStudio from '../../../features/trainer'

interface CreateCourseProps {
  className?: string
  style?: React.CSSProperties
  isVisible: boolean
  onClose: () => void
}

const CreateCourse: React.FC<CreateCourseProps> = ({ className, style, onClose, isVisible }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    getValues,
  } = useForm<CourseType>({
    defaultValues: {
      course_week_days: [{ course_week_day: '', course_start: '', course_finish: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'course_week_days',
  })

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState('')

  const { profile } = useAuth()
  const { mutate } = useSWRConfig()
  const { collection: roomsCollection, isLoading: isRoomsLoading } = useRooms({ studio_id: profile?._id })
  const { collection: trainersCollection, isLoading: isTrainersLoading } = useTrainerStudio({ studio_id: profile?._id })

  const onSubmit = async (data: CourseType) => {
    setIsSubmitting(true)
    try {
      await mongoSelector({
        from: ENDPOINTS.EVENT.CREATE_COURSE_POST,
        method: 'POST',
        body: { ...data, studio_id: profile?._id },
      })
      await mutate(getMutateKey())
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

  const getFormattedTypesOfTrainings = () =>
  TYPES_OF_TRAININGS.map(training => ({
    label: training.label.localization.he,
    value: `${training._id}`,
  }))
  const getFormattedRooms = () => roomsCollection.map(room => ({ label: room.name_of_room, value: room._id }))
  const getFormattedTrainers = () => trainersCollection.map(trainer => ({ label: trainer.name, value: trainer._id }))

  const handleTimeAdd = () => {
    if (getValues('course_week_days').length < 7) {
      append({ course_week_day: '', course_start: '', course_finish: '' })
    }
  }

  const handleTimeRemove = (index: number) => {
    remove(index)
  }

  const filterDaysOfWeek = (dayOfWeek: any) =>
    !getValues('course_week_days').filter(({ course_week_day }) => course_week_day === dayOfWeek.value).length

  const renderCourseBody = () => (
    <>
      <div className={cls(styles.small, styles.courseInfo)}>
        <LabelWrapper title="שם הקורס" style={{ gridArea: 'name' }} error={'course_name' in errors ? 'Required' : null}>
          {({ id }) => <Input id={id} {...register('course_name', { required: true })} />}
        </LabelWrapper>
        <LabelWrapper
          title="תאריך התחלה"
          style={{ gridArea: 'date' }}
          className={styles.dataPicker}
          error={'course_start_date' in errors ? 'Required' : null}
        >
          {({ id }) => (
            <div className={styles.svg}>
              <DatePickerIcon style={{ color: '#000' }} />
              <DatePicker id={id} {...register('course_start_date', { required: true })} />
            </div>
          )}
        </LabelWrapper>
        <LabelWrapper
          title="כמות חזרות"
          style={{ gridArea: 'repetitions_amount' }}
          error={'course_repetitions_amount' in errors ? 'Required' : null}
        >
          {({ id }) => <Input id={id} {...register('course_repetitions_amount', { required: true })} />}
        </LabelWrapper>
      </div>
      {fields.map((item, index) => (
        <div key={item.id} className={cls(styles.smaller, styles.courseTime)}>
          <LabelWrapper
            title="יום"
            style={{ gridArea: 'week_day' }}
            error={`course_week_days.${index}.course_week_day` in errors ? 'Required' : null}
          >
            {({ id }) => (
              <Controller
                control={control}
                name={`course_week_days.${index}.course_week_day`}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    searchable={false}
                    className={styles.selector}
                    options={HEBREW_DAYS_OF_WEEK.filter(day => filterDaysOfWeek(day))}
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
            title="התחלה"
            style={{ gridArea: 'start' }}
            error={`course_week_days.${index}.course_start` in errors ? 'Required' : null}
          >
            {({ id }) => (
              <Input
                icon={<Clock />}
                className={styles.timePicker}
                type="time"
                id={id}
                {...register(`course_week_days.${index}.course_start`, { required: true })}
              />
            )}
          </LabelWrapper>
          <LabelWrapper
            title="סיום"
            style={{ gridArea: 'finish' }}
            error={`course_week_days.${index}.course_finish` in errors ? 'Required' : null}
          >
            {({ id }) => (
              <Input
                icon={<Clock />}
                className={styles.timePicker}
                type="time"
                id={id}
                {...register(`course_week_days.${index}.course_finish`, { required: true })}
              />
            )}
          </LabelWrapper>
          {index === 0 && (
            <PlusCircledIcon className={styles.add} style={{ gridArea: 'add' }} size={28} onClick={handleTimeAdd} />
          )}
          {index !== 0 && (
            <ThrashIcon
              className={styles.add}
              style={{ gridArea: 'add' }}
              size={28}
              onClick={() => handleTimeRemove(index)}
            />
          )}
        </div>
      ))}
      <div className={cls(styles.small, styles.courseInfo)}>
        <LabelWrapper title="מדריך" style={{ gridArea: 'trainer' }} error={'trainer' in errors ? 'Required' : null}>
          {({ id }) => (
            <Controller
              control={control}
              name="course_trainer"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  searchable={false}
                  className={styles.selector}
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
        <LabelWrapper title="חדר" style={{ gridArea: 'room' }} error={'course_room' in errors ? 'Required' : null}>
          {({ id }) => (
            <Controller
              control={control}
              name="course_room"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  searchable={false}
                  className={styles.selector}
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
        <LabelWrapper
          title="כמות משתתפים"
          style={{ gridArea: 'participants_number' }}
          error={'course_participants_number' in errors ? 'Required' : null}
        >
          {({ id }) => <Input id={id} {...register('course_participants_number', { required: true })} />}
        </LabelWrapper>
      </div>
      <div className={cls(styles.small, styles.courseInfo)}>
      <LabelWrapper
        title="עלות הקורס"
        style={{ gridArea: 'course_price' }}
        error={'course_price' in errors ? 'Required' : null}
      >
        {({ id }) => (
          <div className={styles.svg}>
            <span>₪</span>
            <Input id={id} {...register('course_price', { required: true })} />
          </div>
        )}
      </LabelWrapper>
      <LabelWrapper
          title="תאריך סיום"
          style={{ gridArea: 'course_end_date' }}
          error={'course_end_date' in errors ? 'Required' : null}
        >
          {({ id }) => (
            <div className={styles.svg}>
              <DatePickerIcon style={{ color: '#000' }} />
              <DatePicker id={id} {...register('course_end_date')} />
            </div>
          )}
        </LabelWrapper>
      <LabelWrapper
          title="סוג אימון"
          style={{ gridArea: 'course_type_of_trainings' }}
          error={'course_type_of_trainings' in errors ? 'Required' : null}
        >
          {({ id }) => (
            <Controller
              control={control}
              name="course_type_of_trainings"
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
      </div>
      <div className={styles.spacerLine} />
      <div>
        <LabelWrapper
          title="תיאור הקורס"
          style={{ gridArea: 'description' }}
          error={'course_description' in errors ? 'Required' : null}
        >
          {({ id }) => (
            <Input
              id={id}
              style={{ height: 114.5 }}
              className={styles.courseDescription}
              {...register('course_description', { required: true })}
            />
          )}
        </LabelWrapper>
      </div>
    </>
  )

  const renderCourseFooter = () => (
    <div className={cls(styles.smaller, styles.courseFooter)}>
      <button type="button" style={{ gridArea: 'button' }} onClick={handleSubmit(onSubmit)}>
        יצירת קורס
      </button>

    </div>
  )

  return (
    <Modal
      title="יצירת קורס חדש"
      subTitle="צור קורס חדש"
      style={style}
      error={error}
      className={cls(styles.wrapper, className)}
      visible={isVisible}
      onClose={onClose}
      footerStyle={{ width: 560, alignSelf: 'center' }}
      renderFooter={false}
    >
      <>
        {renderCourseBody()}
        {renderCourseFooter()}
      </>
    </Modal>
  )
}

export default CreateCourse
