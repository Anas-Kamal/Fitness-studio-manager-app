/* eslint-disable no-underscore-dangle */import React,{Fragment} from 'react';import cls from 'classnames'
import { motion } from 'framer-motion'
import { endOfWeek, startOfWeek } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../lib/constants'
import Loader from '../../fragments/components/loader'
import Calendar, { Event } from '../../fragments/calendar'
import PageContainer from '../../fragments/components/page-container'
import LeftNotifications from '../../fragments/left-notifications/left-notifications'
import CalendarHeader from '../../fragments/calendar/calendar-header'
import useCalendarPrivateSession from '../../features/calendar-private-session'
import useAuth from '../../features/auth'
import useCalendarGroupSession from '../../features/calendar-groups-sessions'
import { GroupSessionType, PrivateSessionType } from '../../features/api-types'
import EventInfo from '../../fragments/calendar/modals/event-info'
import CreateSellerModal from '../../fragments/create-seller/create-seller-modal'
import { Col, Row } from 'reactstrap'
import useResizeObserver from '../../hooks/resize-observer'

interface CalendarPageProps {
  className?: string
  style?: React.CSSProperties
}
const AnimatedEvent = motion(Event)

const CalendarPageLayout: React.FC<CalendarPageProps> = ({ className, style }) => {
  const navigate = useNavigate()
  const [aroundDate, setAroundDate] = React.useState<Date>(startOfWeek(new Date()))
  const [isPrivateInfoModalOpen, setIsPrivateInfoModalOpen] = React.useState(false)
  const [isGroupInfoModalOpen, setIsGroupInfoModalOpen] = React.useState(false)
  const [selectedEvent, setSelectedEvent] = React.useState<GroupSessionType | PrivateSessionType>()
  const { isAuthenticated, loadUserProfile, isLoading } = useAuth()

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN)
    }
  }, [isAuthenticated])

  React.useEffect(() => {
    loadUserProfile()
  }, [])
  const observer = useResizeObserver()
  const { profile } = useAuth()

  const { collection: groupCollection } = useCalendarGroupSession({
    studio_id: profile?._id || undefined
  })
  const { collection: privateCollection } = useCalendarPrivateSession({
    studio_id: profile?._id || undefined
  })

  const handleGroupEventClick = (event: GroupSessionType | PrivateSessionType) => {
    setSelectedEvent(event)
    setIsGroupInfoModalOpen(true)
  }

  const handlePrivateEventClick = (event: GroupSessionType | PrivateSessionType) => {
    setSelectedEvent(event)
    setIsPrivateInfoModalOpen(true)
  }

  if (isLoading) return <Loader />

  return (
    <div style={style} className={cls(className)}>
      <PageContainer>
        <Row>
          {/* {observer < 1220 || observer < 1100 || observer < 768 ? (
            <Fragment>
              <Col md={12}>
                <LeftNotifications />
              </Col>
              <Col md={12}>
                <CalendarHeader />
                <Calendar
                  notAfter={endOfWeek(aroundDate)}
                  notBefore={startOfWeek(aroundDate)}
                  aroundDate={aroundDate}
                  onAnchorChange={(date) => setAroundDate(date)}>
                  {groupCollection.length > 0 &&
                    groupCollection.map((group, idx) => (
                      <AnimatedEvent
                        id={group?._id}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * idx }}
                        key={group?._id}
                        type="availability"
                        title={group?.group_name_of_trainings}
                        from={new Date([group?.group_date, group?.group_start].join(':'))}
                        to={new Date([group?.group_date, group?.group_finish].join(':'))}
                        isAddress={!!group?.group_address}
                        room={group?.group_room}
                        address={group?.group_address}
                        amount_of_partipiciants={group?.group_trainees.length}
                        onClick={() => handleGroupEventClick(group)}
                      />
                    ))}
                  {privateCollection.length > 0 &&
                    privateCollection.map((privateEvent, idx) => (
                      <AnimatedEvent
                        id={privateEvent._id}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * idx }}
                        key={privateEvent._id}
                        type="event"
                        title={privateEvent.private_name_of_trainings}
                        from={
                          new Date(
                            [privateEvent.private_date, privateEvent.private_start].join(':')
                          )
                        }
                        to={
                          new Date(
                            [privateEvent.private_date, privateEvent.private_finish].join(':')
                          )
                        }
                        isAddress={!!privateEvent.private_address}
                        room={privateEvent.private_room}
                        address={privateEvent.private_address}
                        onClick={() => handlePrivateEventClick(privateEvent)}
                      />
                    ))}
                </Calendar>
              </Col>
            </Fragment>
          ) : ( */}
          <Fragment>
            <Col xm={12} sm={12} md={12} lg={3}>
              <LeftNotifications />
            </Col>
            <Col xm={12} sm={12} md={12} lg={9}>
              <CalendarHeader />
              <Calendar
                notAfter={endOfWeek(aroundDate)}
                notBefore={startOfWeek(aroundDate)}
                aroundDate={aroundDate}
                onAnchorChange={(date) => setAroundDate(date)}>
                {groupCollection.length > 0 &&
                  groupCollection.map((group, idx) => (
                    <AnimatedEvent
                      id={group?._id}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * idx }}
                      key={group?._id}
                      type="availability"
                      title={group?.group_name_of_trainings}
                      from={new Date([group?.group_date, group?.group_start].join(':'))}
                      to={new Date([group?.group_date, group?.group_finish].join(':'))}
                      isAddress={!!group?.group_address}
                      room={group?.group_room}
                      address={group?.group_address}
                      amount_of_partipiciants={group?.group_trainees.length}
                      onClick={() => handleGroupEventClick(group)}
                    />
                  ))}
                {privateCollection.length > 0 &&
                  privateCollection.map((privateEvent, idx) => (
                    <AnimatedEvent
                      id={privateEvent._id}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * idx }}
                      key={privateEvent._id}
                      type="event"
                      title={privateEvent.private_name_of_trainings}
                      from={
                        new Date([privateEvent.private_date, privateEvent.private_start].join(':'))
                      }
                      to={
                        new Date([privateEvent.private_date, privateEvent.private_finish].join(':'))
                      }
                      isAddress={!!privateEvent.private_address}
                      room={privateEvent.private_room}
                      address={privateEvent.private_address}
                      onClick={() => handlePrivateEventClick(privateEvent)}
                    />
                  ))}
              </Calendar>
            </Col>
          </Fragment>
          {/* )} */}

          {/* <Col md={3}>
            {' '}
            <LeftNotifications />
          </Col>
          <Col md={9}>
            <CalendarHeader />
            <Calendar
              notAfter={endOfWeek(aroundDate)}
              notBefore={startOfWeek(aroundDate)}
              aroundDate={aroundDate}
              onAnchorChange={(date) => setAroundDate(date)}>
              {groupCollection.length > 0 &&
                groupCollection.map((group, idx) => (
                  <AnimatedEvent
                    id={group?._id}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    key={group?._id}
                    type="availability"
                    title={group?.group_name_of_trainings}
                    from={new Date([group?.group_date, group?.group_start].join(':'))}
                    to={new Date([group?.group_date, group?.group_finish].join(':'))}
                    isAddress={!!group?.group_address}
                    room={group?.group_room}
                    address={group?.group_address}
                    amount_of_partipiciants={group?.group_trainees.length}
                    onClick={() => handleGroupEventClick(group)}
                  />
                ))}
              {privateCollection.length > 0 &&
                privateCollection.map((privateEvent, idx) => (
                  <AnimatedEvent
                    id={privateEvent._id}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    key={privateEvent._id}
                    type="event"
                    title={privateEvent.private_name_of_trainings}
                    from={
                      new Date([privateEvent.private_date, privateEvent.private_start].join(':'))
                    }
                    to={
                      new Date([privateEvent.private_date, privateEvent.private_finish].join(':'))
                    }
                    isAddress={!!privateEvent.private_address}
                    room={privateEvent.private_room}
                    address={privateEvent.private_address}
                    onClick={() => handlePrivateEventClick(privateEvent)}
                  />
                ))}
            </Calendar>
          </Col> */}
        </Row>
        {/* <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <div>

          </div>
        </div> */}
      </PageContainer>
      {isGroupInfoModalOpen && (
        <EventInfo
          style={{ width: 397 }}
          eventType="availability"
          event={selectedEvent}
          isVisible={isGroupInfoModalOpen}
          onClose={() => setIsGroupInfoModalOpen(false)}
        />
      )}
      {isPrivateInfoModalOpen && (
        <EventInfo
          style={{ width: 397 }}
          eventType="event"
          event={selectedEvent}
          isVisible={isPrivateInfoModalOpen}
          onClose={() => setIsPrivateInfoModalOpen(false)}
        />
      )}
    </div>
  )
}

export default CalendarPageLayout
