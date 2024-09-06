import React, { Fragment, useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import Button from '../components/button'
import Table from '../components/table'
import DownloadIcon from '../../icons/download'
import Modal from '../form/modal'
import { Controller, useForm } from 'react-hook-form'
import { RegisterInterface } from '../registration/types'
import LabelWrapper from '../form/label-wrapper'
import CheckBox from '../components/checkbox'
import styles from './../registration/first-screen.module.scss'
import ninethstyles from './../registration/ninth-screen.module.scss'
import useSwr from 'swr'
import StudioDiscount from '../registration/studio-discount'
import TrainerDiscount from '../registration/trainer-discount'
import { Input } from '../components/input'
import { MongoSelector, mongoSelector } from '../../features/fetchers'
import ENDPOINTS from '../../features/endpoints'
import { Profile } from '../../features/api-types'

function PaymentAndSubscriptionPage() {
  const [isPaymentVisible, setPaymentVisible] = useState(false)
  const [isCardVisible, setCardVisible] = useState(false)
  const [paymentNext, setPaymentNext] = useState(false)
  const [cardNext, setCardNext] = useState(false)
  const [invoices, setInvoices] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
    setValue,
    reset,
    watch
  } = useForm<Profile>({})

  const studioSwrKey: MongoSelector = {
    from: ENDPOINTS.REGISTRATION.GET_PROFILE_GET,
    method: 'POST',
    body: {
      accessToken: localStorage.getItem('token')
        ? localStorage.getItem('token')
        : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InBob25lIjoiKzk3MjUxODMxMDUwOCJ9LCJpYXQiOjE2NzUxMDA1NDMsImV4cCI6MTY3NTExNDk0M30.c6FHFosKlnGESm2uPM54hYIiB_3cNleb4xVxZwcAsfs'
    }
  }

  const { data: studioProfile, error } = useSwr(studioSwrKey, mongoSelector)

  useEffect(() => {
    if (studioProfile) {
      console.log('abcd', studioProfile)
    }
  }, [studioProfile])
  useEffect(() => {
    getAllInvoices()
  }, [])

  const getAllInvoices = async () => {
    try {
      let res = await fetch(
        process.env.REACT_APP_PUBLIC_MONGO_URL + ENDPOINTS.PAYMENTSUBSCRIPTION.GET_ALL_INVOICE,
        { method: 'POST', headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      let response = await res.json()
      if (response.data) {
        console.log('INVOICES', response.data)
      } else {
        throw Error(response.error)
      }
    } catch (error) {}
  }

  return (
    <Fragment>
      <Row>
        <Col md={12}>
          <p className="font-bold"> הגדרות תשלום</p>
        </Col>
      </Row>
      <Row className="gap-2 w-75 justify-end">
        <Col xl={5} lg={6} md={12} sm={12} className="d-flex justify-end">
          {/* subscription */}

          <div
            className="d-flex flex-col justify-between p-2"
            style={{ minWidth: '310px', minHeight: '100px', border: '1px solid #E6E6E6' }}>
            <div className="d-flex justify-between">
              <div className="d-flex align-items-center">
                <span className="mx-2" style={{ fontSize: '12px' }}>
                  {studioProfile?.data?.subscription?.type === 'MONTHLY' && 'חודשי'}
                  {studioProfile?.data?.subscription?.type === 'YEARLY' && 'שְׁנָתִי'}
                </span>
                <p className="font-bold" style={{ fontSize: '25px' }}>
                  ₪
                  {studioProfile?.data?.subscription?.amount
                    ? studioProfile?.data?.subscription?.amount
                    : 179}
                </p>
              </div>

              <div>
                <p>14 יום נסיון</p>
              </div>
            </div>

            <button className="w-25" onClick={() => setPaymentVisible(true)}>
              שדרג מנוי
            </button>
          </div>
        </Col>
        <Col xl={5} lg={6} md={12} sm={12} className="d-flex justify-end">
          {/* credit card */}

          <div
            className="d-flex flex-col justify-between p-2"
            style={{ minWidth: '300px', minHeight: '100px', border: '1px solid #E6E6E6' }}>
            <div className="d-flex justify-between">
              <p style={{ fontSize: '12px' }}>**** **** **** **** 5997</p>
              <div>
                <p>AMEX</p>
              </div>
            </div>
            <div className="d-flex justify-between">
              <button
                onClick={() => {
                  setCardVisible(true)
                }}>
                עדכן
              </button>
              <div className="d-flex justify-between">
                <span className="mx-1" style={{ fontSize: '14px' }}>
                  12/2026
                </span>
                <p className="font-bold">תוקף</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={12}>
          <p className="font-bold">חשבוניות</p>
        </Col>
      </Row>
      <Row className="w-100">
        <Col md={12}>
          <Table
            style={{
              width: '100%',
              maxWidth: 1350,
              minHeight: 400,
              marginInline: 'auto'
            }}
            columns={columns}
            data={[]}
            // refreshing={isValidating}
            // loading={isLoading}
          />
        </Col>
      </Row>
      <PaymentModal
        isVisible={isPaymentVisible}
        onClose={(isNext) => {
          {
            setPaymentVisible(false)
            if (isNext) {
              setPaymentNext(true)
            }
          }
        }}
      />
      <CardModal
        isVisible={isCardVisible}
        onClose={(next) => {
          {
            if (next) {
              setCardNext(true)
            }
            setCardVisible(false)
          }
        }}
      />
      <Modal
        style={{ width: '500px', height: 'max-content' }}
        visible={paymentNext}
        showCross={false}
        rendertitle={false}
        renderSubtitle={false}
        renderFooter={false}
        onClose={() => setPaymentNext(false)}
        children={
          <div className="d-flex flex-col align-items-center">
            <p className="font-bold">
              אנחנו שמחים שבחרת להרחיב את השימוש במערכת שלנו ולהנות מהחבילה השנתית, החל מהחודש הבא
              בלחיצה על המשך כרטיס האשראי שלך יחוייב באופן חודשי בסכום המצויין. אם ברצונך לשנות את
              אמצעי התשלום באפשרותך לעשות זאת בהגדות.
            </p>

            <Button
              className="px-5 mt-3 w-50"
              style={{ background: 'black', color: 'white' }}
              type={'event'}
              onClick={() => {
                setPaymentNext(false)
              }}>
              אישור
            </Button>
          </div>
        }
      />
      <Modal
        style={{ width: '500px', height: 'max-content' }}
        visible={cardNext}
        showCross={false}
        rendertitle={false}
        renderSubtitle={false}
        renderFooter={false}
        onClose={() => setCardNext(false)}
        children={
          <div className="d-flex flex-col align-items-center">
            <p className="font-bold">
              אם תמחק את פרטי האשראי שלך לא תהיה לך אפשרות להתמשמש במערכת. להמשיך בכל זאת?
            </p>
            <div className="w-100 gap-4 d-flex justify-between">
              <Button
                className="px-5 mt-3 w-50"
                style={{ background: 'black', color: 'white' }}
                type={'event'}
                onClick={() => {
                  setCardNext(false)
                }}>
                חזור
              </Button>
              <Button
                className="px-5 mt-3 w-50"
                style={{ background: 'black', color: 'white' }}
                type={'white'}
                onClick={() => {
                  setCardNext(false)
                }}>
                בסדר
              </Button>
            </div>
          </div>
        }
      />
    </Fragment>
  )
}

export default PaymentAndSubscriptionPage

const PaymentModal = ({ isVisible, onClose }) => {
  const [phone, setPhone] = useState(null)
  // const location = useLocation()
  // const values = ['isStudio', 'isTrainer']

  // React.useEffect(() => {
  //   setPhone(location.state.phone)
  // }, [location?.state])
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    reset,
    watch
  } = useForm<RegisterInterface>(phone ? { defaultValues: { client_phone: phone } } : {})
  const handleClick = async (data: RegisterInterface) => {
    console.log(data)
    // Updating the profile type according to data from first screen
    try {
    } catch (err) {
      console.log(err)
    }
  }
  const isStudio = watch('isStudio')
  const isTrainer = watch('isTrainer')

  return (
    <Modal
      style={{ width: '50%', minHeight: 'max-content', overflowY: 'auto' }}
      title="עדכון חבילה"
      subTitle="שדרגו אל החבילה המתאימה לכם"
      visible={isVisible}
      showCross={false}
      onClose={onClose}
      children={
        <>
          {/* <RenderFirstScreen
            setStep={() => {}}
            control={control}
            isStudio={isStudio}
            isTrainer={isTrainer}
            handleSubmit={handleSubmit(handleClick)}
            errors={errors}
          /> */}
          <Row tag={'form'} onSubmit={handleSubmit(handleClick)}>
            <Col md={12}>
              <div
                className="d-flex justify-around gap-3 mt-1 "
                style={{ textAlign: 'end', marginRight: '40px' }}>
                <LabelWrapper
                  className={styles.box}
                  error={`isTrainer` in errors ? 'Phone must be provided' : null}>
                  {() => (
                    <Controller
                      name="isTrainer"
                      control={control}
                      render={({ field }) => (
                        <>
                          <div>
                            <CheckBox
                              on={field.value}
                              onChange={(e) => {
                                if (isStudio) {
                                  setValue('isStudio', false)
                                }
                                field.onChange(e)
                              }}
                            />
                            <span>מאמן אישי</span>
                          </div>
                          <span>
                            אימון כושר שבו אדם אחד מתאמן תחת הדרכתו האישית של מאמן כושר גופני .{' '}
                          </span>
                        </>
                      )}
                    />
                  )}
                </LabelWrapper>
                <LabelWrapper
                  className={styles.box}
                  error={`isStudio` in errors ? 'Phone must be provided' : null}>
                  {() => (
                    <Controller
                      name="isStudio"
                      control={control}
                      render={({ field }) => (
                        <>
                          <div>
                            <CheckBox
                              on={field.value}
                              onChange={(e) => {
                                if (isTrainer) {
                                  setValue('isTrainer', false)
                                }
                                field.onChange(e)
                              }}
                            />
                            <span>סטודיו</span>
                          </div>
                          <span>
                            אימון כושר שבו אדם אחד מתאמן תחת הדרכתו האישית של מאמן כושר גופני.{' '}
                          </span>
                        </>
                      )}
                    />
                  )}
                </LabelWrapper>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={12}>
              {isStudio && <StudioDiscount control={control} errors={errors} />}
            </Col>
            <Col md={6} lg={12} className="overflow-y-auto">
              {isTrainer && <TrainerDiscount control={control} errors={errors} />}
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={12} className="d-flex justify-between">
              <Button
                className="px-5 mb-3"
                style={{ background: 'black', color: 'white' }}
                type={isTrainer || isStudio ? 'event' : 'white'}
                onClick={() => {
                  onClose(true)
                  // handleSubmit()
                  // return setStep(1)
                }}>
                הבא
              </Button>
              <Button
                className="px-5 mb-3"
                style={{ background: 'black', color: 'white' }}
                type={isTrainer || isStudio ? 'event' : 'white'}
                onClick={() => {
                  onClose()
                  // handleSubmit()

                  // return setStep(1)
                }}>
                חזור
              </Button>
            </Col>
          </Row>
        </>
      }
      renderFooter={false}
    />
  )
}

const CardModal = ({ isVisible, onClose }) => {
  const [phone, setPhone] = useState(null)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    reset,
    watch
  } = useForm<RegisterInterface>(phone ? { defaultValues: { client_phone: phone } } : {})
  const handleClick = async (data: RegisterInterface) => {
    console.log(data)
    // Updating the profile type according to data from first screen
    try {
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal
      style={{ width: '50%', minHeight: 'max-content' }}
      title="עדכון חבילה"
      subTitle="שדרגו אל החבילה המתאימה לכם"
      visible={isVisible}
      showCross={false}
      onClose={onClose}
      children={
        <Fragment>
          <Row className="w-100 h-100" tag={'form'} onSubmit={handleSubmit(handleClick)}>
            <Col md={12}>
              <div className="mx-3">
                <div className="mb-2" style={{ textAlign: 'end' }}>
                  <span>כרטיס אשראי</span>
                </div>
                <div className={ninethstyles.block}>
                  <div className={ninethstyles.grid}>
                    <LabelWrapper style={{ gridArea: 'card_full_name' }} title="שם מלא">
                      {({ id }) => (
                        <Input id={id} {...register('card_full_name', { required: true })} />
                      )}
                    </LabelWrapper>
                    <LabelWrapper
                      style={{ gridArea: 'card_verification_id' }}
                      title="ת.ז של בעל הכרטיס">
                      {({ id }) => (
                        <Input id={id} {...register('card_verification_id', { required: true })} />
                      )}
                    </LabelWrapper>
                    <LabelWrapper style={{ gridArea: 'card_number' }} title="מספר כרטיס">
                      {({ id }) => (
                        <Input
                          id={id}
                          maxLength={19}
                          {...register('card_number', { required: true, maxLength: 19 })}
                        />
                      )}
                    </LabelWrapper>
                    <div className={ninethstyles.cardCreds} style={{ gridArea: 'card_creds' }}>
                      <LabelWrapper>
                        {({ id }) => (
                          <Input
                            placeholder="MM/YY"
                            maxLength={4}
                            id={id}
                            {...register('card_exp', {
                              required: true,
                              maxLength: 5
                              // onChange: (e) => {
                              //   let input = e.target.value;
                              //   input = input.replace(/\D/g, '');
                              //   if (input.length >= 3) {
                              //     input = `${input.slice(0, 2)}/${input.slice(2)}`;
                              //   }
                              //   return input
                              //   // Use a regular expression to allow only MM/YY format
                              //   // const isValidFormat = /^\d{2}\/\d{2}$/.test(input);

                              // }
                            })}
                          />
                        )}
                      </LabelWrapper>
                      <LabelWrapper>
                        {({ id }) => (
                          <Input
                            maxLength={3}
                            placeholder="CVV"
                            id={id}
                            type="password"
                            {...register('card_cvv', { required: true, maxLength: 3 })}
                          />
                        )}
                      </LabelWrapper>
                    </div>
                  </div>
                </div>

                <div className={ninethstyles.btnBlock}>
                  <Button type="event" htmlType="submit" className={styles.button}>
                    עדכן
                  </Button>
                  <Button
                    type="white"
                    htmlType="submit"
                    style={{ backgroundColor: '#777777', color: 'white' }}
                    className={styles.button}
                    onClick={() => onClose(true)}>
                    מחק כרטיס
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Fragment>
      }
      renderFooter={false}
    />
  )
}

const columns = [
  // {
  //   style: { width: '15%' },
  //   title: 'מחיר',
  //   isFilter: true,
  //   render: ({ course_trainer }) => course_trainer,
  // },
  // {
  //   isFilter: true,
  //   style: { width: '15%' },
  //   title: 'ת. אימון אחרון',
  //   render: ({ course_end_date }) => course_end_date,
  // },
  // {
  //   isFilter: true,
  //   style: { width: '10%' },
  //   title: '',
  //   render: ({ course_participants_number }) => <DownloadIcon />
  // },
  // {
  //   isFilter: true,
  //   style: { width: '10%' },
  //   title: 'סטטוס',
  //   render: ({ course_repetitions_amount }) => <button>שולם</button>
  // },
  // {
  //   isFilter: true,
  //   style: { width: '10%' },
  //   title: 'תאריך ',
  //   render: ({ course_end_date }) => course_end_date
  // },
  // {
  //   isFilter: true,
  //   style: { width: '10%' },
  //   title: 'אמצעי תשלום ',
  //   render: ({ course_start_date }) => course_start_date
  // },
  // {
  //   isFilter: true,
  //   style: { width: '10%' },
  //   title: 'סכום',
  //   render: ({ course_trainer }) => course_trainer
  // },
  // {
  //   isFilter: true,
  //   style: { width: '50%', textAlign: 'right' },
  //   title: 'עבור',
  //   render: ({ course_name }) => course_name
  // }
]
