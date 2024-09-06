import React, { useState } from 'react'
import cls from 'classnames'
import styles from './calendar.module.scss'
import Chevron from '../../icons/chevron'
import CreateEvent from './modals/create-event'
import useAuth from '../../features/auth'
import useStep from '../../hooks/useStep'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../lib/constants'
import CreateSellerModal from '../create-seller/create-seller-modal'

interface CalendarHeaderProps {
  className?: string
  style?: React.CSSProperties
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ className, style }) => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreateModalVisible, setCreateModalVisible] = React.useState<boolean>(false)

  const { profile } = useAuth()
  const handleClick = () => {
    // if (!profile.sellerKey || profile.sellerKey === '' || profile.sellerKey === 'undefined') {
    //   setCreateModalVisible(true)
    // } else {
    setIsModalOpen(true)
    // }
  }
  return (
    <>
      <div style={style} className={cls(styles.headerWrapper, className)}>
        <button type="button" onClick={() => handleClick()}>
          יצירת אימון חדש
        </button>
        <div>
          <Chevron direction="down" />
          <span>כל המאמנים</span>
        </div>
      </div>
      <CreateEvent
        style={{ width: 720 }}
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <CreateSellerModal
        visible={isCreateModalVisible}
        style={{ width: 411 }}
        onClose={() => setCreateModalVisible(false)}
      />
    </>
  )
}

export default CalendarHeader
