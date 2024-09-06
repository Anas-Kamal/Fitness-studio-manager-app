import React from 'react'
import cls from 'classnames'
import styles from './event-cancel-success.module.scss'
import Modal from '../../form/modal'

interface CancelEventSuccessInputProps {
  className?: string
  style?: React.CSSProperties
  isVisible: boolean
  onClose: () => void
}

const CancelEventSuccess: React.FC<CancelEventSuccessInputProps> = ({ onClose, isVisible, className, style }) => {
  const renderBody = () => (
    <div className={styles.body}>
      <div>האימון בוטל בהצלחה!</div>
      <div>הודעה נשלחה אל משתתפים</div>
      <button type="button" onClick={() => onClose()} className={styles.editButton}>
        סיום
      </button>
    </div>
  )

  return (
    <Modal
      style={style}
      className={cls(styles.wrapper, className)}
      visible={isVisible}
      onClose={onClose}
      onOk={onClose}
      renderFooter={false}
      okTitle="שמירה"
    >
      {renderBody()}
    </Modal>
  )
}

export default CancelEventSuccess
