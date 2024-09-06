/* eslint-disable react/no-unused-prop-types */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import cls from 'classnames'
import styles from './modal.module.scss'
import Alert from './alert'
import Close from '../../icons/close'

export interface ModalProps {
  className?: string
  style?: React.CSSProperties
  footerStyle?: React.CSSProperties
  rendertitle?: boolean ,
  showCross?:boolean,
  renderSubtitle?: boolean,
  visible?: boolean
  title?: string
  subTitle?: string
  loading?: boolean
  error?: string
  isSubmitDisabled?: boolean

  bodyEl?: 'div' | 'form'

  closeTitle?: string
  onClose?: () => void
  okTitle?: string
  onOk?: () => void
  renderFooter?: boolean
  footerStyles?: string

  /**
   * Disable focus trap
   *
   * Certain components may create elements outside of modal, e.g. Google Autocomplete uses portals
   * to create elements in body.
   *
   * Focus trap may break such components. While not ideal for the accessibility, this is short and easy way
   * to fix those issues.
   */
  disableFocusTrap?: boolean

  children?: React.ReactNode
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const {
    className,
    style,
    visible,
    showCross=true,
    renderFooter = true,
    okTitle = 'Ok',
    error,
    children,
    onOk = () => null,
    bodyEl = 'div',
    onClose = () => null,
    title,
    rendertitle = true,
    renderSubtitle = true,
    subTitle,
    footerStyles,
    isSubmitDisabled = false,
    footerStyle,
  } = props

  const BodyEl = bodyEl

  const wrapperRef = React.createRef<HTMLDivElement>()

  const renderModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.125 }}
      className={styles.wrapper}
      ref={wrapperRef}
    >
      <motion.div
        className={styles.modal}
        style={style}
        initial={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        ref={ref}
      >
      {showCross &&   <Close style={{ cursor: 'pointer' }} onClick={onClose} />}
       {(rendertitle || renderSubtitle) && <div className={styles.header}>
          <div>
            {rendertitle && <span className={styles.title}>{title}</span>}
          </div>
          {renderSubtitle && <span>{subTitle}</span>}
        </div>} 

        <BodyEl className={cls(styles.body, className)}>
          {children}

          {error ? <Alert>{error}</Alert> : null}
        </BodyEl>

        {renderFooter ? (
          <div className={cls(styles.footer, footerStyles)} style={footerStyle}>
            <button type="button" disabled={isSubmitDisabled} onClick={onOk}>
              {okTitle}
            </button>
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  )

  return ReactDOM.createPortal(<AnimatePresence>{visible ? renderModal() : null}</AnimatePresence>, document.body)
})

export default Modal
