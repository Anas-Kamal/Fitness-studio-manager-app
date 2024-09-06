import React, { useEffect, Fragment, useRef } from 'react'
import { Col, Form, Label, Row } from 'reactstrap'
import { RegisterInterface } from '../registration/types'
import { useForm, useFieldArray } from 'react-hook-form'
import useSwr from 'swr'
import UploadImage from '../../icons/upload'
import supabase from '../../features/supabase-client'
import seventhstyles from '../registration/seventh-screen.module.scss'
import RenderSixthScreen from '../registration/sixth-screen'
import RenderSeventhScreen from '../registration/seventh-screen'
import { MongoSelector, mongoSelector } from '../../features/fetchers'
import ENDPOINTS from '../../features/endpoints'
import { useDropzone } from 'react-dropzone'
import Button from '../components/button'
import { Input } from '../components/input'
import RenderThirdScreen from '../registration/third-screen'
import RenderForthScreen from '../registration/forth-screen'
// import Schedule from '../components/schedule'
// ========================================================

import cls from 'classnames'
import settingStyle from "./settings.module.scss"
import styles from './../../fragments/components/schedule.module.scss'
import {
  Profile,
  ScheduleFormType,
  ScheduleFormTypetwo,
  TrainerSchedule
} from '../../features/api-types'
import { WEEK_DAYS } from '../../lib/constants'
import Chevron from '../../icons/chevron'
import PlusCircledIcon from '../../icons/plusCircled'
import ThrashIcon from '../../icons/thrash'
import LabelWrapper from '../form/label-wrapper'
import Toggle from '../components/toggle'

