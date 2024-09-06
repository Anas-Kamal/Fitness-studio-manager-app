/* @ts-ignore */import React, { useEffect } from 'react'
import cls from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import ENDPOINTS from '../../../features/endpoints'
import styles from './subscription.module.scss'
import Modal from '../../form/modal'
import LabelWrapper from '../../form/label-wrapper'
import { SubscriptionType } from '../../../features/api-types'
import { Input } from '../../components/input'
import Select from '../../components/select'
import useAuth from '../../../features/auth'
import { TIME_PERIODS } from '../../../lib/constants'
import Toggle from '../../components/toggle'
import { mongoSelector } from '../../../features/fetchers'
import { getSubscriptionsMutateKey } from '../../../features/subscriptions'

interface EditSubscriptionProps {
  className?: string
  style?: React.CSSProperties
  isVisible: boolean
  onClose: () => void
  subscription?: SubscriptionType
}

const EditSubscription: React.FC<EditSubscriptionProps> = ({ className, style, onClose, isVisible, subscription }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    getValues,
  } = useForm<SubscriptionType>()

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [timeFrame, setTimeFrame] = React.useState(TIME_PERIODS)
  const [isLimitSelected, setIsLimitSelected] = React.useState(false)
  const [error, setError] = React.useState('')

  const { profile } = useAuth()
  const { mutate } = useSWRConfig()
  const watchDuration = watch(['subscription_duration'])
  const watchToggle = watch(['subscription_limit'])

  const onSubmit = async (data: SubscriptionType) => {
    setIsSubmitting(true)
    const body = {
      ...data,
      _id: subscription?._id,
      studio_id: profile?._id,
      subscription_limit: data.subscription_limit || false,
    }
    try {
      await mongoSelector({
        from: ENDPOINTS.EVENT.EDIT_SUBSCRIPTION_POST,
        method: 'POST',
        body,
      })
    } catch (err) {
      setIsSubmitting(false)
      setError(err as string)
    }
    if (!error && !isSubmitting) {
      await mutate(getSubscriptionsMutateKey())
      onClose()
    }
    setIsSubmitting(false)
  }

  useEffect(() => {
    reset(subscription)
  }, [subscription])

  // useEffect(() => {
  //   const selectedDuration = getValues('subscription_duration')
  //   if (selectedDuration) {
  //     setTimeFrame(TIME_PERIODS.filter(period => period.value <= selectedDuration))
  //   } else {
  //     setTimeFrame(TIME_PERIODS)
  //   }
  // }, [watchDuration])

  useEffect(() => {
    setIsLimitSelected(getValues('subscription_limit'))
  }, [watchToggle])

  const renderSubscriptionBody = () => (
    <>
      <div className={cls(styles.normal, styles.subscriptionRow)}>
        <LabelWrapper
          title="שם הכרטיסיה"
          style={{ gridArea: 'name' }}
          error={'subscription_name' in errors ? 'Required' : null}
        >
          {({ id }) => (
            <Input id={id} inputStyle={{ textAlign: 'right' }} {...register('subscription_name', { required: true })} />
          )}
        </LabelWrapper>
        <LabelWrapper
          title="תוקף"
          style={{ gridArea: 'period' }}
          error={'subscription_duration' in errors ? 'Required' : null}
        >
          {({ id }) => (
            <Controller
              control={control}
              name="subscription_duration"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  searchable={false}
                  className={styles.selector}
                  options={TIME_PERIODS}
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
      <div className={styles.subscriptionDescription}>
        <LabelWrapper
          title="תאור הכרטיסיה"
          style={{ gridArea: 'description' }}
          error={'subscription_description' in errors ? 'Required' : null}
        >
          {({ id }) => (
            <Input
              id={id}
              style={{ height: 114.5 }}
              inputStyle={{ height: 114.5, width: `${100}%`, textAlign: 'right' }}
              {...register('subscription_description', { required: true })}
            />
          )}
        </LabelWrapper>
      </div>
      <div className={styles.subscriptionLimit}>
        <LabelWrapper style={{ gridArea: 'limit' }} error={'subscription_limit' in errors ? 'Required' : null}>
          {() => (
            <Controller
              control={control}
              name="subscription_limit"
              render={({ field }) => (
                <div className={styles.toggle}>
                  <span>הגבלת כניסות</span>
                  <Toggle on={field.value} onChange={field.onChange} />
                </div>
              )}
            />
          )}
        </LabelWrapper>
        {isLimitSelected && (
          <>
            <LabelWrapper
              title="איפוס כניסות"
              style={{ gridArea: 'limit_frame' }}
              error={'subscription_limit_frame' in errors ? 'Required' : null}
            >
              {({ id }) => (
                <Controller
                  control={control}
                  name="subscription_limit_frame"
                  render={({ field }) => (
                    <Select
                      searchable={false}
                      className={styles.selector}
                      options={timeFrame}
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
              title="כמות כניסות"
              style={{ gridArea: 'limit_times' }}
              error={'subscription_limit_times' in errors ? 'Required' : null}
            >
              {({ id }) => <Input id={id} {...register('subscription_limit_times')} />}
            </LabelWrapper>
          </>
        )}
      </div>
    </>
  )

  const renderSubscriptionFooter = () => (
    <div className={styles.subscriptionFooter}>
      <button
        disabled={isSubmitting}
        type="button"
        style={{ gridArea: 'button' }}
        onClick={handleSubmit(onSubmit)}>
        סיום
      </button>
      <LabelWrapper
        title="מחיר"
        style={{ gridArea: 'price' }}
        error={'subscription_price' in errors ? 'Required' : null}>
        {({ id }) => (
          <div className={styles.svg}>
            <span>₪</span>
            <Input
              id={id}
              inputStyle={{ textAlign: 'center' }}
              {...register('subscription_price', { required: true })}
            />
          </div>
        )}
      </LabelWrapper>
    </div>
  )

  return (
    <Modal
      title="עריכת מנוי"
      subTitle="צור אימון חדש על פי מה שבא לך ומה שקבעת עם המתאמן שלך אישי או זוגי או קבוצתי או מה שבא לך היום או מחר או מחרתיים או אימון שנמשך שנתיים"
      style={style}
      error={error}
      className={cls(styles.wrapper, className)}
      visible={isVisible}
            isSubmitDisabled={isSubmitting}

      onClose={onClose}
      renderFooter={false}
    >
      <>
        {renderSubscriptionBody()}
        {renderSubscriptionFooter()}
      </>
    </Modal>
  )
}

export default EditSubscription
