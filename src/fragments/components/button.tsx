import * as React from 'react'
import cls from 'classnames'
import styles from './button.module.scss'
import Preloader from '../../icons/preloader'

export interface ButtonProps {
  /**
   * Allows extending button container styles with a custom class name
   */
  className?: string

  /**
   * Allows passing style properties directly to button
   */
  style?: React.CSSProperties

  /**
   * Indicates the style of the button
   */
  type?: 'gray' | 'event' | 'white'

  /**
   * Indicates html button type
   *
   * Useful for form manipulation
   *
   * @default button
   */
  htmlType?: 'button' | 'submit' | 'reset'

  /**
   * Show preloader and disable button
   */
  loading?: boolean

  /**
   * Indicates whether button is in disabled state
   *
   * NOTE: The button would not react to onClick event if it's in disabled state
   *
   * @default false
   */
  disabled?: boolean

  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void

  /**
   * Usually a string containing text to render
   */
  children: React.ReactNode
}

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof ButtonProps>
>((props, ref) => {
  const {
    className,
    style,
    type = 'event',
    htmlType = 'button',
    disabled = false,
    loading = false,
    onClick = () => null,
    children,
    ...rest
  } = props

  return (
    <button
      style={style}
      className={cls(styles.button, className, {
        [styles.white]: type === 'white',
        [styles.gray]: type === 'gray',
        [styles.event]: type === 'event',
      })}
      onClick={event => !disabled && onClick(event)}
      disabled={disabled || loading}
      // eslint-disable-next-line react/button-has-type
      type={htmlType}
      ref={ref}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {loading ? <Preloader className={styles.preloader} /> : null}
      {children}
    </button>
  )
})

export default Button
