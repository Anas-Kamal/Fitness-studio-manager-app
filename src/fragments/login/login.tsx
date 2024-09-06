import React from 'react';
import useStep from '../../hooks/useStep'
import logo from '../../imgs/bounce/logo.svg'
import inputStyle from "../components/input.module.scss"
import { Controller, useForm } from 'react-hook-form'
import Logo from '../../icons/logo'
import useAuth from '../../features/auth'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../lib/constants'
import styles from './login.module.scss'
import { Input } from '../components/input'
import LabelWrapper from '../form/label-wrapper'
import OtpInput from '../components/otp-input'
import Loader from '../components/loader'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css' // Import the component's styles

//@ts-ignore
import welcome from '../../imgs/avatar/welcome.png'

interface RegistrationProps {
  className?: string
  style?: React.CSSProperties
}

enum Photos {
  zero = '../../imgs/bounce/welcome.png',
  first = 'https://xrpezrbqybgyoeudryoa.supabase.co/storage/v1/object/public/generalphotos/login/2.png'
}

interface LoginFormInterface {
  phone: string
  ['otp-0']: string
  ['otp-1']: string
  ['otp-2']: string
  ['otp-3']: string
}

const otp = [...new Array(4).fill(0)]

const Login: React.FC<RegistrationProps> = ({ className, style }) => {
  const navigate = useNavigate()
  const [step, helpers] = useStep(2)

  const { loginWithPhone, loginWithOtp, isAuthenticated, loginWithRegistraionOtp, isLoading, OTP } =
    useAuth()

  const { setStep } = helpers

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<LoginFormInterface>()

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.CALENDAR)
    }
  }, [isAuthenticated])

  if (isLoading) return <Loader />

  const handleClick = async (data: LoginFormInterface) => {
    try {
      if (step === 0) {
        await loginWithPhone(data.phone.replace(/\s/g, '')).then((e) => {
          if (e?.is_registered === false) {
            setStep(2)
            return
          }
          setStep(1)
        })
        return
      }
      if (step === 1) {
        const incomingOtp = Object.keys(data)
          .filter((_) => _ !== 'phone')
          .map((_) => data[_ as keyof typeof data])
          .join('')

        await loginWithOtp(data.phone.replace(/\s/g, ''), incomingOtp).then((e) => {
          if (!e) {
            navigate(ROUTES.REGISTRATION, { state: { phone: data.phone.replace(/\s/g, '') } })
          }
        })
      }
      if (step === 2) {
        const incomingOtp = Object.keys(data)
          .filter((_) => _ !== 'phone')
          .map((_) => data[_ as keyof typeof data])
          .join('')

        await loginWithRegistraionOtp(data.phone.replace(/\s/g, ''), incomingOtp).then(() =>
          navigate(ROUTES.REGISTRATION, { state: { phone: data.phone.replace(/\s/g, '') } })
        )
      }
    } catch (err) {
      console.log(err)
    }
  }
  const inputfocus = (elmnt) => {
    if (elmnt.key === 'Delete' || elmnt.key === 'Backspace') {
      const next = elmnt.target.tabIndex - 2
      if (next > -1) {
        elmnt.target.form.elements[next].focus()
      }
    } else {
      console.log('next')

      const next = elmnt.target.tabIndex
      if (next < 4) {
        elmnt.target.form.elements[next].focus()
      }
    }
  }
  const renderFirstScreen = () => (
    <div className={styles.firstScreen}>
      <img
        style={{ width: '50%', height: '100vh', objectFit: 'cover' }}
        src={welcome}
        alt="trainer"
      />
      <div>
        <Logo />
        <span>התחברות</span>
        <LabelWrapper error={'phone' in errors ? 'Phone must be provided' : null}>
          {({ id }) => (
            <PhoneInput
            style={{padding:"8px"}}
            international
              placeholder="הזן מספר טלפון"
              countryCallingCodeEditable={false}
              //  value={}
              {...register('phone', { required: true, minLength: 5 })}
              onChange={() => {}}
            />
            // <Input
            //   placeholder="מספר טלפון"
            //   id={id}
            //   {...register('phone', { required: true, minLength: 5 })}
            // />
          )}
        </LabelWrapper>
        <button onClick={handleSubmit(handleClick)} type="button">
          שלח קוד
        </button>
      </div>
    </div>
  )

  const renderSecondScreen = ({ dt }: any) => (
    <div className={styles.secondScreen}>
      <img src={welcome} alt="trainer" />
      <div>
        <Logo />
        <span>התחברות</span>
        <form>
          <div className=" flex justify-end gap-1">
            {otp.map((_: any, idx: React.Key | null) => (
              // eslint-disable-next-line react/no-array-index-key
              // <div className="flex justify-end gap-1">
              <Controller
                name={`otp-${idx as 0 | 1 | 2 | 3}`}
                control={control}
                render={({ field }) => (
                  <OtpInput
                    value={field.value}
                    onChange={field.onChange}
                    handleKeyDown={idx === 0 ? onkeydown : null}
                    tabIndex={+idx + 1}
                    handleInputFocus={(e) => inputfocus(e)}
                  />
                )}
              />
              // </div>
            ))}
          </div>
        </form>
        {/* <div style={{ padding: '10px', marginRight: '10px' }}>
          <p>
            OTP is:: <span style={{ fontWeight: 'bolder', fontSize: '18' }}>{dt}</span>
          </p>
        </div> */}
        <button onClick={handleSubmit(handleClick)} type="button">
          שלח קוד
        </button>
      </div>
    </div>
  )

  const renderRegistrationOtp = () => (
    <div className={styles.secondScreen}>
      <img src={Photos.first} alt="trainer" />
      <div>
        <Logo />
        <span>התחברות</span>
        <div>
          {otp.map((_: any, idx: React.Key | null | undefined) => (
            // eslint-disable-next-line react/no-array-index-key
            <LabelWrapper
              key={idx}
              error={`otp-${idx}` in errors ? 'Phone must be provided' : null}>
              {() => (
                <Controller
                  name={`otp-${idx as 0 | 1 | 2 | 3}`}
                  control={control}
                  render={({ field }) => <input value={field.value} onChange={field.onChange} />}
                />
              )}
            </LabelWrapper>
          ))}
        </div>

        <button onClick={handleSubmit(handleClick)} type="button">
          שלח קוד
        </button>
      </div>
    </div>
  )

  return (
    <div style={style} className={styles.wrapper}>
      {step === 0 && renderFirstScreen()}
      {step === 1 && renderSecondScreen({ dt: OTP })}
      {step === 2 && renderRegistrationOtp()}
    </div>
  )
}

export default Login
