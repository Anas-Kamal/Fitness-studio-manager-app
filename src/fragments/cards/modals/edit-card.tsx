/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import cls from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import ENDPOINTS from '../../../features/endpoints'
import styles from './card.module.scss'
import Modal from '../../form/modal'
import LabelWrapper from '../../form/label-wrapper'
import { CardType, SubscriptionType } from '../../../features/api-types'
import { Input } from '../../components/input'
import Select from '../../components/select'
import useAuth from '../../../features/auth'
import { TIME_PERIODS } from '../../../lib/constants'
import { mongoSelector } from '../../../features/fetchers'
import { getCardsMutateKey } from '../../../features/cards'

interface CreateCardProps {
  className?: string
  style?: React.CSSProperties
  isVisible: boolean
  onClose: () => void
  card?: CardType | SubscriptionType
}

const EditCard: React.FC<CreateCardProps> = ({ className, style, onClose, isVisible, card }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<CardType>()

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState('')

  const { profile } = useAuth()
  const { mutate } = useSWRConfig()

  const onSubmit = async (data: CardType) => {
    setIsSubmitting(true)
    const body = {
      ...data,
      _id: card?._id,
      studio_id: profile?._id
    }
    try {
      await mongoSelector({
        from: ENDPOINTS.EVENT.EDIT_CARD_POST,
        method: 'POST',
        body
      })
    } catch (err) {
      setIsSubmitting(false)
      setError(err as string)
    }
    if (!error && !isSubmitting) {
      await mutate(getCardsMutateKey())
      onClose()
    }
    setIsSubmitting(false)
  }

  useEffect(() => {
    reset(card)
  }, [card])

  const renderCourseBody = () => (
    <>
      <div className={cls(styles.normal, styles.cardRow)}>
        <LabelWrapper
          title="שם הכרטיסיה"
          style={{ gridArea: 'name' }}
          error={'card_name' in errors ? 'Required' : null}>
          {({ id }) => (
            <Input
              id={id}
              inputStyle={{ textAlign: 'right' }}
              {...register('card_name', { required: true })}
            />
          )}
        </LabelWrapper>
        <LabelWrapper
          title="כמות כניסות"
          style={{ gridArea: 'participants_number' }}
          error={'card_participants_number' in errors ? 'Required' : null}>
          {({ id }) => (
            <Input id={id} {...register('card_participants_number', { required: true })} />
          )}
        </LabelWrapper>
      </div>
      <div className={cls(styles.normal, styles.cardRow)}>
        <LabelWrapper
          title="תוקף"
          style={{ gridArea: 'duration' }}
          error={'card_duration' in errors ? 'Required' : null}>
          {({ id }) => (
            <Controller
              control={control}
              name="card_duration"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  searchable={false}
                  className={styles.selector}
                  options={TIME_PERIODS}
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
          title="מחיר"
          style={{ gridArea: 'price' }}
          error={'card_price' in errors ? 'Required' : null}>
          {({ id }) => (
            <div className={styles.svg}>
              <span>₪</span>
              <Input id={id} {...register('card_price', { required: true })} />
            </div>
          )}
        </LabelWrapper>
      </div>
      <div className={styles.spacerLine} />
      <div className={styles.cardDescription}>
        <LabelWrapper
          title="תאור הכרטיסיה"
          style={{ gridArea: 'description' }}
          error={'card_description' in errors ? 'Required' : null}>
          {({ id }) => (
            <Input
              id={id}
              style={{ height: 114.5 }}
              inputStyle={{ height: 114.5, width: `${100}%`, textAlign: 'right' }}
              {...register('card_description', { required: true })}
            />
          )}
        </LabelWrapper>
      </div>
    </>
  )

  return (
    <Modal
      title="יצירת כרטיסייה"
      subTitle="צור אימון חדש על פי מה שבא לך ומה שקבעת עם המתאמן שלך אישי או זוגי או קבוצתי או מה שבא לך היום או מחר או מחרתיים או אימון שנמשך שנתיים"
      style={style}
      error={error}
      isSubmitDisabled={isSubmitting}
      className={cls(styles.wrapper, className)}
      visible={isVisible}
      onClose={onClose}
      okTitle="סיום"
      onOk={handleSubmit(onSubmit)}
      footerStyle={{ width: 508, alignSelf: 'center', marginBottom: 40 }}>
      <>{renderCourseBody()}</>
    </Modal>
  )
}

export default EditCard
