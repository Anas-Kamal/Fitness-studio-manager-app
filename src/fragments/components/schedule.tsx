
import React from 'react'
import cls from 'classnames'
import { useFieldArray, useForm } from 'react-hook-form'
import styles from './schedule.module.scss'
import { ScheduleFormType, TrainerSchedule } from '../../features/api-types'
import { WEEK_DAYS } from '../../lib/constants'
import Chevron from '../../icons/chevron'
import Toggle from './toggle'
import PlusCircledIcon from '../../icons/plusCircled'
import ThrashIcon from '../../icons/thrash'
import LabelWrapper from '../form/label-wrapper'
import { Input } from './input'
import Button from './button'

interface StudioHoursProps {
  scheduleButtonRef?:React.Ref<HTMLButtonElement>,
  disableTitle?: boolean,
  returnHandleOnSumbit: (data: any) => void
}

const Schedule: React.FC<StudioHoursProps> = ({ returnHandleOnSumbit, scheduleButtonRef, disableTitle=false }) => {
  const [scheduleDays, setScheduleDays] = React.useState<number[]>([])
  const [selectedDay, setSelectedDay] = React.useState<number | null>(null)
  const { register, handleSubmit, control, getValues } = useForm<ScheduleFormType>({
    defaultValues: {
      sunday: [{ start: '', finish: '' }],
      monday: [{ start: '', finish: '' }],
      tuesday: [{ start: '', finish: '' }],
      wednesday: [{ start: '', finish: '' }],
      thursday: [{ start: '', finish: '' }],
      friday: [{ start: '', finish: '' }],
      saturday: [{ start: '', finish: '' }],
    },
  })

  const {
    fields: sundayList,
    remove: removeSundayList,
    append: appendSundayList,
  } = useFieldArray({ control, name: 'sunday' })

  const {
    fields: mondayList,
    remove: removeMondayList,
    append: appendMondayList,
  } = useFieldArray({ control, name: 'monday' })

  const {
    fields: tuesdayList,
    remove: removeTuesdayList,
    append: appendTuesdayList,
  } = useFieldArray({ control, name: 'tuesday' })

  const {
    fields: wednesdayList,
    remove: removeWednesdayList,
    append: appendWednesdayList,
  } = useFieldArray({ control, name: 'wednesday' })

  const {
    fields: thursdayList,
    remove: removeThursdayList,
    append: appendThursdayList,
  } = useFieldArray({ control, name: 'thursday' })

  const {
    fields: fridayList,
    remove: removeFridayList,
    append: appendFridayList,
  } = useFieldArray({ control, name: 'friday' })

  const {
    fields: saturdayList,
    remove: removeSaturdayList,
    append: appendSaturdayList,
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
      setScheduleDays(scheduleDays.filter(day => day !== dayId))
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

  const onSubmit = async (data: ScheduleFormType) => {
    const filteredData = Object.keys(data).map(
      key =>
        (data[key as keyof typeof data][0] &&
          data[key as keyof typeof data][0].start && {
            time: data[key as keyof typeof data],
            day: WEEK_DAYS[key as keyof typeof WEEK_DAYS],
          }) ||
        {},
    )
    returnHandleOnSumbit(filteredData)
    return filteredData
  }

  return (
    <>
     {disableTitle && <span className={styles.header}>{"שעות פעילות"}</span> } 
      <form className={cls(styles.wrapper)}>
        <div className={cls(styles.day)}>
          <div className={styles.dayInner} onClick={() => handleDayClick(0)}>
            <Chevron direction={selectedDay === 0 ? 'up' : 'down'} size={16} />
            <div className={styles.toggleRow}>
              <span style={{ gridArea: 'day' }}>ראשון</span>
              <Toggle
                on={scheduleDays.includes(0)}
                pointerStyle={{ left: -8 }}
                onChange={() => handleDayToggleClick(0)}
                style={{ gridArea: 'toggle' }}
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
                (getValues('sunday')[1] && getValues('sunday')[1]?.start && getValues('sunday')[1]?.finish)
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
                (getValues('monday')[1] && getValues('monday')[1]?.start && getValues('monday')[1]?.finish)
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
                (getValues('tuesday')[1] && getValues('tuesday')[1]?.start && getValues('tuesday')[1]?.finish)
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
                (getValues('wednesday')[1] && getValues('wednesday')[1]?.start && getValues('wednesday')[1]?.finish)
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
                (getValues('thursday')[1] && getValues('thursday')[1]?.start && getValues('thursday')[1]?.finish)
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
                (getValues('friday')[1] && getValues('friday')[1]?.start && getValues('friday')[1]?.finish)
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
                (getValues('saturday')[1] && getValues('saturday')[1]?.start && getValues('saturday')[1]?.finish)
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
      </form>
      <Button ref={scheduleButtonRef} type="event" className={styles.submit} onClick={handleSubmit(onSubmit)}>
        הבא
      </Button>
    </>
  )
}

export default Schedule
