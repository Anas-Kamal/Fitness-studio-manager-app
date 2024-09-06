import React from 'react'
import cls from 'classnames'
import styles from './add-trainee.module.scss'
import Modal from '../../form/modal'

interface AddTraineeProps {
  className?: string
  style?: React.CSSProperties
  visible: boolean
  onClose: () => void
}

const AddTraineeSuccessModal: React.FC<AddTraineeProps> = ({ className, style, onClose, visible }) => {
  const renderSuccessBody = () => <div className={cls(styles.success, className)}>המתאמן נוסף בהצלחה!</div>

  return (
    <Modal
      style={style}
      className={className}
      onClose={onClose}
      visible={visible}
      title=""
      subTitle=""
      renderFooter={false}
    >
      {renderSuccessBody()}
    </Modal>
  )
}

export default AddTraineeSuccessModal
