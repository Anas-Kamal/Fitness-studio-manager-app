import React from 'react'
import cls from 'classnames'
import { add, format, startOfWeek } from 'date-fns'
import heLocale from 'date-fns/locale/he'
import DonutChart from 'react-donut-chart'
import styles from './trainer.module.scss'
import Marker from '../../icons/marker'
import Table, { Ordering } from '../components/table'
import Chevron from '../../icons/chevron'
import Avatar from '../components/avatar'
import Box from '../components/box'
import { useSingleTrainerStudio } from '../../features/trainer'
import EditTrainerModal from './modals/edit-trainer'
import AddTrainingsModal from './modals/add-trainings'
import useCalendarGroupSession from '../../features/calendar-groups-sessions'
import useCalendarPrivateSession from '../../features/calendar-private-session'
import useAuth from '../../features/auth'
import EditTimeModal from './modals/edit-time'

interface Trainer {
  className?: string
  style?: React.CSSProperties
  trainerId: string
}

const WEEK_RANGE = [0, 1, 2, 3, 4, 5, 6]

const TrainerProfilePage: React.FC<Trainer> = ({ className, style, trainerId }) => {
  const [range] = React.useState(WEEK_RANGE)

  // const [page, setPage] = React.useState(1)
  // const [rowFilter, setRowFilter] = React.useState<string>()
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false)
  const [isAddTrainingsModalVisible, setIsAddTrainingsModalVisible] = React.useState<boolean>(false)
  const [isEditTimeModalVisible, setIsEditTimeModalVisible] = React.useState(false)

  const [orderKey, setOrderKey] = React.useState<string | null>('created_at')
  const [orderDirection, setOrderDirection] = React.useState<Ordering>('desc')

  const { profile } = useAuth()
  const { collection: trainerProfile } = useSingleTrainerStudio({ trainer_id: trainerId })
  const { collection: groupCollection } = useCalendarGroupSession({
    studio_id: profile?._id || undefined,
    trainer_id: trainerId
  })
  const { collection: privateCollection } = useCalendarPrivateSession({
    studio_id: profile?._id || undefined,
    trainer_id: trainerId
  })
  React.useEffect(() => {}, [])

  const getFormattedGroupSessions = () =>
    groupCollection.map((session) => ({
      location: session.group_room,
      amount_of_training: session.group_amount_of_trainings,
      hour: session.group_start,
      date: session.group_date,
      type_of_training: session.group_name_of_trainings
    }))

  const getFormattedPrivateSessions = () =>
    privateCollection.map((session) => ({
      location: session.private_address,
      amount_of_training: session.private_amount_of_trainings,
      hour: session.private_start,
      date: session.private_date,
      type_of_training: session.private_name_of_trainings
    }))

  const renderHeader = () => (
    <div className={styles.header}>
      <span>פרטי המדריך</span>
    </div>
  )

  const UserData = ({ data }) => {
    return (
      <>
        <span>{data.created_at} ת. הצטרפות</span>
        <span>{data.date_of_last_training} ת. אימון אחרון</span>
        <span>{data.phone} :טלפון</span>
        <span>{data.sex === 'male' ? 'זכר' : 'נקבה'} :מגדר</span>
        <span>{data.birthday_date} :תאריך לידה</span>
      </>
    )
  }

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
            isFilter: true

            // render: ({ amount_of_trainings }) => amount_of_trainings
          },
          {
            isFilter: true,

            style: { width: '15%' },
            title: 'מיקום',
            render: ({ location }) => location
          },
          {
            isFilter: true,

            style: { width: '15%' },
            title: 'כמות מתאמנים',
            render: ({ amount_of_training }) => amount_of_training
          },
          {
            isFilter: true,

            style: { width: '15%' },
            title: 'שעה',
            render: ({ hour }) => hour
          },
          {
            isFilter: true,

            style: { width: '15%' },
            title: 'תאריך',
            render: ({ date }) => date
          },
          {
            isFilter: true,

            style: { width: '15%' },
            title: 'סוג אימון',
            render: ({ type_of_training }) => type_of_training
          }
        ]}
        data={[...getFormattedGroupSessions(), ...getFormattedPrivateSessions()]}
      />
    </div>
  )
  console.log('PROFILE', trainerProfile)
  const s = true
  const renderStatistics = () => (
    <div className={styles.statistics}>
      <Box color="purple" className={styles.profile}>
        <div>
          <Marker onClick={() => setIsModalVisible(true)} />
          {trainerProfile._id ? (
            <div>
              <span>{trainerProfile.name}</span>
              <Avatar fullName={trainerProfile.name} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div>
          {
            trainerProfile && <UserData data={trainerProfile} />
            // : (
            //   <div>No Data Found</div>
            // )
          }
        </div>

        <div>
          <div className={styles.smallItem}>sad</div>
          <div className={styles.smallItem}>sad</div>
        </div>
      </Box>

      {!s ? (
        <Box color="gray" className={styles.activityBox}>
          <span>שעות פעילות</span>
          <div>
            לא הוגדרו שעות פעילות עבור מדריך זה. על מנת להגדיר את שעות הפעילות <span>לחצו כאן</span>
          </div>
        </Box>
      ) : (
        <Box color="gray" className={styles.scheduleBox}>
          <div>
            <Marker onClick={() => setIsEditTimeModalVisible(true)} />
            <span>שעות פעילות</span>
          </div>
          {range.length > 0 ? (
            range.map((dayIdx) => {
              const date = add(startOfWeek(new Date()), { days: dayIdx })

              return (
                <div key={dayIdx} className={cls(styles.day)}>
                  <span />
                  <span />

                  <span>{format(date, 'EEEE', { locale: heLocale }).split(' ')[1]}</span>
                </div>
              )
            })
          ) : (
            <p>No Data found</p>
          )}
        </Box>
      )}
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
            { label: 'עתידיים', value: 25 }
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
      <EditTrainerModal
        visible={isModalVisible}
        trainer={trainerProfile}
        onClose={() => setIsModalVisible(false)}
      />
      <AddTrainingsModal
        visible={isAddTrainingsModalVisible}
        trainer={trainerProfile}
        onClose={() => setIsAddTrainingsModalVisible(false)}
      />
      <EditTimeModal
        visible={isEditTimeModalVisible}
        trainerId={trainerId}
        onClose={() => setIsEditTimeModalVisible(false)}
        style={{ width: 716 }}
      />
    </div>
  )
}

export default TrainerProfilePage
