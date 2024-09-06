
import * as React from 'react'
import cls from 'classnames'
import {
  add,
  format,
  set,
  startOfWeek,
  getISODay,
  getHours,
  differenceInMinutes,
  getMinutes,
  endOfWeek,
  formatDistance,
} from 'date-fns'
import heLocale from 'date-fns/locale/he'
import styles from './calendar.module.scss'
import Chevron from '../../icons/chevron'
import type { EventProps, InternalProps as InternalEventProps } from './event'
import useResizeObserver from '../../hooks/resize-observer'
import ChooseWeek from './modals/choose-week'

interface TimeFence {
  from: number
  to: number
}

// @ts-ignore
export interface CalendarProps {
  /**
   * Additional classNames applied to the container
   */
  className?: string
  /**
   * Additional CSS applied to the container
   */
  style?: React.CSSProperties
  /**
   * Do not allow calendar to go before this date.
   *
   * Otherwise the user can scroll back to BC era.
   */
  notBefore: Date
  /**
   * Do not allow calendar to go after this date.
   *
   * Otherwise the user can scroll back to the future.
   */
  notAfter: Date

  /**
   * Will only show times indicated by timefence, e.g. from 9am until 10pm
   *
   * @default 8am, 11pm inclusive.
   */
  timeFence?: TimeFence
  /**
   * Will render calendar around this date.
   * E.g. if set to 2022-11-15, then will render calendar for this week
   *
   * @default current date/time in the timezone provided by timeZone parameter
   */
  aroundDate?: Date
  /**
   * When user clicks on the cell
   */
  onAnchorChange?: (date: Date) => void
  /**
   * Blocks rendered on the calendar itself
   */
  children?: React.ReactNode
}
/**
 * Clamps the value by `to` number.
 *
 * For example, 232 clamped by 10, will become 230, whereas
 * 239 will become 240
 *
 * @param value
 * @param to
 */
