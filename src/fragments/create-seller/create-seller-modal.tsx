/* eslint-disable no-underscore-dangle */
import React from 'react'
import cls from 'classnames'
import { useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import ENDPOINTS from '../../features/endpoints'
import styles from './add-trainee.module.scss'
import LabelWrapper from '../form/label-wrapper'
import Modal from '../form/modal'
import { TrainerAddType } from '../../features/api-types'
import { Input } from '../components/input'
import { mongoSelector } from '../../features/fetchers'
import useAuth from '../../features/auth'
import { getTraineesMutationKey } from '../../features/trainees'
import { ROUTES } from '../../lib/constants'
import { useNavigate } from 'react-router-dom'
import Button from '../components/button'

interface AddTraineeProps {
  className?: string
  style?: React.CSSProperties
  visible: boolean
  onClose: () => void
}

const CreateSellerModal: React.FC<AddTraineeProps> = ({ className, style, onClose, visible }) => {
  const navigate = useNavigate()
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
          phone: data.phone
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

  return (
    <Modal
      style={style}
      loading={submitting}
      className={className}
      onOk={() => navigate(ROUTES.CREATE_SELLER)}
      onClose={handleClose}
      visible={visible}
      title="Create Seller account"
      okTitle="Verify"
      closeTitle="later"
      renderFooter={false}
      error={error}>
      <p>You need to create a seller account first!</p>
      <div className="flex justify-between my-6 w-full">
        <Button onClick={handleClose}>
          <p>Later</p>
        </Button>
        <Button onClick={() => navigate(ROUTES.SETTINGS,{state:{openseller:true}})}>
          <p>Create </p>
        </Button>
      </div>
    </Modal>
  )
}

export default CreateSellerModal
