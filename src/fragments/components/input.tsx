
import * as React from 'react'
import cls from 'classnames'
import Close from '../../icons/close'
import styles from './input.module.scss'

export interface InputProps {
  /**
   * Allows extending input container styles with custom class name
   */
  className?: string

  /**
   * Allows passing style properties directly to input container
   */
  style?: React.CSSProperties

  /**
   * Indicates whether the input is disabled
   *
   * @default false
   */
  disabled?: boolean

  /**
   * Show a clear button at the end of the input container
   *
   * @default false
   */
  allowClear?: boolean

  /**
   * Indicates whether or not input has error
   *
   * @default false
   */
  hasError?: boolean

  /**
   * Renders an input icon element
   *
   * Can be used to add icon.
   */
  icon?: React.ReactNode

  /**
   * Renders label above input
   */
  label?: React.ReactNode

  /**
   * Renders caption under input
   */
  caption?: React.ReactNode

  inputStyle?: React.CSSProperties
}

export const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & Omit<React.ComponentPropsWithoutRef<'input'>, keyof InputProps>
>((props, forwardRef) => {
  const {
    className,
    style,
    disabled = false,
    required = false,
    allowClear = false,
    hasError = false,
    inputStyle,
    icon,
    label,
    caption,
    ...rest
  } = props

  const [focused, setFocused] = React.useState(false)

  const inputRef = React.useRef<HTMLInputElement>(null)

// @ts-ignore
  React.useImperativeHandle(forwardRef, () => inputRef.current)

  return (
    <div className={cls(styles.wrapper, className)}>
      {label && (
        <span className={styles.label}>
          {label} {required && <span>*</span>}
        </span>
      )}

      <span
        className={cls(styles.input_wrapper, {
          [styles.focused]: focused,
          [styles.disabled]: disabled,
        })}
        style={style}
      >
        {icon && <span className={styles.icon}>{icon}</span>}

        <input
          {...rest}
          ref={inputRef}
          disabled={disabled}
          style={inputStyle}
          onFocus={event => {
            setFocused(true)
            if (props.onFocus) {
              props.onFocus(event)
            }
          }}
          onBlur={event => {
            setFocused(false)
            if (props.onBlur) {
              props.onBlur(event)
            }
          }}
        />

        {allowClear &&
          React.cloneElement(<Close />, {
            role: 'button',
            className: styles.allow_clear,
            onClick: (event: React.ChangeEvent<HTMLInputElement>) => {
              if (inputRef.current) {
                inputRef.current.value = ''
              }

              if (props.onChange) {
                props.onChange({
                  ...event,
                  target: { ...event.target, value: '' },
                  currentTarget: { ...event.target, value: '' },
                })
              }
            },
          })}
      </span>

      {caption && (
        <span
          className={cls(styles.caption, {
            [styles.with_error]: hasError,
          })}
        >
          {caption}
        </span>
      )}
    </div>
  )
})