const clamp = (value: number, to = 10) => Math.round(value / to) * to
const WEEK_RANGE = [0, 1, 2, 3, 4, 5, 6]
const Calendar: React.FC<CalendarProps> = ({
  className,
  style,
  aroundDate = new Date(),
  timeFence = {
    from: 9,
    to: 25,
  },
  onAnchorChange = () => null,
  children,
  notAfter,
  notBefore,
}) => {
  const screenWidth = useResizeObserver()
  // This indicates how many days are in the range, e.g. if it's a mobile view, then we will set it to 1
  const [range] = React.useState(WEEK_RANGE)
  const [isSelectWeekVisible, setIsSelectWeekVisible] = React.useState(false)
  // Reference cell
  // Since all cells are identical, we only need to get a top/left cell
  // and from there we can calculate the event offset and stuff
  const [referenceRef, setReferenceRef] = React.useState<HTMLDivElement | null>(null)
  const handleChildrenRef = (referenceCell: HTMLDivElement) => {
    if (referenceCell) {
      setReferenceRef(referenceCell)
    }
  }
  const dateRange = React.useMemo(() => {
    const start = startOfWeek(aroundDate, {
      weekStartsOn: 0,
    })
    const end = endOfWeek(aroundDate, {
      weekStartsOn: 0,
    })
    return {
      interval: {
        start,
        end,
      },
      start,
      end,
    }
  }, [aroundDate, range])
  /**
   * Move one period forward or back
   * @param forward
   */
  const changePeriod = (forward: boolean) => {
    const periodInDays = range.length
    const nextPeriodAnchor = add(aroundDate, { days: forward ? periodInDays : -periodInDays })
    onAnchorChange(nextPeriodAnchor)
  }
  /**
   * Calculates position for the event
   */
  const calculatePosition = React.useCallback(
    (from: Date, to: Date) => {
      if (!referenceRef) {
        return null
      }
      const minuteHeight = referenceRef.clientHeight / 60
      // TODO: Figure out an event that spans for multiple days
      /**
       * Calculate left offset
       */
      const dayOfWeek = getISODay(from)
      const left = referenceRef.offsetLeft - Math.ceil(referenceRef.offsetWidth * dayOfWeek) + 7
      /**
       * Calculate top offset
       */
      const dayHour = getHours(from)
      const fencedDayHour = dayHour - (timeFence?.from || 8)
      const minutes = clamp(fencedDayHour * 60 + getMinutes(from))
      const top = Math.floor(referenceRef.offsetTop + minuteHeight * minutes + 2)
      /**
       * Calculate height
       */
      const diff = differenceInMinutes(to, from)
      const clampDiff = clamp(diff)
      const height = clampDiff * minuteHeight
      /**
       * Calculate width
       */
      // TODO: @ref1 Is there a way to figure out that certain events overlap?
      // Ideally we want to mimic Google Calendar here, where width becomes smaller if there are other events
      const width = referenceRef.clientWidth - 10
      const maxWidth = referenceRef.clientWidth
      return {
        top,
        left,
        width,
        maxWidth,
        height,
        durationInMinutes: diff,
        clampedDurationInMinutes: clampDiff,
      } as InternalEventProps
    },
    [referenceRef],
  )
  /**
   * Calendar header
   */
  const renderHeader = React.useCallback(
    () => (
      <div className={cls(styles.headWrapper)}>
        <div className={styles.head}>
          <div>
            <Chevron onClick={() => changePeriod(false)} direction="left" />
            <Chevron onClick={() => changePeriod(true)} direction="right" />
          </div>
          <div onClick={() => setIsSelectWeekVisible(true)}>
            <Chevron direction="down" />
            <span>{format(aroundDate, 'LLLL', { locale: heLocale })}</span>
          </div>
        </div>
        <div className={styles.header}>
          <div />

          {range.map(dayIdx => {
            const date = add(dateRange.start, { days: dayIdx })
            return (
              <div key={dayIdx} className={cls(styles.date)}>
                <span>{format(date, 'd', { locale: heLocale })}</span>
              </div>
            )
          })}
        </div>
      </div>
    ),
    [dateRange],
  )
  /**
   * Calendar grid
   */
  const renderGrid = React.useCallback(() => {
    const from = timeFence?.from || 8
    const to = timeFence?.to || 21
    const rows = [...new Array(to - from)].map((_, idx) => idx + from)
    return (
      <div className={styles.grid}>
        {rows.map((rowHour, idx) => {
          const datetime = set(new Date(), {
            hours: rowHour + 1,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
          })
          return (
            <React.Fragment key={`${rowHour}`}>
              <div className={cls(styles.cell, styles.left)}>
                <span>{format(datetime, 'HH:mm', { locale: heLocale })}</span>
              </div>
              {range.map(dayIdx => (
                <div
                  key={`${dayIdx}`}
                  className={cls(styles.cell, {
                    [styles.last]: idx === rows.length - 1,
                  })}
                  ref={idx === 0 && dayIdx === 0 ? handleChildrenRef : undefined}
                />
              ))}
            </React.Fragment>
          )
        })}
      </div>
    )
  }, [aroundDate])
  /**
   * Render single event
   *
   * Every event is memoized as long as the input parameters are the same
   */
  const renderEvent = React.useCallback(
    (child: React.ReactElement<EventProps>) => {
      if (!referenceRef) {
        return null
      }

      const { from, to } = child.props
      const position = calculatePosition(from, to)

      const isOutOfRangeTo = Number(formatDistance(to, notBefore).split(' ')[0]) > 7
      const isOutOfRange = Number(formatDistance(from, notAfter).split(' ')[0]) > 7
      if (isOutOfRange || isOutOfRangeTo) return null
      if (!position) {
        return null
      }
      // Remove dates that are ass-backwards
      if (position.durationInMinutes <= 0) {
        return null
      }
      return React.cloneElement(child, {
        ...child.props,
        top: position.top,
        left: position.left,
        width: position.width,
        maxWidth: position?.maxWidth,
        height: position?.height,
        durationInMinutes: position?.durationInMinutes,
        clampedDurationInMinutes: position?.clampedDurationInMinutes,
      } as EventProps & InternalEventProps)
    },
    [referenceRef, notAfter, notBefore],
  )
  /**
   * Render all events passed down to the calendar
   */
  const renderChildren = React.useCallback(() => {
    if (!children) {
      return null
    }
    if (!referenceRef) {
      return null
    }
    // TODO: @ref1 Is there a way to figure out that certain events overlap?
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return null
      }
      // TODO: Filter out events that do not fit the timeFence
      // TODO: Filter out events that do not fit by date
      return renderEvent(child as React.ReactElement<EventProps>)
    })
  }, [children, referenceRef, screenWidth])
  return (
    <>
      <div className={cls(styles.wrapper, className)} style={style}>
        {renderHeader()}
        {renderGrid()}
        {renderChildren()}
        {/* {renderTimeIndicator()} */}
      </div>
      <ChooseWeek isVisible={isSelectWeekVisible} onClose={() => setIsSelectWeekVisible(false)} />
    </>
  )
}
export default Calendar
