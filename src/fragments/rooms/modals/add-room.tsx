/* eslint-disable no-underscore-dangle */
import React from 'react'
import cls from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import ENDPOINTS from '../../../features/endpoints'
import styles from './add-room.module.scss'
import LabelWrapper from '../../form/label-wrapper'
import Modal from '../../form/modal'
import { AddRoomModalType } from '../../../features/api-types'
import { Input } from '../../components/input'
import { mongoSelector } from '../../../features/fetchers'
import useAuth from '../../../features/auth'
import { getMutateKey } from '../../../features/rooms'
import Select from '../../components/select'

interface AddRoomModalProps {
  className?: string
  style?: React.CSSProperties
  visible: boolean
  onClose: () => void
}

const AddRoomModal: React.FC<AddRoomModalProps> = ({ className, style, onClose, visible }) => {
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string>()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddRoomModalType>({
    defaultValues: {},
  })

  const { profile } = useAuth()

  const { mutate } = useSWRConfig()

  const onSubmit = async (data: AddRoomModalType) => {
    setSubmitting(true)
    setError(undefined)

    try {
      await mongoSelector({
        from: ENDPOINTS.ROOM.GET_SINGLE_ROOM,
        method: 'POST',
        body: { ...data, studio_id: profile?._id },
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
      <LabelWrapper
        title="גודל החדר"
        style={{ gridArea: 'width' }}
        error={'width_of_room' in errors ? 'Required' : null}
      >
        {({ id }) => <Input id={id} {...register('width_of_room')} />}
      </LabelWrapper>
      <LabelWrapper title="שם החדר" style={{ gridArea: 'name' }} error={'name_of_room' in errors ? 'Required' : null}>
        {({ id }) => <Input id={id} {...register('name_of_room')} />}
      </LabelWrapper>
      <LabelWrapper
        title="מתקנים"
        style={{ gridArea: 'comfort' }}
        error={'comfort_of_room' in errors ? 'Required' : null}
      >
        {({ id }) => (
          <Controller
            control={control}
            name="facilities"
            render={({ field }) => (
              <Select
                searchable={false}
                options={[{ label: 'hello', value: '2' }]}
                id={id}
                value={field.value}
                // @ts-ignore
                onChange={e => field.onChange(e)}
              />
            )}
          />
        )}
      </LabelWrapper>
      <LabelWrapper title="יעוד" style={{ gridArea: 'destiny' }} error={'destiny' in errors ? 'Required' : null}>
        {({ id }) => (
          <Controller
            control={control}
            name="room_type"
            render={({ field }) => (
              <Select
                searchable={false}
                options={[{ label: 'hello', value: '2' }]}
                id={id}
                value={field.value}
                // @ts-ignore
                onChange={e => field.onChange(e)}
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
      loading={submitting}
      className={className}
      onOk={handleSubmit(onSubmit)}
      onClose={onClose}
      visible={visible}
      title="יצירת חדר חדש"
      subTitle="הכנס את שם החדר על מנת להוסיף אותו לרשימה"
      okTitle="שלח"
      error={error}
    >
      {renderBody()}
    </Modal>
  )
}

export default AddRoomModal
