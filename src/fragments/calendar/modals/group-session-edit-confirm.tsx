import React from 'react'
import cls from 'classnames'
import styles from './group-session-edit-confirm.module.scss'
import Modal from '../../form/modal'

interface EditGroupSessionProps {
  className?: string
  style?: React.CSSProperties
  isVisible: boolean
  onClose: () => void
  onAllClick: () => void
  onSingleClick: () => void
}

const EditGroupSessionConfirm: React.FC<EditGroupSessionProps> = ({
  className,
  style,
  onClose,
  onAllClick,
  onSingleClick,
  isVisible,
}) => {
  const handleAllClick = () => {
    onAllClick()
    onClose()
  }

  const handleSingleClick = () => {
    onSingleClick()
    onClose()
  }

  const renderBody = () => (
    <div className={styles.text}>האם ברצונך לבצע את השינויים רק בתאריך זה או בכל התאריכים הקיימים לאימון זה?</div>
  )

  const renderFooter = () => (
    <div className={styles.footer}>
      <button type="button" className={styles.button} style={{ gridArea: 'buttonAll' }} onClick={handleAllClick}>
        שנה את כל האימונים
      </button>
      <button type="button" className={styles.button} style={{ gridArea: 'buttonSingle' }} onClick={handleSingleClick}>
        שנה אימון זה בלבד
      </button>
    </div>
  )

  return (
    <Modal
      title="עריכת אימון קבוצתי קיים"
      style={style}
      className={cls(styles.wrapper, className)}
      visible={isVisible}
      onClose={onClose}
      renderFooter={false}
    >
      <>
        {renderBody()}
        {renderFooter()}
      </>
    </Modal>
  )
}

export default EditGroupSessionConfirm