function ProfileSettingPage() {
  const swrKey: MongoSelector = {
    from: ENDPOINTS.REGISTRATION.GET_PROFILE_GET,
    method: 'POST',
    body: {
      accessToken: localStorage.getItem('token')
        // ? localStorage.getItem('token')
        // : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InBob25lIjoiKzk3MjUxODMxMDUwOCJ9LCJpYXQiOjE2NzUxMDA1NDMsImV4cCI6MTY3NTExNDk0M30.c6FHFosKlnGESm2uPM54hYIiB_3cNleb4xVxZwcAsfs'
    }
  }

  const scheduleButtonRef = useRef<HTMLButtonElement | null>(null)
  const [logoUrl, setLogoUrl] = React.useState('')
  const [mainUrl, setMainUrl] = React.useState('')
  const [coverUrls, setCoverUrls] = React.useState<string[]>([...new Array(6).fill('')])
  const [schedule, setSchedule] = React.useState([])
  const { data: studioProfile, error } = useSwr(swrKey, mongoSelector)
  const [loading, setIsLoading] = React.useState(false)
  const uploadLogoUrl = async (files: File[]) => {
    console.log(files)
    try {
      files.forEach( async (file) => {
        const { data, error: supabaseError } = await supabase.storage
          .from('studio')
          .upload(`63ab179bf31e9c851e430acc/${file.name}`, file, {
            cacheControl: '3600',
            upsert: false
          })
          console.log(data,supabaseError)
        if (supabaseError) {
          return
        }
        const { data: url } = supabase.storage.from('studio').getPublicUrl(data?.path)
        alert(url.publicUrl)
        setLogoUrl(url.publicUrl)

        await mongoSelector({
          from: ENDPOINTS.REGISTRATION.UPDATE_PROFILE_POST,
          method: 'POST',
          body: {
            // @ts-ignore
            phone: getValues("phone"),
            logo_url: url.publicUrl
          }
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  const uploadMainUrl = (file: File[]) => {
    //
  }
  const uploadCoverUrl = (file: File[]) => {
    //
  }

  const { getInputProps: getInputPropsForLogo, getRootProps: getRootPropsForLogo } = useDropzone({
    onDrop: uploadLogoUrl,
    maxFiles: 1,
    multiple: false,
    maxSize: 1024 * 1024 * 50,
    accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] }
  })
  const { getInputProps: getInputPropsForCover, getRootProps: getRootPropsForCover } = useDropzone({
    onDrop: uploadCoverUrl,
    maxFiles: 10,
    multiple: 10 > 1,
    maxSize: 1024 * 1024 * 50,
    accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] }
  })
  const { getInputProps: getInputPropsForMain, getRootProps: getRootPropsForMain } = useDropzone({
    onDrop: uploadMainUrl,
    maxFiles: 10,
    multiple: 10 > 1,
    maxSize: 1024 * 1024 * 50,
    accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] }
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
    reset,
    watch
  } = useForm<Profile>({})

  useEffect(() => {
    if (studioProfile?.status) {
      // console.log(studioProfile.data)
      reset(studioProfile.data)
    }
  }, [studioProfile])

  const updateSwrKey: MongoSelector = {
    from: ENDPOINTS.REGISTRATION.UPDATE_PROFILE_POST,
    method: 'POST',
    body: {}
  }
  const updateCurrentAccount = async ({ body }: MongoSelector['body']) => {
    updateSwrKey.body = { ...body }
    const promise = await mongoSelector(updateSwrKey)
    return promise
  }

  useEffect(() => {
    if (schedule.length) {

      (async () => {
        try {
          await updateCurrentAccount({
            body: {
              ...getValues(),
              schedule
              // _id: getValues("_id")
            }
          })
        } catch (error) {}
      })()
    }
  }, [schedule])

  const handleClick = async (data) => {
    if(scheduleButtonRef.current){
      console.log(scheduleButtonRef.current)
      scheduleButtonRef.current.click()
    }
    try {
      setIsLoading(true)
      await updateCurrentAccount({
        body: {
          ...data
        }
      })
    } catch (error) {
      alert(error)
    }
    setIsLoading(false)

  }
  return (
    <Fragment>
      <Row
        tag="form"
        onSubmit={handleSubmit(handleClick)}
        className="w-100 h-100 overflow-y-auto"
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        <Col md={12} className=" d-flex flex-col align-items-end">
          {/* heading */}
          <p className="font-bold mb-2">פרטי הסטודיו</p>
          {/* File uploader screen */}
          <Fragment>
            <div className={seventhstyles.grid}>
              <div
                {...getRootPropsForLogo()}
                className={seventhstyles.logo}
                style={{ gridArea: 'logo' }}>
                {/*  @ts-ignore */}
                {studioProfile?.data?.logo_url ? (
                  // @ts-ignore
                  <img src={studioProfile?.data?.logo_url} alt="" />
                ) : (
                  <div {...getInputPropsForLogo} className={seventhstyles.gap}>
                    <UploadImage />
                  </div>
                )}
                <span>לוגו של הסטודיו</span>
              </div>

              <div
                {...getRootPropsForCover()}
                className={seventhstyles.coverBlock}
                style={{ gridArea: 'cover' }}>
                {coverUrls.map((url) =>
                  url ? (
                    <img key={url} src={url} alt="cover" />
                  ) : (
                    <div
                      key={Math.random() * 10000}
                      {...getInputPropsForCover}
                      className={seventhstyles.gap}>
                      <UploadImage />
                    </div>
                  )
                )}
              </div>
              <div
                {...getRootPropsForMain()}
                className={seventhstyles.main}
                style={{ gridArea: 'main' }}>
                {mainUrl ? (
                  <img src={mainUrl} alt="" />
                ) : (
                  <div {...getInputPropsForMain} className={seventhstyles.gap}>
                    <UploadImage />
                  </div>
                )}
              </div>
            </div>
          </Fragment>

          {/* studio information screen */}
          <Fragment>
            <Row className={`${settingStyle.profileView}  mt-3 justify-end`}>
              <Col xs={8} sm={8} md={8} className="text-right">
                <Input {...register('full_name')} type="text"></Input>
              </Col>
              <Col xs={4} sm={4} md={4}>
                <Label>שם מלא *</Label>
              </Col>
            </Row>
            <Row className={`${settingStyle.profileView} mt-3 justify-end`}>
              <Col xs={8} sm={8} md={8} className="text-right">
                <Input {...register('email')} type="text"></Input>
              </Col>
              <Col xs={4} sm={4} md={4}>
                <Label>אימייל *</Label>
              </Col>
            </Row>
            <Row className={`${settingStyle.profileView} mt-3 justify-end`}>
              <Col xs={8} sm={8} md={8} className="text-right">
                <Input {...register('phone')} type="text"></Input>
              </Col>
              <Col xs={4} sm={4} md={4}>
                <Label>טלפון</Label>{' '}
              </Col>
            </Row>
            {/* <Row className="w-50 mt-3 justify-end">
              <Col md={8} className="text-right">
                <Input type="text"></Input>
              </Col>
              <Col md={4}>
                <Label>שם מלא *</Label>
              </Col>
            </Row> */}

            <Fragment>
              <Row className={`${settingStyle.profileView}   mt-4`}>
                <Col md={12}>
                  <div className="d-flex justify-end my-2">
                    <p className="font-bold">שעות פעילות</p>
                  </div>
                  {/* <Schedule returnHandleOnSumbit={(data) => {
                    console.log(data)
                    setSchedule(data)
                  }} scheduleButtonRef={scheduleButtonRef} disableTitle={false} /> */}
                  <Schedule
                    disableTitle={false}
                    returnHandleOnSumbit={(data) => {
                      alert(data)
                      setSchedule(data)
                    }}
                    schedule={watch('schedule')}
                    scheduleButtonRef={scheduleButtonRef}
                  />
                </Col>
              </Row>
            </Fragment>
            <Row>
              <Col md={12}>
                <Button htmlType="submit" disabled={loading}>Update Seller</Button>
              </Col>
            </Row>
          </Fragment>
        </Col>
      </Row>
    </Fragment>
  )
}

export default ProfileSettingPage

interface StudioHoursProps {
  scheduleButtonRef?: React.Ref<HTMLButtonElement>
  disableTitle?: boolean
  schedule?: Array<ScheduleFormTypetwo>
  returnHandleOnSumbit: (data: any) => void
}

const Schedule: React.FC<StudioHoursProps> = ({
  returnHandleOnSumbit,
  scheduleButtonRef,
  schedule,
  disableTitle = false
}) => {
  const [scheduleDays, setScheduleDays] = React.useState<number[]>([])
  const [selectedDay, setSelectedDay] = React.useState<number | null>(null)
  const { register, handleSubmit, control, getValues, setValue } = useForm<ScheduleFormType>({
    defaultValues: {
      sunday: [{ start: '', finish: '' }],
      monday: [{ start: '', finish: '' }],
      tuesday: [{ start: '', finish: '' }],
      wednesday: [{ start: '', finish: '' }],
      thursday: [{ start: '', finish: '' }],
      friday: [{ start: '', finish: '' }],
      saturday: [{ start: '', finish: '' }]
    }
  })

  useEffect(() => {
    if (schedule) {
      // console.log('wadasdsadasdsad', schedule)

      schedule[0]?.time && setValue('sunday', schedule[0]?.time)
      schedule[1]?.time && setValue('monday', schedule[1]?.time)
      schedule[2]?.time && setValue('tuesday', schedule[2]?.time)
      schedule[3]?.time && setValue('wednesday', schedule[3]?.time)
      schedule[4]?.time && setValue('thursday', schedule[4]?.time)
      schedule[5]?.time && setValue('friday', schedule[5]?.time)
      schedule[6]?.time && setValue('saturday', schedule[6]?.time)
    }
  }, [schedule])

  const {
    fields: sundayList,
    remove: removeSundayList,
    append: appendSundayList
  } = useFieldArray({ control, name: 'sunday' })

  const {
    fields: mondayList,
    remove: removeMondayList,
    append: appendMondayList
  } = useFieldArray({ control, name: 'monday' })

  const {
    fields: tuesdayList,
    remove: removeTuesdayList,
    append: appendTuesdayList
  } = useFieldArray({ control, name: 'tuesday' })

  const {
    fields: wednesdayList,
    remove: removeWednesdayList,
    append: appendWednesdayList
  } = useFieldArray({ control, name: 'wednesday' })

  const {
    fields: thursdayList,
    remove: removeThursdayList,
    append: appendThursdayList
  } = useFieldArray({ control, name: 'thursday' })

  const {
    fields: fridayList,
    remove: removeFridayList,
    append: appendFridayList
  } = useFieldArray({ control, name: 'friday' })

  const {
    fields: saturdayList,
    remove: removeSaturdayList,
    append: appendSaturdayList
  } = useFieldArray({ control, name: 'saturday' })

  const handleDayClick = (dayId: number) => {
    if (selectedDay === dayId) {
      setSelectedDay(null)
    } else {
      setSelectedDay(dayId)
    }
  }

  const handleDayToggleClick = (dayId: number) => {
    if (scheduleDays.includes(dayId)) {
      setScheduleDays(scheduleDays.filter((day) => day !== dayId))
    } else {
      setScheduleDays([...scheduleDays, dayId])
    }
  }
  /* @ts-ignore */
  const handleTimeAdd = (name: string, appendFunc: any) => {
    /* @ts-ignore */
    if (getValues(name).length < 2) {
      appendFunc({ start: '', finish: '' })
    }
  }

  const handleTimeRemove = (index: number, removeFunc: any) => {
    removeFunc(index)
  }

  const handleFormSubmit = (data: ScheduleFormType) => {
    console.log('data', data)
    const filteredData = Object.keys(data).map(
      (key) =>
        (data[key as keyof typeof data][0] &&
          data[key as keyof typeof data][0].start && {
            time: data[key as keyof typeof data],
            day: WEEK_DAYS[key as keyof typeof WEEK_DAYS]
          }) ||
        {}
    )
    returnHandleOnSumbit(filteredData)
    return filteredData
  }

  return (
    <>
      {disableTitle && <span className={styles.header}>{'שעות פעילות'}</span>}
      <Form className={cls(styles.wrapper)} onSubmit={handleSubmit(handleFormSubmit)} style={{}}>
        <div className={cls(styles.day)}>
          <div className={styles.dayInner} onClick={() => handleDayClick(0)}>
            <Chevron direction={selectedDay === 0 ? 'up' : 'down'} size={16} />
            <div className={settingStyle.toggle}>
              <span style={{ gridArea: 'day' }}>ראשון</span>
              <Toggle

                on={scheduleDays.includes(0)}
                pointerStyle={{ left: -8 }}
                onChange={() => handleDayToggleClick(0)}
                // style={}
              />
            </div>
            <div className={styles.selectedTime}>
              <span>
                {getValues('sunday')[0].start &&
                  getValues('sunday')[0].finish &&
                  `
                ${`${getValues('sunday')[0].start} - ${getValues('sunday')[0].finish}`}`}
              </span>
              <span>
                {(getValues('sunday')[0].start && getValues('sunday')[0].finish) ||
                (getValues('sunday')[1] &&
                  getValues('sunday')[1]?.start &&
                  getValues('sunday')[1]?.finish)
                  ? '•'
                  : ''}
              </span>
              <span>
                {getValues('sunday')[1] &&
                  getValues('sunday')[1]?.start &&
                  getValues('sunday')[1]?.finish &&
                  `
                ${`${getValues('sunday')[1].start} - ${getValues('sunday')[1].finish}`}`}
              </span>
            </div>
          </div>

          {selectedDay === 0 &&
            sundayList.map((item, index) => (
              <div key={item.id} className={styles.time}>
                {index === 0 ? (
                  <PlusCircledIcon
                    className={styles.icon}
                    size={20}
                    onClick={() => handleTimeAdd('sunday', appendSundayList)}
                  />
                ) : (
                  <ThrashIcon
                    className={styles.icon}
                    size={20}
                    onClick={() => handleTimeRemove(index, removeSundayList)}
                  />
                )}
                <LabelWrapper title="" style={{ gridArea: 'start' }} className={styles.dataPicker}>
                  {({ id }) => (
                    <Input
                      icon={<Chevron size={12} direction="down" />}
                      className={styles.timePicker}
                      type="time"
                      id={id}
                      {...register(`sunday.${index}.start`, { required: true })}
                    />
                  )}
                </LabelWrapper>
                <LabelWrapper title="" style={{ gridArea: 'finish' }} className={styles.dataPicker}>
                  {({ id }) => (
                    <Input
                      icon={<Chevron size={12} direction="down" />}
                      className={styles.timePicker}
                      type="time"
                      id={id}
                      {...register(`sunday.${index}.finish`, { required: true })}
                    />
                  )}
                </LabelWrapper>
              </div>
            ))}
        </div>
        <div className={cls(styles.day)}>
          <div className={styles.dayInner} onClick={() => handleDayClick(1)}>
            <Chevron direction={selectedDay === 1 ? 'up' : 'down'} size={16} />
            <div className={styles.toggleRow}>
              <span style={{ gridArea: 'day' }}>שני</span>
              <Toggle
                on={scheduleDays.includes(1)}
                pointerStyle={{ left: -8 }}
                onChange={() => handleDayToggleClick(1)}
                style={{ gridArea: 'toggle' }}
              />
            </div>
            <div className={styles.selectedTime}>
              <span>
                {getValues('monday')[0].start &&
                  getValues('monday')[0].finish &&
                  `
                ${`${getValues('sunday')[0].start} - ${getValues('monday')[0].finish}`}`}
              </span>
              <span>
                {(getValues('monday')[0].start && getValues('monday')[0].finish) ||
                (getValues('monday')[1] &&
                  getValues('monday')[1]?.start &&
                  getValues('monday')[1]?.finish)
                  ? '•'
                  : ''}
              </span>
              <span>
                {getValues('monday')[1] &&
                  getValues('monday')[1]?.start &&
                  getValues('monday')[1]?.finish &&
                  `
                ${`${getValues('monday')[1].start} - ${getValues('monday')[1].finish}`}`}
              </span>
            </div>
          </div>
          {selectedDay === 1 &&
            mondayList.map((item, index) => (
              <div key={item.id} className={styles.time}>
                {index === 0 ? (
                  <PlusCircledIcon
                    className={styles.icon}
                    size={20}
                    onClick={() => handleTimeAdd('monday', appendMondayList)}
                  />
                ) : (
                  <ThrashIcon
                    className={styles.icon}
                    size={20}
                    onClick={() => handleTimeRemove(index, removeMondayList)}
                  />
                )}
                <LabelWrapper title="" style={{ gridArea: 'start' }} className={styles.dataPicker}>
                  {({ id }) => (
                    <Input
                      icon={<Chevron size={12} direction="down" />}
                      className={styles.timePicker}
                      type="time"
                      id={id}
                      {...register(`monday.${index}.start`, { required: true })}
                    />
                  )}
                </LabelWrapper>
                <LabelWrapper title="" style={{ gridArea: 'finish' }} className={styles.dataPicker}>
                  {({ id }) => (
                    <Input
                      icon={<Chevron size={12} direction="down" />}
                      className={styles.timePicker}
                      type="time"
                      id={id}
                      {...register(`monday.${index}.finish`, { required: true })}
                    />
                  )}
                </LabelWrapper>
              </div>
            ))}
        </div>
        <div className={cls(styles.day)}>
          <div className={styles.dayInner} onClick={() => handleDayClick(2)}>
            <Chevron direction={selectedDay === 2 ? 'up' : 'down'} size={16} />
            <div className={styles.toggleRow}>
              <span style={{ gridArea: 'day' }}>שלישי</span>
              <Toggle
                on={scheduleDays.includes(2)}
                pointerStyle={{ left: -8 }}
                onChange={() => handleDayToggleClick(2)}
                style={{ gridArea: 'toggle' }}
              />
            </div>
            <div className={styles.selectedTime}>
              <span>
                {getValues('tuesday')[0].start &&
                  getValues('tuesday')[0].finish &&
                  `
                ${`${getValues('tuesday')[0].start} - ${getValues('tuesday')[0].finish}`}`}
              </span>
              <span>
                {(getValues('tuesday')[0].start && getValues('tuesday')[0].finish) ||
                (getValues('tuesday')[1] &&
                  getValues('tuesday')[1]?.start &&
                  getValues('tuesday')[1]?.finish)
                  ? '•'
                  : ''}
              </span>
              <span>
                {getValues('tuesday')[1] &&
                  getValues('tuesday')[1]?.start &&
                  getValues('tuesday')[1]?.finish &&
                  `
                ${`${getValues('tuesday')[1].start} - ${getValues('tuesday')[1].finish}`}`}
              </span>
            </div>
          </div>
          {selectedDay === 2 &&
            tuesdayList.map((item, index) => (
              <div key={item.id} className={styles.time}>
                {index === 0 ? (
                  <PlusCircledIcon
                    className={styles.icon}
                    size={20}
                    onClick={() => handleTimeAdd('tuesday', appendTuesdayList)}
                  />
                ) : (
                  <ThrashIcon
                    className={styles.icon}
                    size={20}
                    onClick={() => handleTimeRemove(index, removeTuesdayList)}
                  />
                )}
                <LabelWrapper title="" style={{ gridArea: 'start' }} className={styles.dataPicker}>
                  {({ id }) => (
                    <Input
                      icon={<Chevron size={12} direction="down" />}
                      className={styles.timePicker}
                      type="time"
                      id={id}
                      {...register(`tuesday.${index}.start`, { required: true })}
                    />
                  )}
                </LabelWrapper>
                <LabelWrapper title="" style={{ gridArea: 'finish' }} className={styles.dataPicker}>
                  {({ id }) => (
                    <Input
                      icon={<Chevron size={12} direction="down" />}
                      className={styles.timePicker}
                      type="time"
                      id={id}
                      {...register(`tuesday.${index}.finish`, { required: true })}
                    />
                  )}
                </LabelWrapper>
              </div>
            ))}
        </div>
        <div className={cls(styles.day)}>
          <div className={styles.dayInner} onClick={() => handleDayClick(3)}>
            <Chevron direction={selectedDay === 3 ? 'up' : 'down'} size={16} />
            <div className={styles.toggleRow}>
              <span style={{ gridArea: 'day' }}>רביעי</span>
              <Toggle
                on={scheduleDays.includes(3)}
                pointerStyle={{ left: -8 }}
                onChange={() => handleDayToggleClick(3)}
                style={{ gridArea: 'toggle' }}
              />
            </div>
            <div className={styles.selectedTime}>
              <span>
                {getValues('wednesday')[0].start &&
                  getValues('wednesday')[0].finish &&
                  `
                ${`${getValues('wednesday')[0].start} - ${getValues('wednesday')[0].finish}`}`}
              </span>
              <span>
                {(getValues('wednesday')[0].start && getValues('wednesday')[0].finish) ||
                (getValues('wednesday')[1] &&
                  getValues('wednesday')[1]?.start &&
                  getValues('wednesday')[1]?.finish)
                  ? '•'
                  : ''}
              </span>
              <span>
                {getValues('wednesday')[1] &&
                  getValues('wednesday')[1]?.start &&
                  getValues('wednesday')[1]?.finish &&
                  `
                ${`${getValues('wednesday')[1].start} - ${getValues('wednesday')[1].finish}`}`}
              </span>
            </div>
          </div>
          {selectedDay === 3 &&
            wednesdayList.map((item, index) => (
              <div key={item.id} className={styles.time}>
                {index === 0 ? (
                  <PlusCircledIcon
                    className={styles.icon}
                    size={20}
                    onClick={() => handleTimeAdd('wednesday', appendWednesdayList)}
                  />
                ) : (
                  <ThrashIcon
                    className={styles.icon}
                    size={20}
                    onClick={() => handleTimeRemove(index, removeWednesdayList)}
                  />
                )}
                <LabelWrapper title="" style={{ gridArea: 'start' }} className={styles.dataPicker}>
                  {({ id }) => (
                    <Input
                      icon={<Chevron size={12} direction="down" />}
                      className={styles.timePicker}
                      type="time"
                      id={id}
                      {...register(`wednesday.${index}.start`, { required: true })}
                    />
                  )}
                </LabelWrapper>
                <LabelWrapper title="" style={{ gridArea: 'finish' }} className={styles.dataPicker}>
                  {({ id }) => (
                    <Input
                      icon={<Chevron size={12} direction="down" />}
                      className={styles.timePicker}
                      type="time"
                      id={id}
                      {...register(`wednesday.${index}.finish`, { required: true })}
                    />
                  )}
                </LabelWrapper>
              </div>
            ))}
        </div>
        <div className={cls(styles.day)}>
          <div className={styles.dayInner} onClick={() => handleDayClick(4)}>
            <Chevron direction={selectedDay === 4 ? 'up' : 'down'} size={16} />
            <div className={styles.toggleRow}>
              <span style={{ gridArea: 'day' }}>חמישי</span>
              <Toggle
                on={scheduleDays.includes(4)}
                pointerStyle={{ left: -8 }}
                onChange={() => handleDayToggleClick(4)}
                style={{ gridArea: 'toggle' }}
              />
            </div>
            <div className={styles.selectedTime}>
              <span>
                {getValues('thursday')[0].start &&
                  getValues('thursday')[0].finish &&
                  `
                ${`${getValues('thursday')[0].start} - ${getValues('thursday')[0].finish}`}`}
              </span>
              <span>
                {(getValues('thursday')[0].start && getValues('thursday')[0].finish) ||
                (getValues('thursday')[1] &&
                  getValues('thursday')[1]?.start &&
                  getValues('thursday')[1]?.finish)
                  ? '•'
                  : ''}
              </span>
              <span>
                {getValues('thursday')[1] &&
                  getValues('thursday')[1]?.start &&
                  getValues('thursday')[1]?.finish &&
                  `
                ${`${getValues('thursday')[1].start} - ${getValues('thursday')[1].finish}`}`}
              </span>
            </div>
          </div>
          {selectedDay === 4 &&
            thursdayList.map((item, index) => (
              <div key={item.id} className={styles.time}>
                {index === 0 ? (
                  <PlusCircledIcon
                    className={styles.icon}
                    size={20}
                    onClick={() => handleTimeAdd('thursday', appendThursdayList)}
                  />
                ) : (
                  <ThrashIcon
                    className={styles.icon}
                    size={20}
                    onClick={() => handleTimeRemove(index, removeThursdayList)}
                  />
                )}
                <LabelWrapper title="" style={{ gridArea: 'start' }} className={styles.dataPicker}>
                  {({ id }) => (
                    <Input
                      icon={<Chevron size={12} direction="down" />}
                      className={styles.timePicker}
                      type="time"
                      id={id}
                      {...register(`thursday.${index}.start`, { required: true })}
                    />
                  )}
                </LabelWrapper>
                <LabelWrapper title="" style={{ gridArea: 'finish' }} className={styles.dataPicker}>
                  {({ id }) => (
                    <Input
                      icon={<Chevron size={12} direction="down" />}
                      className={styles.timePicker}
                      type="time"
                      id={id}
                      {...register(`thursday.${index}.finish`, { required: true })}
                    />
                  )}
                </LabelWrapper>
              </div>
            ))}
        </div>
        <div className={cls(styles.day)}>
          <div className={styles.dayInner} onClick={() => handleDayClick(5)}>
            <Chevron direction={selectedDay === 5 ? 'up' : 'down'} size={16} />
            <div className={styles.toggleRow}>
              <span style={{ gridArea: 'day' }}>שישי</span>
              <Toggle
                on={scheduleDays.includes(5)}
                pointerStyle={{ left: -8 }}
                onChange={() => handleDayToggleClick(5)}
                style={{ gridArea: 'toggle' }}
              />
            </div>
            <div className={styles.selectedTime}>
              <span>
                {getValues('friday')[0].start &&
                  getValues('friday')[0].finish &&
                  `
                ${`${getValues('friday')[0].start} - ${getValues('friday')[0].finish}`}`}
              </span>
              <span>
                {(getValues('friday')[0].start && getValues('friday')[0].finish) ||
                (getValues('friday')[1] &&
                  getValues('friday')[1]?.start &&
                  getValues('friday')[1]?.finish)
                  ? '•'
                  : ''}
              </span>
              <span>
                {getValues('friday')[1] &&
                  getValues('friday')[1]?.start &&
                  getValues('friday')[1]?.finish &&
                  `
                ${`${getValues('friday')[1].start} - ${getValues('friday')[1].finish}`}`}
              </span>
            </div>
          </div>
          {selectedDay === 5 &&
            fridayList.map((item, index) => (
              <div key={item.id} className={styles.time}>
                {index === 0 ? (
                  <PlusCircledIcon
                    className={styles.icon}
                    size={20}
                    onClick={() => handleTimeAdd('friday', appendFridayList)}
                  />
                ) : (
                  <ThrashIcon
                    className={styles.icon}
                    size={20}
                    onClick={() => handleTimeRemove(index, removeFridayList)}
                  />
                )}
                <LabelWrapper title="" style={{ gridArea: 'start' }} className={styles.dataPicker}>
                  {({ id }) => (
                    <Input
                      icon={<Chevron size={12} direction="down" />}
                      className={styles.timePicker}
                      type="time"
                      id={id}
                      {...register(`friday.${index}.start`, { required: true })}
                    />
                  )}
                </LabelWrapper>
                <LabelWrapper title="" style={{ gridArea: 'finish' }} className={styles.dataPicker}>
                  {({ id }) => (
                    <Input
                      icon={<Chevron size={12} direction="down" />}
                      className={styles.timePicker}
                      type="time"
                      id={id}
                      {...register(`friday.${index}.finish`, { required: true })}
                    />
                  )}
                </LabelWrapper>
              </div>
            ))}
        </div>
        <div className={cls(styles.day)}>
          <div className={styles.dayInner} onClick={() => handleDayClick(6)}>
            <Chevron direction={selectedDay === 6 ? 'up' : 'down'} size={16} />
            <div className={styles.toggleRow}>
              <span style={{ gridArea: 'day' }}>שבת</span>
              <Toggle
                on={scheduleDays.includes(6)}
                pointerStyle={{ left: -8 }}
                onChange={() => handleDayToggleClick(6)}
                style={{ gridArea: 'toggle' }}
              />
            </div>
            <div className={styles.selectedTime}>
              <span>
                {getValues('saturday')[0].start &&
                  getValues('saturday')[0].finish &&
                  `
                ${`${getValues('saturday')[0].start} - ${getValues('saturday')[0].finish}`}`}
              </span>
              <span>
                {(getValues('saturday')[0].start && getValues('saturday')[0].finish) ||
                (getValues('saturday')[1] &&
                  getValues('saturday')[1]?.start &&
                  getValues('saturday')[1]?.finish)
                  ? '•'
                  : ''}
              </span>
              <span>
                {getValues('saturday')[1] &&
                  getValues('saturday')[1]?.start &&
                  getValues('saturday')[1]?.finish &&
                  `
                ${`${getValues('saturday')[1].start} - ${getValues('saturday')[1].finish}`}`}
              </span>
            </div>
          </div>
          {selectedDay === 6 &&
            saturdayList.map((item, index) => (
              <div key={item.id} className={styles.time}>
                {index === 0 ? (
                  <PlusCircledIcon
                    className={styles.icon}
                    size={20}
                    onClick={() => handleTimeAdd('saturday', appendSaturdayList)}
                  />
                ) : (
                  <ThrashIcon
                    className={styles.icon}
                    size={20}
                    onClick={() => handleTimeRemove(index, removeSaturdayList)}
                  />
                )}
                <LabelWrapper title="" style={{ gridArea: 'start' }} className={styles.dataPicker}>
                  {({ id }) => (
                    <Input
                      icon={<Chevron size={12} direction="down" />}
                      className={styles.timePicker}
                      type="time"
                      id={id}
                      {...register(`saturday.${index}.start`, { required: true })}
                    />
                  )}
                </LabelWrapper>
                <LabelWrapper title="" style={{ gridArea: 'finish' }} className={styles.dataPicker}>
                  {({ id }) => (
                    <Input
                      icon={<Chevron size={12} direction="down" />}
                      className={styles.timePicker}
                      type="time"
                      id={id}
                      {...register(`saturday.${index}.finish`, { required: true })}
                    />
                  )}
                </LabelWrapper>
              </div>
            ))}
        </div>
        <Button style={{visibility:"hidden"}} ref={scheduleButtonRef} htmlType="submit">
          
        </Button>
      </Form>
    </>
  )
}
