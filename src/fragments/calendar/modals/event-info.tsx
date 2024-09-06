/* eslint-disable no-underscore-dangle */
import React from 'react'
import cls from 'classnames'
import styles from './event-info.module.scss'
import Modal from '../../form/modal'
import ProfileIcon from '../../../icons/profile'
import LocationIcon from '../../../icons/location'
import TrainingIcon from '../../../icons/training'
import ParticipantsIcon from '../../../icons/participants'
import ReoccuringIcon from '../../../icons/reoccuring'
import PencilIcon from '../../../icons/pencil'
import ThrashIcon from '../../../icons/thrash'
import EditPrivateSession from './private-session-edit'
import EditGroupSession from './group-session-edit'
import CancelEvent from './event-cancel'
import TentIcon from '../../../icons/tent'
import Chevron from '../../../icons/chevron'
import { TYPES_OF_TRAININGS } from '../../../lib/constants'
import { useSingleTrainerStudio } from '../../../features/trainer'
import { useSingleRoom } from '../../../features/rooms'

interface EventInfoProps {
  event: any
  eventType: 'availability' | 'event'
  style?: React.CSSProperties
  className?: string
  isVisible: boolean
  onClose: () => void
}

// const MOCK_TRAINEE = [
//   {
//     icon_url: "https://media-cdn.tripadvisor.com/media/photo-s/11/c2/ee/c9/dfsdf.jpg",
//     full_name: "dsada asda",
//     registered: true
//   },
//   {
//     icon_url: "https://media-cdn.tripadvisor.com/media/photo-s/11/c2/ee/c9/dfsdf.jpg",
//     full_name: "dsada asda",
//     registered: false
//   },
// ];

const EventInfo: React.FC<EventInfoProps> = ({ eventType, event, style, className, isVisible, onClose }) => {
  const [isEditIventVisible, setIsEditEventVisible] = React.useState(false)
  const [isCancelEventVisible, setIsCancelEventVisible] = React.useState(false)
  const [isTraineesListVisible, setIsTraineesListVisible] = React.useState(false)

  const { collection: trainerProfile } = useSingleTrainerStudio({
    trainer_id: eventType === 'event' ? event.private_instructor : event.group_instructor,
  })
  const { collection: room } = useSingleRoom({ room_id: eventType === 'event' ? event.private_room : event.group_room })

  const renderGroupBody = () => (
    <div className={styles.body}>
      <div className={styles.spacerLine} />
      <div className={styles.svg}>
        {trainerProfile.name}
        <ProfileIcon />
      </div>
      <div className={styles.svg}>
        {room?.name_of_room || event?.group_room}
        <LocationIcon />
      </div>
      <div className={styles.svg}>
        {`${
          event.group_type_of_studying
            ? TYPES_OF_TRAININGS.filter(training => training._id.toString() === event?.group_type_of_studying)[0]?.label
                .localization.he
            : ''
        }`}
        <TrainingIcon />
      </div>
      <div aria-hidden className={styles.svg} onClick={() => setIsTraineesListVisible(!isTraineesListVisible)}>
        <Chevron direction={isTraineesListVisible ? 'up' : 'down'} />
        {`${event.group_trainees.length}/${event.group_number_of_partipiciants}`}
        <ParticipantsIcon />
      </div>
      {isTraineesListVisible && (
        <div className={styles.traineesList}>
          {event.group_trainees.map((trainee: any) =>
            trainee.registered ? (
              <div className={styles.traineeRegistered}>
                {trainee.full_name}
                <img src={trainee.icon_url} alt="trainee" />
              </div>
            ) : (
              <div className={styles.traineeWaitlist}>
                {trainee.full_name}
                <img src={trainee.icon_url} alt="trainee" />
              </div>
            ),
          )}
        </div>
      )}
      {event.group_weekly_repeat ?? (
        <div className={styles.svg}>
          חזרה שבועית`
          <ReoccuringIcon />
        </div>
      )}
    </div>
  )

  const renderPrivateBody = () => (
    <div className={styles.body}>
      <div className={styles.spacerLine} />
      <div className={styles.svg}>
        {trainerProfile.name}
        <ProfileIcon />
      </div>
      <div className={styles.svg}>
        {`${event.private_address}`}
        <LocationIcon />
      </div>
      <div className={styles.svg}>
        {`${event.private_trainee}`}
        <TrainingIcon />
      </div>
      <div className={styles.svg}>
        {`${room?.name_of_room || event?.private_room}`}
        <TentIcon />
      </div>
    </div>
  )

  const renderEventIcons = () => (
    <div className={styles.iconsWrapper}>
      <ThrashIcon size={18} onClick={() => setIsCancelEventVisible(true)} />
      <PencilIcon onClick={() => setIsEditEventVisible(true)} size={18} />
    </div>
  )

  return (
    <>
      {eventType === 'availability' && (
        <Modal
          title="אימון קבוצתי"
          subTitle={`${new Date(event.group_date).toLocaleDateString('he', { weekday: 'long' })} ,
            ${new Date(event.group_date).toLocaleDateString('he', { month: 'long' })} 
            ${new Date(event.group_date).getDate()} • ${event.group_finish}-${event.group_start}`}
          style={style}
          className={cls(styles.wrapper, className)}
          visible={isVisible}
          onClose={onClose}
          renderFooter={false}
        >
          {renderEventIcons()}
          {renderGroupBody()}
        </Modal>
      )}
      {eventType === 'event' && (
        <Modal
          title="אימון אישי"
          subTitle={`${new Date(event.private_date).toLocaleDateString('he', { weekday: 'long' })} ,
            ${new Date(event.private_date).toLocaleDateString('he', { month: 'long' })} 
            ${new Date(event.private_date).getDate()} • ${event.private_finish}-${event.private_start}`}
          style={style}
          className={cls(styles.wrapper, className)}
          visible={isVisible}
          onClose={onClose}
          renderFooter={false}
        >
          {renderEventIcons()}
          {renderPrivateBody()}
        </Modal>
      )}
      {eventType === 'event' && (
        <EditPrivateSession isVisible={isEditIventVisible} onClose={() => setIsEditEventVisible(false)} event={event} />
      )}
      {eventType === 'availability' && (
        <EditGroupSession isVisible={isEditIventVisible} onClose={() => setIsEditEventVisible(false)} event={event} />
      )}
      <CancelEvent
        event={event}
        style={{ width: 373 }}
        eventType={eventType}
        isVisible={isCancelEventVisible}
        onClose={() => setIsCancelEventVisible(false)}
      />
    </>
  )
}

export default EventInfo
