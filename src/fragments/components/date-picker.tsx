import * as React from 'react'
import styles from './date-picker.module.scss'

const DatePicker = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>(
  (props, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <input
      {...props}
      className={styles.wrapper + ' w-full text-[#8d8d94]'}
      type="date"
      lang="he-IL"
      max={
        new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
      }
      min={new Date().toISOString().split('T')[0]}
      ref={ref}
    />
  )
)

export default DatePicker
