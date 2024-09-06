import React from 'react'
import cls from 'classnames'
import styles from './trainings.module.scss'
import CreateEvent from '../calendar/modals/create-event'
import Chevron from '../../icons/chevron'
import Search from '../../icons/search'
import GroupTable from './group-table'
import CreateCourse from './modals/course-creation'
import CourseTable from './course-table'
import PrivateTable from './private-table'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../features/auth'
import { ROUTES } from '../../lib/constants'
import CreateSellerModal from '../create-seller/create-seller-modal'

interface TrainingsProps {
  className?: string
  style?: React.CSSProperties
}
const tableState = ['group', 'private', 'courses']
const Trainings: React.FC<TrainingsProps> = ({ className, style }) => {
  //   const [page, setPage] = React.useState(1)
  //   const [rowFilter, setRowFilter] = React.useState<string>()
  const [isEventModalOpen, setIsEventModalOpen] = React.useState(false)
  const [isCourseModalOpen, setIsCourseModalOpen] = React.useState(false)
  const [isCreateModalVisible, setCreateModalVisible] = React.useState<boolean>(false)

  const [tableStateView, setTableStateView] = React.useState(tableState[0])
  const navigate = useNavigate()
  const { profile } = useAuth()
  const handleClick = () => {
    // if (!profile?.seller?._id || !profile.sellerKey || profile.sellerKey === '' || profile.sellerKey === 'undefined') {
    //   setCreateModalVisible(true)
    // } else {
      setIsEventModalOpen(true)
    // }
  }

  const handleCourseClick = () => {
    // if (!profile.sellerKey || profile.sellerKey === '' || profile.sellerKey === 'undefined') {
    //   setCreateModalVisible(true)
    // } else {
    setIsCourseModalOpen(true)
    // }
  }
  return (
    <div style={style} className={cls(styles.wrapper, className)}>
      <header>
        <div>
          <button type="button" onClick={() => handleClick()}>
            יצירת אימון
          </button>
          <button type="button" onClick={() => handleCourseClick()}>
            יצירת קורס
          </button>
        </div>
      </header>
      <main>
        <div className={styles.tableHeader}>
          <span>
            <span>
              <Chevron direction="down" />
              11/2022
            </span>
            <span>הזן מילת חיפוש</span>
            <Search />
          </span>
          <span>
            <button
              type="button"
              className={cls({ [styles.active]: tableStateView === tableState[2] })}
              onClick={() => setTableStateView(tableState[2])}>
              קורסים
            </button>
            <button
              type="button"
              className={cls({ [styles.active]: tableStateView === tableState[0] })}
              onClick={() => setTableStateView(tableState[0])}>
              שיעורים קבוצתיים
            </button>
            <button
              type="button"
              className={cls({ [styles.active]: tableStateView === tableState[1] })}
              onClick={() => setTableStateView(tableState[1])}>
              אימונים אישיים
            </button>
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            border: '1px solid #F4F4F4',
            borderRadius: 16,
            padding: '20px 20px',
            margin: '20px 20px',
            width: '90%',
            marginInline: 'auto'
          }}>
          {tableStateView === tableState[0] && <GroupTable />}
          {tableStateView === tableState[1] && <PrivateTable />}
          {tableStateView === tableState[2] && <CourseTable />}
        </div>
      </main>
      <CreateEvent isVisible={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} />
      <CreateCourse
        isVisible={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        style={{ width: 695 }}
      />
      <CreateSellerModal
        visible={isCreateModalVisible}
        style={{ width: 411 }}
        onClose={() => setCreateModalVisible(false)}
      />
    </div>
  )
}

export default Trainings
