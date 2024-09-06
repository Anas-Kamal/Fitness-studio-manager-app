import * as React from 'react'
import cls from 'classnames'
import styles from './checkbox.module.scss'

export interface ToggleProps {
  className?: string
  on?: boolean
  onChange?: (nextState: boolean) => void
  disabled?: boolean
}

const CheckBox = React.forwardRef<HTMLButtonElement, ToggleProps>((props, ref) => {
  const { on = false, disabled, onChange = () => null, className } = props

  return (
    <button
      type="button"
      className={cls(styles.wrapper, className, {
        [styles.on]: on,
        [styles.disabled]: disabled,
      })}
      onClick={() => (!disabled ? onChange(!on) : null)}
      ref={ref}
    >
      <div className={styles.fill} />
    </button>
  )
})

export default CheckBox
