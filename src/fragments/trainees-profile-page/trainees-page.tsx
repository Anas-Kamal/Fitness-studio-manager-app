
/* eslint-disable no-underscore-dangle */
import React from 'react'
import cls from 'classnames'
import DonutChart from 'react-donut-chart'
import styles from './trainees.module.scss'
import Marker from '../../icons/marker'
import Table from '../components/table'
import Chevron from '../../icons/chevron'

import Avatar from '../components/avatar'
import Box from '../components/box'
import { useSingleTraineeStudio } from '../../features/trainees'
import useCalendarGroupSession from '../../features/calendar-groups-sessions'
import useCalendarPrivateSession from '../../features/calendar-private-session'
import useAuth from '../../features/auth'

interface TraineesProfilePageProps {
  className?: string
  style?: React.CSSProperties
  traineeId: string
}

// const WEEK_RANGE = [0, 1, 2, 3, 4, 5, 6]

const TraineesProfilePage: React.FC<TraineesProfilePageProps> = ({ className, style, traineeId }) => {
  const { profile } = useAuth()
  const { collection: traineeProfile } = useSingleTraineeStudio({ trainee_id: traineeId })
  const { collection: groupCollection } = useCalendarGroupSession({
    studio_id: profile?._id,
    trainee_id: traineeId,
  })
  const { collection: privateCollection } = useCalendarPrivateSession({
    studio_id: profile?._id,
    trainee_id: traineeId,
  })

  const getFormattedGroupSessions = () =>
    groupCollection.map(session => ({
      location: session.group_room,
      amount_of_training: session.group_amount_of_trainings,
      hour: session.group_start,
      date: session.group_date,
      type_of_training: session.group_name_of_trainings,
    }))

  const getFormattedPrivateSessions = () =>
    privateCollection.map(session => ({
      location: session.private_address,
      amount_of_training: session.private_amount_of_trainings,
      hour: session.private_start,
      date: session.private_date,
      type_of_training: session.private_name_of_trainings,
    }))

  const renderHeader = () => (
    <div className={styles.header}>
      <Marker />
      <span>פרטי מתאמן</span>
    </div>
  )

  const renderTable = () => (
    <div className={styles.table}>
      <div>
        <div>
          <Chevron direction="down" />
          <span>11/2022</span>
        </div>
        <span>הסטוריית אימונם</span>
      </div>
      <Table
        columns={[
          {
            style: { width: '15%' },
            title: 'סטטוס',
            isFilter: true,

            // render: ({ amount_of_trainings }) => amount_of_trainings
          },
          {
            isFilter: true,

            style: { width: '15%' },
            title: 'מיקום',
            render: ({ location }) => location,
          },
          {
            isFilter: true,

            style: { width: '15%' },
            title: 'כמות מתאמנים',
            render: ({ amount_of_training }) => amount_of_training,
          },
          {
            isFilter: true,

            style: { width: '15%' },
            title: 'שעה',
            render: ({ hour }) => hour,
          },
          {
            isFilter: true,

            style: { width: '15%' },
            title: 'תאריך',
            render: ({ date }) => date,
          },
          {
            isFilter: true,

            style: { width: '15%' },
            title: 'סוג אימון',
            render: ({ type_of_training }) => type_of_training,
          },
        ]}
        data={[...getFormattedGroupSessions(), ...getFormattedPrivateSessions()]}
      />
    </div>
  )
  const renderStatistics = () => (
    <div className={styles.statistics}>
      <Box color="lightPurple" className={styles.profile}>
        <div>
          <Marker />
          <div>
            <span>{traineeProfile.full_name}</span>
            <Avatar fullName={traineeProfile.full_name} />
          </div>
        </div>
        <div>
          <span>
            <span>{traineeProfile.created_at}</span> ת. הצטרפות
          </span>
          <span>
            <span>{traineeProfile.date_of_last_training}</span> ת. אימון אחרון
          </span>
          <span>
            <span>{traineeProfile.phone}</span> :טלפון
          </span>
          <span>
            <span>{traineeProfile.email}</span> :אימייל
          </span>
          <span>
            <span>{traineeProfile.sex}</span> :מגדר
          </span>
          <span>
            <span>{traineeProfile.birthday}</span> :תאריך לידה
          </span>
          <span>
            <span>{traineeProfile.address}</span> :כתובת מגורים
          </span>
          <span>
            <span>{traineeProfile.approve_reglament ? 'Yes' : 'No'}</span> :אישור תקנון
          </span>
          <span>
            <span>{traineeProfile.email_confirmed ? 'Yes' : 'No'}</span> :אישור דיוור באימייל
          </span>
          <span>
            <span>{traineeProfile.phone_confirmed ? 'Yes' : 'No'}</span> :אישור דיוור בטלפון
          </span>
        </div>
        <div>
          <div className={styles.smallItem}>כרטיסיית אישיים</div>
          <div className={styles.smallItem}>מנוי חודשי</div>
        </div>
      </Box>
      <Box color="gray" className={styles.activityBox}>
        <span>
          <span>{}</span> :מסמכים רפואיים
        </span>
        <div>
          לא נמצאו מסמכים או אישורים רפואיים. לשליחת בקשה להעלאת אישור רפואי
          <span>לחצו כאן</span>
        </div>
      </Box>
      <Box color="gray">
        <DonutChart
          width={220}
          height={220}
          colors={['#CDCDCD', '#E4DBFF', '#ADD3F4']}
          innerRadius={0.8}
          outerRadius={0.5}
          emptyColor="#fff"
          onMouseEnter={() => null}
          legend={false}
          strokeColor="#fafafa"
          data={[
            { label: 'בוצעו', value: 10 },
            { label: 'בוטלו', value: 55 },
            { label: 'עתידיים', value: 25 },
          ]}
        />
        <div>
          <span className={styles.purple}>בוצעו</span>
          <span className={styles.gray}>בוטלו</span>
          <span className={styles.blue}>עתידיים</span>
        </div>
      </Box>
    </div>
  )
  return (
    <div style={style} className={cls(styles.wrapper, className)}>
      {renderHeader()}

      <section>
        {renderStatistics()}

        {renderTable()}
      </section>
    </div>
  )
}

export default TraineesProfilePage
