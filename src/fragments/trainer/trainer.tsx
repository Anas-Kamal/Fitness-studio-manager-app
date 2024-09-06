import React from 'react'
import cls from 'classnames'
import styles from './trainer.module.scss'
import AddContact from '../../icons/add-contact'
import Search from '../../icons/search'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../features/auth'
import { ROUTES } from '../../lib/constants'

interface Trainer {
  className?: string
  style?: React.CSSProperties
  openModal: () => void
  openSellerModal: () => void
}

const Trainer: React.FC<Trainer> = ({ className, style, openModal, openSellerModal }) => {
  const navigate = useNavigate()
  const { profile } = useAuth()
  const handleClick = () => {
    openModal()
  }
  return (
    <div style={style} className={cls(styles.wrapper, className)}>
      <div>
        <AddContact onClick={handleClick} />

        <div>
          <span>לחץ על מנת לחפש מאמן</span>
          <Search />

          <span>מאמנים</span>
        </div>
      </div>
    </div>
  )
}

export default Trainer
