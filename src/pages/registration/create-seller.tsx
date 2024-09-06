import React from 'react'
import RenderNinthScreen from '../../fragments/registration/ninth-screen'
import { useForm } from 'react-hook-form'
import { RegisterInterface } from '../../fragments/registration/types'
import phone from '../../icons/phone'
import { ROUTES } from '../../lib/constants'
import { useNavigate } from 'react-router-dom'
import cls from 'classnames'
import styles from '../../fragments/registration/registration.module.scss'
import ENDPOINTS from '../../features/endpoints'
import { MongoSelector, mongoSelector } from '../../features/fetchers'
import useAuth from '../../features/auth'
import PageContainer from '../../fragments/components/page-container'
import Button from '../../fragments/components/button'

interface CreateSellerProps {
  className?: string
  style?: React.CSSProperties
}
const swrKey: MongoSelector = {
  from: ENDPOINTS.REGISTRATION.UPDATE_PROFILE_POST,
  method: 'POST',
  body: {}
}
const updateCurrentAccount = async ({ body }: MongoSelector['body']) => {
  swrKey.body = { ...body }
  const promise = await mongoSelector(swrKey)
  return promise
}
const CreateSellerPageLayout: React.FC<CreateSellerProps> = ({ className, style }) => {
  const { profile } = useAuth()
  const phone = profile.phone
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch
  } = useForm<RegisterInterface>(phone ? { defaultValues: { client_phone: phone } } : {})
  const handleClick = async (data: RegisterInterface) => {
    await updateCurrentAccount({
      body: {
        phone,
        card_full_name: data.card_full_name,
        card_verification_id: data.card_verification_id,
        card_number: data.card_number,
        card_exp: data.card_exp,
        card_cvv: data.card_cvv
      }
    })
  }
  React.useEffect(() => {
    const sub = watch((value, { name }) => {
      if (name && name === 'card_number') {
        if (!value && !value?.[name]) return null

        // @ts-ignore
        const newValue = value?.[name]
          .replace(/[^\dA-Z]/g, '')
          .replace(/(.{4})/g, '$1 ')
          .trim()

        reset({ card_number: newValue })
      }
    })

    return () => sub.unsubscribe()
  }, [watch])
  //create seleer
  const handleCreateSeller = async () => {
    const body = {
      studio_id: profile?._id
    }
    const response = await mongoSelector({
      from: ENDPOINTS.SELLER.CREATE,
      method: 'POST',
      body
    })
    if (response.status) {
      navigate(ROUTES.CALENDAR)
    }
  }
  return (
    <div style={style} className={cls(styles.wrapper, className)}>
      <PageContainer>
        {' '}
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
          {' '}
          <div
            style={{
              display: 'flex',
              border: '1px solid #F4F4F4',
              borderRadius: 16,
              padding: '20px 20px',
              boxSizing: 'border-box',
              width: '90%',
              marginInline: 'auto',
              marginTop: '8%',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            className="">
            Create Seller Account
            <div className=" justify-center">
              <Button onClick={handleCreateSeller}>אישור והרשמה</Button>
            </div>
          </div>
        </div>{' '}
      </PageContainer>
    </div>
  )
}
export default CreateSellerPageLayout
