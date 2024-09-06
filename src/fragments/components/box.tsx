import React from 'react'
import cls from 'classnames'
import styles from './box.module.scss'

interface Box {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
  color?: 'purple' | 'blue' | 'gray' | 'lightPurple'
}

const Box: React.FC<Box> = ({ className, style, children, color = 'blue' }) => (
  <div
    style={style}
    className={cls(styles.wrapper, className, {
      [styles.blue]: color === 'blue',
      [styles.purple]: color === 'purple',
      [styles.gray]: color === 'gray',
      [styles.lightPurple]: color === 'lightPurple',
    })}
  >
    {children}
  </div>
)

export default Box
