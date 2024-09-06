/* eslint-disable no-underscore-dangle */
import React from 'react'
import cls from 'classnames'
import { useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import ENDPOINTS from '../../../features/endpoints'
import styles from './add-trainee.module.scss'
import LabelWrapper from '../../form/label-wrapper'
import Modal from '../../form/modal'
import { TrainerAddType } from '../../../features/api-types'
import { Input } from '../../components/input'
import { mongoSelector } from '../../../features/fetchers'
import useAuth from '../../../features/auth'
import { getTraineesMutationKey } from '../../../features/trainees'
import AddTraineeSuccessModal from './add-trainee-success'

interface AddTraineeProps {
  className?: string
  style?: React.CSSProperties
  visible: boolean
  onClose: () => void
}

const AddTraineeModal: React.FC<AddTraineeProps> = ({ className, style, onClose, visible }) => {
  const [submitting, setSubmitting] = React.useState(false)
  const [isRegistered, setIsRegistered] = React.useState(false)
  const [error, setError] = React.useState('')
  const [isStatusChecked, setIsStatusChecked] = React.useState(false)
  const [isSuccessOpened, setIsSuccessOpened] = React.useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TrainerAddType>({
    defaultValues: {}
  })

  const { profile } = useAuth()

  const { mutate } = useSWRConfig()

  const handleClose = () => {
    reset()
    setIsRegistered(false)
    setIsStatusChecked(false)
    setIsSuccessOpened(false)
    onClose()
  }

  const onSubmit = async (data: TrainerAddType) => {
    setSubmitting(true)
    if (!isStatusChecked) {
      try {
        const body = {
          studio_id: profile?._id,
          phone: data.phone,
          website_link: 'https://client-front-end-main.vercel.app/dashboard'
        }
        const response = await mongoSelector({
          from: ENDPOINTS.TRAINEE.POST_TRAINEE_PHONE_POST,
          method: 'POST',
          body
        })
        if (response.status) {
          await mutate(getTraineesMutationKey())
          setIsSuccessOpened(true)
        } else {
          setIsStatusChecked(true)
          setIsRegistered(false)
        }
      } catch (err) {
        //
      } finally {
        setSubmitting(false)
      }
    } else {
      try {
        const body = {
          studio_id: profile?._id,
          phone: data.phone,
          full_name: data.name,
          email: data.email
        }
        const response = await mongoSelector({
          from: ENDPOINTS.TRAINEE.POST_TRAINEE_PHONE_FULL_POST,
          method: 'POST',
          body
        })
        if (response.status) {
          await mutate(getTraineesMutationKey())
          setIsSuccessOpened(true)
        } else {
          setIsStatusChecked(true)
          setIsRegistered(false)
        }
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setSubmitting(false)
      }
    }
  }

  const renderMobileCheckBody = () => (
    <form className={cls(styles.wrapper)}>
      <LabelWrapper
        title="מספר טלפון"
        style={{ gridArea: 'phone' }}
        error={'phone' in errors ? 'Required' : null}>
        {({ id }) => <Input id={id} {...register('phone')} />}
      </LabelWrapper>
      {!isRegistered && isStatusChecked && (
        <>
          <LabelWrapper
            title="שם מלא"
            style={{ gridArea: 'name' }}
            error={'name' in errors ? 'Required' : null}>
            {({ id }) => <Input id={id} {...register('name')} />}
          </LabelWrapper>
          <LabelWrapper
            title="תאריך לידה"
            style={{ gridArea: 'email' }}
            error={'email' in errors ? 'Required' : null}>
            {({ id }) => <Input type="email" id={id} {...register('email', { required: true })} />}
          </LabelWrapper>
        </>
      )}
    </form>
  )

  return (
    <>
      <Modal
        style={style}
        loading={submitting}
        className={className}
        onOk={handleSubmit(onSubmit)}
        onClose={handleClose}
        visible={visible}
        title="הוספת מתאמן חדש"
        subTitle={
          isRegistered
            ? 'הזן את מספר הטלפון של המתאמן ואנחנו נדאג לשלוח לו לינק להצטרפות לאימונים שלך!'
            : 'באפשרותכם להוסיף מתאמן חדש באמצעות כמה פרטים, לאחר מכן המתאמן ישלים את שאר המידע'
        }
        okTitle="שלח"
        error={error}>
        {renderMobileCheckBody()}
      </Modal>
      <AddTraineeSuccessModal
        style={{ width: 411, height: 519 }}
        visible={isSuccessOpened}
        onClose={handleClose}
      />
    </>
  )
}

export default AddTraineeModal
