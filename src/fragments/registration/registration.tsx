import React, { useState } from 'react'
import cls from 'classnames'
import { useForm } from 'react-hook-form'
import useStep from '../../hooks/useStep'

import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../lib/constants'
import { MongoSelector, mongoSelector } from '../../features/fetchers'
import ENDPOINTS from '../../features/endpoints'
import styles from './registration.module.scss'

import { RegisterInterface } from './types'

import RenderFirstScreen from './first-screen'
import RenderSecondScreen from './second-screen'
import RenderThirdScreen from './third-screen'
import RenderForthScreen from './forth-screen'
import RenderFifthScreen from './fifth-screen'
import RenderSixthScreen from './sixth-screen'
import RenderSeventhScreen from './seventh-screen'
import RenderNinthScreen from './ninth-screen'
import RenderEightScreen from './eight-screen'

interface RegistrationProps {
  className?: string
  style?: React.CSSProperties
}
interface LocationProps {
  phone: string
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

const values = ['isStudio', 'isTrainer']
const Registration: React.FC<RegistrationProps> = ({ className, style }) => {
  const [phone, setPhone] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  // const { phone } = location?.state as LocationProps

  // React.useEffect(() => {
  //   if (!location?.state?.phone) {
  //     navigate(ROUTES.LOGIN)
  //   } else {
  //     setPhone(location.state.phone)
  //   }
  // }, [location?.state])

  const [step, helpers] = useStep(9)
  const { setStep, goToNextStep } = helpers

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch
  } = useForm<RegisterInterface>(phone ? { defaultValues: { client_phone: phone } } : {})
  const isStudio = watch('isStudio')
  const isTrainer = watch('isTrainer')

  const handleClick = async (data: RegisterInterface) => {
    // Updating the profile type according to data from first screen
    try {
      if (step === 0) {
        await updateCurrentAccount({
          body: {
            phone,
            type: isStudio ? 'studio' : 'trainer',
            subscription: {
              type: 'MONTHLY', // 'MONTHLY' or 'ANNUALLY'
              amount: 179,
              startDate: '', //Today
              endDate: '' //+1 month || year
            }
          }
        })
      }
      // Updating the profile client info according to data from second screen
      if (step === 1) {
        await updateCurrentAccount({
          body: {
            phone,
            client_second_name: data.client_second_name,
            client_first_name: data.client_first_name,
            client_email: data.client_email,
            client_phone: data.client_phone
          }
        })
      }
      // Updating the profile studio info according to data from third screen
      if (step === 2) {
        await updateCurrentAccount({
          body: {
            phone,
            nickname: data.studio_nickname,
            full_name: data.studio_full_name,
            email: data.studio_email,
            name: data.studio_name,
            location: data.studio_location
          }
        })
      }
      // Updating the profile studio schedule according to data from forth screen
      if (step === 3) {
        await updateCurrentAccount({
          body: {
            phone,
            schedule: data
          }
        })
      }
      // Updating the profile studio info according to data from fifth screen
      if (step === 4) {
        await updateCurrentAccount({
          body: {
            phone,
            instagram_link: data.instagram_link,
            facebook_link: data.facebook_link,
            description: data.description,
            training_in_studio: data.training_in_studio,
            training_in_client_home: data.training_in_client_home
          }
        })
      }
      // Updating the profile studio training types according to data from sixth screen
      if (step === 5) {
        const training_types = Object.keys(
          Object.fromEntries(Object.entries(data.facilities).filter(([, val]) => val))
        )
        await updateCurrentAccount({
          body: {
            phone,
            training_types,
            is_registered: true
          }
        })
        // return navigate(ROUTES.LOGIN)
      }
      if (step === 6) {
        await updateCurrentAccount({
          body: {
            phone
          }
        })
      }
      if (step == 7) {
        // handle step 7
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
        // return
        // navigate(ROUTES.LOGIN)
      }
      if (step === 8) {
        await updateCurrentAccount({
          body: {
            phone,
            acceptedTerms: true
          }
        })
      
      }
    } catch (err) {
      console.log(err)
    }
    goToNextStep()
  }

  console.log(step)
  // React.useEffect(() => {
  //   setStep(5)
  // }, [])

  React.useEffect(() => {
    if (step === 2 && isTrainer) {
      console.log(step, isTrainer)
      setStep(3)
    }
    // if (step === 6) {
    //   navigate(ROUTES.LOGIN)
    // }
  }, [step])
  React.useEffect(() => {
    const sub = watch((value, { name }) => {
      if (name && values.includes(name) && value[name as keyof RegisterInterface]) {
        reset({ isStudio: false, isTrainer: false, [name]: value })
      }
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

  return (
    <div style={{...style, "height":"100vh !important"}} className={cls(styles.wrapper, className)}>
      {step === 0 && (
        <RenderFirstScreen
          setStep={setStep}
          control={control}
          isStudio={isStudio}
          isTrainer={isTrainer}
          handleSubmit={handleSubmit(handleClick)}
          errors={errors}
        />
      )}
      {step === 1 && (
        <RenderSecondScreen
          handleSubmit={handleSubmit(handleClick)}
          errors={errors}
          register={register}
        />
      )}
      {step === 2 && (
        <RenderThirdScreen
          handleSubmit={handleSubmit(handleClick)}
          errors={errors}
          register={register}
        />
      )}
      {step === 3 && <RenderForthScreen handleSubmit={(data) => handleClick(data)} />}
      {step === 4 && (
        <RenderFifthScreen
          control={control}
          handleSubmit={handleSubmit(handleClick)}
          errors={errors}
          register={register}
        />
      )}
      {step === 5 && (
        <RenderSixthScreen
          control={control}
          handleSubmit={handleSubmit(handleClick)}
          errors={errors}
        />
      )}
      {step === 6 && (
        <RenderSeventhScreen
          control={control}
          handleSubmit={handleSubmit(handleClick)}
          errors={errors}
        />
      )}
      {step === 7 && (
        <RenderNinthScreen
          handleSubmit={handleSubmit(handleClick)}
          register={register}
          setStep={() => navigate(ROUTES.LOGIN)}
        />
      )}
      {step === 8 && (
        <RenderEightScreen
          handleSubmit={handleSubmit(handleClick)}
          register={register}
          setStep={() => navigate(ROUTES.LOGIN)}
        />
      )}
    </div>
  )
}

export default Registration
