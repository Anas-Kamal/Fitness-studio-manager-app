// @ts-ignore
import React from 'react'
import cls from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import ENDPOINTS from '../../../features/endpoints'
import styles from './event.module.scss'
import Modal from '../../form/modal'
import LabelWrapper from '../../form/label-wrapper'
import Clock from '../../../icons/clock'
import DatePickerIcon from '../../../icons/data-picker'
import Toggle from '../../components/toggle'
import Select from '../../components/select'
import DatePicker from '../../components/date-picker'
import TrainerIcon from '../../../icons/trainer'
import Address from '../../../icons/address'
import CheckBox from '../../components/checkbox'
import { mongoSelector } from '../../../features/fetchers'
import useAuth from '../../../features/auth'
import { getPrivateSessionMutateKey } from '../../../features/calendar-private-session'
import { getGroupSessionMutateKey } from '../../../features/calendar-groups-sessions'
import { GroupSessionType, PrivateSessionType } from '../../../features/api-types'
import { Input } from '../../components/input'
import useRooms from '../../../features/rooms'
import useCards from '../../../features/cards'
import useTrainerStudio from '../../../features/trainer'
import { TYPES_OF_TRAININGS } from '../../../lib/constants'

interface CreateEvent {
  className?: string
  style?: React.CSSProperties
  isVisible: boolean
  onClose: () => void
}

const isGroupGuard = (data: GroupSessionType | PrivateSessionType): data is GroupSessionType =>
  (data as GroupSessionType).group_isGroup === true
const isPrivateGuard = (data: GroupSessionType | PrivateSessionType): data is PrivateSessionType =>
  (data as PrivateSessionType).private_isPrivate === true

