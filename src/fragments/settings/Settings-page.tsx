import React, { useEffect } from 'react'
import cls from 'classnames'
import styles from './settings.module.scss'
import Chevron from '../../icons/chevron'
import Search from '../../icons/search'
import ProfileSettingPage from './ProfileSettingPage'
import SystemSettingPage from './SystemSettingPage'
import PricelistSettingPage from './PricelistSettingPage'
import PaymentAndSubscriptionPage from './PaymentAndSubscriptionPage'
import PriceSellerSettingPage from './PriceSellerPage'
import { useLocation, useNavigate } from 'react-router-dom'
interface TrainingsProps {
  className?: string
  style?: React.CSSProperties
}

const Settingspage: React.FC<TrainingsProps> = ({ className, style }) => {
  const tableState = ['profile', 'system', 'pricelist','payment&subscription', 'priceSeller']
  const {state} = useLocation()
  const [isEventModalOpen, setIsEventModalOpen] = React.useState(false)
  const [isCourseModalOpen, setIsCourseModalOpen] = React.useState(false)
  const [isCreateModalVisible, setCreateModalVisible] = React.useState<boolean>(false)
  const [tableStateView, setTableStateView] = React.useState(tableState[0])

  const handleClick = () => {}

  const handleCourseClick = () => {}

  useEffect(() => {
    // console.log(state)
    if(state?.openseller){
      // console.log(state.openseller)
      setTableStateView(tableState[4])
    }
  }, [state])

  return (
    <div style={style} className={cls(styles.wrapper, className)}>
      <header>

      </header>
      <main>
        <div className={styles.tableHeader}>
          <p className="font-bold">הגדרות</p>
          <span>
          <button
              type="button"
              className={cls({ [styles.active]: tableStateView === tableState[3] })}
              onClick={() => setTableStateView(tableState[3])}>
              תשלומים ומנויים{' '}
            </button>
            {/* <button
              type="button"
              className={cls({ [styles.active]: tableStateView === tableState[2] })}
              onClick={() => setTableStateView(tableState[2])}>
              מחירון{' '}
            </button> */}
            <button
              type="button"
              className={cls({ [styles.active]: tableStateView === tableState[1] })}
              onClick={() => setTableStateView(tableState[1])}>
              מערכת
            </button>
            <button
              type="button"
              className={cls({ [styles.active]: tableStateView === tableState[4] })}
              onClick={() => setTableStateView(tableState[4])}>
              מוכר מחיר
            </button>
            <button
              type="button"
              className={cls({ [styles.active]: tableStateView === tableState[0] })}
              onClick={() => setTableStateView(tableState[0])}>
              פרופיל
            </button>

          </span>
        </div>


        <div
          style={{
            display: 'flex',
            flexDirection:"column",
            alignItems:"end",
            border: '1px solid #F4F4F4',
            borderRadius: 16,
            padding: '20px 20px',
            margin: '20px 20px',
            width: '90%',
            height:'100vh',
            overflowY:"auto",
            marginInline: 'auto'
          }}>
          {tableStateView === tableState[0] && <ProfileSettingPage/>}
          {tableStateView === tableState[4] && <PriceSellerSettingPage/>}
          {tableStateView === tableState[1] && <SystemSettingPage/>}
          {tableStateView === tableState[2] && <PricelistSettingPage/>}
          {tableStateView === tableState[3] && <PaymentAndSubscriptionPage/>}
        </div>
      </main>
    </div>
  )
}

export default Settingspage
