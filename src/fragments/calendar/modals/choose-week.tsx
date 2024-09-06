import React from 'react'
import cls from 'classnames'
// @ts-ignore
import WeekPicker from 'react-datepicker'
import styles from './choose-week.module.scss'
import Modal from '../../form/modal'
import 'react-datepicker/dist/react-datepicker.css'

interface ChooseWeekProps {
  style?: React.CSSProperties
  className?: string
  isVisible: boolean
  onClose: () => void
}

const ChooseWeek: React.FC<ChooseWeekProps> = ({ style, className, isVisible, onClose }) => (
  <Modal
    title=""
    subTitle=""
    style={style}
    className={cls(styles.wrapper, className)}
    visible={isVisible}
    onClose={onClose}
    renderFooter={false}
  >
{/*  @ts-ignore */}
    <WeekPicker className={styles.weekPicker} inline />
  </Modal>
)

export default ChooseWeek
