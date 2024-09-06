import React from 'react'
import cls from 'classnames'
import styles from './otp-input.module.scss'

interface OtpInputProps {
  className?: string
  style?: React.CSSProperties
  handleInputFocus: any
  handleKeyDown?: any
}

const OtpInput = React.forwardRef<
  HTMLInputElement,
  OtpInputProps & Omit<React.ComponentPropsWithoutRef<'input'>, keyof OtpInputProps>
>((props, forwardRef) => {
  const { style, className, handleKeyDown, handleInputFocus, tabIndex, ...rest } = props
  return (
    <input
      ref={forwardRef}
      style={style}
      className={cls(styles.wrapper, className)}
      type="text"
      inputMode="numeric"
      autoComplete="one-time-code"
      pattern="\d{1}"
      maxLength={1}
      value={rest.value}
      {...rest}
      tabIndex={tabIndex}
      onKeyDown={handleKeyDown}
      onKeyUp={handleInputFocus}
    />
  )
})

export default OtpInput
