
import * as React from 'react'
import cls from 'classnames'
import styles from './event.module.scss'
import { useSingleRoom } from '../../features/rooms'

type EventType = 'availability' | 'event'

export interface InternalProps {
  top: number
  left: number
  width: number
  maxWidth: number
  height: number
  durationInMinutes: number
  clampedDurationInMinutes: number
}

export interface EventProps {
  className?: string
  style?: React.CSSProperties
  type: EventType
  id?: string
  from: Date
  to: Date
  title?: string
  room?: string | number
  address?: string | number
  isAddress?: boolean
  amount_of_partipiciants?: number
  /**
   * Raises event card marking it as currently active.
   *
   * Could be used to highlight currently editing card.
   */
  active?: boolean


  onClick?: (event: SyntheticCalendarEvent) => void
}

export type SyntheticCalendarEvent = EventProps &
  Partial<InternalProps> & {
    ref: React.RefObject<HTMLDivElement>
  }

const Event = React.forwardRef<HTMLDivElement, React.PropsWithoutRef<EventProps & Partial<InternalProps>>>(
  (props, ref) => {
    const {
      style,
      className,
      type,
      // id,
      title,
      top,
      left,
      width,
      maxWidth,
      height,
      isAddress = false,
      amount_of_partipiciants,
      // durationInMinutes,
      clampedDurationInMinutes,
      active = false,
      onClick = () => null,
      room,
      address,
    } = props

    const internalRef = React.useRef<HTMLDivElement>(null)

    const handleOnClick = () => {
      onClick({
        ...props,
        ref: internalRef,
      })
    }

    const { collection: roomData } = useSingleRoom({ room_id: isAddress ? '' : room?.toString() })

    return (

      <div
        role="button"
        onClick={handleOnClick}
        tabIndex={0}
        // onKeyDown={e => (e.code === 'Enter' ? handleOnClick() : null)}
        className={cls(styles.wrapper, className, {
          [styles.large]: (clampedDurationInMinutes || 60) >= 45,
          [styles.event]: type === 'event',
          [styles.availability]: type === 'availability',
          [styles.active]: active,
        })}
        style={{ top, left, width, height, maxWidth, ...style }}
        ref={inner => {


          if (ref) {
            // @ts-ignore
            ref(inner)
          }

          // @ts-ignore
          internalRef.current = inner


        }}
      >
        <span className={styles.title}>{title}</span>
        <span className={styles.address}>{isAddress ? address : roomData?.name_of_room || room}</span>

        {!!amount_of_partipiciants && (
          <span className={styles.partipiciants}>{`${Number(amount_of_partipiciants)} רשומים`}</span>
        )}
        <span className={cls(styles.dot, { [styles.filled]: true })} />
      </div>
    )
  },
)

export default Event