const groupSessionTypes = ['group_isGroup', 'private_isPrivate']
const CreateEvent: React.FC<CreateEvent> = ({ className, style, onClose, isVisible }) => {
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string>()
  //date picker ref

  const { profile, view } = useAuth()
  const [isGroupChoosen, setIsGroupChoosen] = React.useState(true)
  const [isAddressEnabled, setIsAddressEnabled] = React.useState(view === 'studio')

  const { collection: cardsCollection, isLoading: isCardsLoading } = useCards({
    studio_id: profile?._id
  })
  // const { collection: subscriptionsCollection } = useSubscriptions({ studio_id: profile?._id })
  const { collection: roomsCollection, isLoading: isRoomsLoading } = useRooms({
    studio_id: profile?._id
  })
  const { collection: trainersCollection, isLoading: isTrainersLoading } = useTrainerStudio({
    studio_id: profile?._id
  })

  const getAllFormattedCardsAndSubscriptions = () =>
    cardsCollection.map((card) => ({ label: card.card_name, value: card._id }))
  // const formatedSubscriptions =
  // subscriptionsCollection.map((subscription) => {return {label: subscription.subscription_name, value: subscription._id}})

  const getFormattedRooms = () =>
    roomsCollection.map((room) => ({
      label: room.name_of_room,
      value: room._id
    }))
  const getFormattedTrainers = () =>
    trainersCollection.map((trainer) => ({
      label: trainer.name,
      value: trainer._id
    }))

  const getFormattedTypesOfTrainings = () =>
    TYPES_OF_TRAININGS.map((training) => ({
      label: training.label.localization.he,
      value: `${training._id}`
    }))

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors }
  } = useForm<GroupSessionType & PrivateSessionType>({
    defaultValues: {
      group_isGroup: true,
      private_isPrivate: false
    }
  })
  const watchGroupToggle = watch('group_weekly_repeat')

  const { mutate } = useSWRConfig()

  const onSubmit = async (data: GroupSessionType | PrivateSessionType) => {
    setSubmitting(true)
    setError(undefined)
    try {
      if (isGroupGuard(data)) {
        const body: GroupSessionType = {
          ...data,
          group_date: data.group_date,
          group_weekly_repeat: data.group_weekly_repeat || false,
          group_number_of_partipiciants: data.group_number_of_partipiciants || 1,
          group_date_of_end: data.group_weekly_repeat ? data.group_date_of_end : data.group_date,
          group_card_payment: data.group_card_payment.filter((card) => card),
          group_instructor: data.group_instructor || profile?._id || '',
          group_room: view === 'studio' ? data.group_room : '',
          group_address: view !== 'studio' ? profile?.location.address : '',
          group_trainees: [],
          studio_id: profile?._id || ''
        }
        await mongoSelector({
          from: ENDPOINTS.EVENT.CREATE_GROUP_EVENT_POST,
          method: 'POST',
          body: { ...body }
        })
        await mutate(getGroupSessionMutateKey())
        onClose()
      }
      if (isPrivateGuard(data)) {
        const body: PrivateSessionType = {
          ...data,
          private_is_external_address: isAddressEnabled,
          studio_id: profile?._id || '',
          private_room: data.private_room || '',
          private_address: data.private_address || '',
          private_instructor: data.private_instructor || profile?._id || ''
        }
        await mongoSelector({
          from: ENDPOINTS.EVENT.CREATE_PRIVATE_EVENT_POST,
          method: 'POST',
          body: { ...body }
        })
        await mutate(getPrivateSessionMutateKey())
        onClose()
      }
      onClose()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }
  // @ts-ignore
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      // @ts-ignore
      if (name && groupSessionTypes.includes(name) && value[name]) {
        reset({
          private_isPrivate: false,
          group_isGroup: false,
          // @ts-ignore
          [name]: value[name]
        })
        return name === 'group_isGroup' ? setIsGroupChoosen(true) : setIsGroupChoosen(false)
      }
      // @ts-ignore
      if (name && groupSessionTypes.includes(name) && !value[name]) {
        reset({
          private_isPrivate: false,
          group_isGroup: false,
          // @ts-ignore
          [name]: !value[name]
        })
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const renderHeader = () => (
    <div className={cls(styles.header)}>
      <LabelWrapper
        style={{ gridArea: 'isGroup' }}
        error={'group_isGroup' in errors ? 'Required' : null}>
        {() => (
          <Controller
            control={control}
            name="group_isGroup"
            render={({ field }) => (
              <div>
                <div>
                  <CheckBox on={field.value} onChange={field.onChange} />
                  <span>אימון קבוצתי</span>
                </div>
                <span>אימון כושר שבו אדם אחד מתאמן תחת הדרכתו האישית של מאמן כושר גופני. </span>
              </div>
            )}
          />
        )}
      </LabelWrapper>
      <LabelWrapper
        style={{ gridArea: 'isPrivate' }}
        error={'private_isPrivate' in errors ? 'Required' : null}>
        {() => (
          <Controller
            control={control}
            name="private_isPrivate"
            render={({ field }) => (
              <div>
                <div>
                  <CheckBox on={field.value} onChange={field.onChange} />
                  <span>אימון אישי</span>
                </div>
                <span>אימון כושר שבו אדם אחד מתאמן תחת הדרכתו האישית של מאמן כושר גופני. </span>
              </div>
            )}
          />
        )}
      </LabelWrapper>
    </div>
  )

  const renderGroupBody = () => (
    <>
      <div className={cls(styles.extend, styles.groupHeader)}>
        <LabelWrapper
          title="שם האימון"
          style={{ gridArea: 'name_of_trainings' }}
          error={'group_name_of_trainings' in errors ? 'Required' : null}>
          {({ id }) => <Input id={id} {...register('group_name_of_trainings')} />}
        </LabelWrapper>
        <LabelWrapper
          title="מדריך"
          style={{ gridArea: 'instructor' }}
          error={'group_instructor' in errors ? 'Required' : null}>
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
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
          )}
        </LabelWrapper>

        <LabelWrapper
          title="סוג אימון"
          style={{ gridArea: 'type_of_studying' }}
          error={'group_type_of_studying' in errors ? 'Required' : null}>
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
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
          )}
        </LabelWrapper>

        <LabelWrapper
          title="חדר"
          style={{ gridArea: 'room' }}
          error={'group_room' in errors ? 'Required' : null}>
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
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
          )}
        </LabelWrapper>
      </div>
      <div className="flex justify-between gap-2">
        <LabelWrapper
          title="התחלה"
          style={{ gridArea: 'start' }}
          error={'group_start' in errors ? 'Required' : null}>
          {({ id }) => <Input icon={<Clock />} type="time" id={id} {...register('group_start')} />}
        </LabelWrapper>
        <LabelWrapper
          title="סיום"
          style={{ gridArea: 'finish' }}
          error={'group_finish' in errors ? 'Required' : null}>
          {({ id }) => <Input icon={<Clock />} type="time" id={id} {...register('group_finish')} />}
        </LabelWrapper>{' '}
        <LabelWrapper
          title="תאריך"
          style={{ gridArea: 'date' }}
          error={'group_date' in errors ? 'Required' : null}>
          {({ id }) => (
            <div className={styles.svg}>
              <DatePickerIcon style={{ color: '#000' }} />
              <DatePicker id={id} {...register('group_date')} />
            </div>
          )}
        </LabelWrapper>
      </div>
      <div className={cls(styles.small, styles.groupBody)}>
        {' '}
        <LabelWrapper
          title="כמות משתתפים"
          style={{ gridArea: 'number_of_partipiciants' }}
          error={'group_number_of_partipiciants' in errors ? 'Required' : null}>
          {({ id }) => <Input id={id} {...register('group_number_of_partipiciants')} />}
        </LabelWrapper>
        <LabelWrapper
          title="תאריך סיום"
          style={{ gridArea: 'date_of_end' }}
          error={'group_date_of_end' in errors ? 'Required' : null}>
          {({ id }) => (
            <div className={styles.svg}>
              <DatePickerIcon style={{ color: '#000' }} />
              <DatePicker id={id} disabled={!watchGroupToggle} {...register('group_date_of_end')} />
            </div>
          )}
        </LabelWrapper>
        <LabelWrapper
          style={{ gridArea: 'weekly_repeat' }}
          error={'group_weekly_repeat' in errors ? 'Required' : null}>
          {() => (
            <Controller
              control={control}
              name="group_weekly_repeat"
              render={({ field }) => (
                <div className={styles.weeakly}>
                  <Toggle on={field.value} onChange={field.onChange} />
                  <span>חזרה שבועית</span>
                </div>
              )}
            />
          )}
        </LabelWrapper>
        <div className={styles.separator} style={{ gridArea: 'separator' }} />
      </div>
      <div className={styles.groupFooter}>
        <LabelWrapper
          title="תשלום באמצעות כרטיסיה"
          style={{ gridArea: 'card_payment' }}
          error={'group_card_payment' in errors ? 'Required' : null}>
          {({ id }) => (
            <Controller
              control={control}
              name="group_card_payment"
              render={({ field }) => (
                <Select
                  searchable={false}
                  loading={isCardsLoading}
                  options={getAllFormattedCardsAndSubscriptions()}
                  id={id}
                  value={Array.isArray(field.value) ? field.value : [field.value]}
                  // @ts-ignore
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
          )}
        </LabelWrapper>
        <LabelWrapper
          title="עלות אימון"
          style={{ gridArea: 'price' }}
          error={'price' in errors ? 'Required' : null}>
          {({ id }) => (
            <div className={styles.svg}>
              <span>₪</span>
              <Input id={id} {...register('group_price')} />
            </div>
          )}
        </LabelWrapper>
      </div>
    </>
  )

  const renderPrivateBody = () => (
    <>
      <div className={cls(styles.extend, styles.privateHeader)}>
        <LabelWrapper
          title="מדריך"
          style={{ gridArea: 'private_name_of_trainings' }}
          error={'private_name_of_trainings' in errors ? 'Required' : null}>
          {({ id }) => (
            <div className={styles.svg}>
              <TrainerIcon />
              <Input id={id} {...register('private_name_of_trainings')} />
            </div>
          )}
        </LabelWrapper>
        <LabelWrapper
          title="מתאמן"
          style={{ gridArea: 'private_instructor' }}
          error={'private_instructor' in errors ? 'Required' : null}>
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
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
          )}
        </LabelWrapper>
      </div>
      <div className={cls(styles.small, styles.privateBody)}>
        <LabelWrapper
          title="סיום"
          style={{ gridArea: 'finish' }}
          error={'from' in errors ? 'Required' : null}>
          {({ id }) => (
            <Input icon={<Clock />} type="time" id={id} {...register('private_finish')} />
          )}
        </LabelWrapper>
        <LabelWrapper
          title="תאריך"
          style={{ gridArea: 'date' }}
          error={'private_date_of_end' in errors ? 'private_date_of_end' : null}>
          {({ id }) => (
            <div className={styles.svg}>
              <DatePickerIcon />
              <Input type="date" id={id} {...register('private_date')} />
            </div>
          )}
        </LabelWrapper>
        <LabelWrapper
          title="התחלה"
          style={{ gridArea: 'start' }}
          error={'from' in errors ? 'Required' : null}>
          {({ id }) => (
            <Input icon={<Clock />} type="time" id={id} {...register('private_start')} />
          )}
        </LabelWrapper>
      </div>
      <div className={cls(styles.extend, styles.privateFooter)}>
        <LabelWrapper
          title="כתובת (אימון חוץ)"
          style={{ gridArea: 'private_address' }}
          error={'from' in errors ? 'Required' : null}>
          {({ id }) => (
            <div className={cls(styles.justify)}>
              <CheckBox
                on={view === 'studio' && isAddressEnabled}
                className={styles.checkbox}
                onChange={() => setIsAddressEnabled(!isAddressEnabled)}
              />
              <Input
                icon={<Address />}
                id={id}
                disabled={!isAddressEnabled}
                {...register('private_address')}
              />
            </div>
          )}
        </LabelWrapper>
        <LabelWrapper
          className={cls(styles.rooWrapper)}
          title="חדר (אימון בסטודיו)"
          style={{ gridArea: 'private_room' }}
          error={'private_room' in errors ? 'Required' : null}>
          {({ id }) => (
            <Controller
              control={control}
              name="private_room"
              render={({ field }) => (
                <div className={cls(styles.justify)}>
                  <CheckBox
                    className={styles.checkbox}
                    on={view === 'studio' && !isAddressEnabled}
                    onChange={() => setIsAddressEnabled(!isAddressEnabled)}
                  />
                  <Select
                    className={styles.roomSelector}
                    disabled={view !== 'studio'}
                    searchable={false}
                    options={getFormattedRooms()}
                    id={id}
                    value={field.value}
                    // @ts-ignore
                    onChange={(e) => field.onChange(e)}
                  />
                </div>
              )}
            />
          )}
        </LabelWrapper>
      </div>
    </>
  )

  React.useEffect(() => {
    if (!isVisible) {
      setIsGroupChoosen(true)
      reset({ group_isGroup: true, private_isPrivate: false })
    }
  }, [isVisible])

  return (
    <Modal
      title="יצירות אימון חדש"
      subTitle="צור אימון חדש על פי מה שבא לך ומה שקבעת עם המתאמן שלך אישי או זוגי או קבוצתי או מה שבא לך
      היום או מחר או מחרתיים או אימון שנמשך שנתיים"
      style={style}
      className={cls(styles.wrapper, className)}
      visible={isVisible}
      onClose={onClose}
      onOk={handleSubmit(onSubmit)}
      footerStyle={{ width: 560, alignSelf: 'center' }}
      okTitle="קבע/י אימון">
      {renderHeader()}
      {isGroupChoosen ? renderGroupBody() : renderPrivateBody()}
    </Modal>
  )
}

export default CreateEvent
