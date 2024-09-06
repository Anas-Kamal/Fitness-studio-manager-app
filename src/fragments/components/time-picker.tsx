import * as React from 'react'
import styles from './date-picker.module.scss'

const TimePicker = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>(
  (props, ref) => {
    return (
      <input
        {...props}
        className={`${styles.wrapper} w-full text-[#8d8d94]`}
        type="time"
        lang="he-IL"
        ref={ref}
      />
    )
  }
)

export default TimePicker
