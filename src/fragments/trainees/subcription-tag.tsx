import React from 'react'
import cls from 'classnames'
import styles from './subcription-tag.module.scss'

interface SubcriptionTagProps {
  className?: string
  style?: React.CSSProperties
  color: 'purple' | 'blue'
  children: React.ReactNode
}

const SubcriptionTag: React.FC<SubcriptionTagProps> = ({ className, style, color, children }) => (
  <div
    style={style}
    className={cls(styles.wrapper, className, {
      [styles.blue]: color === 'blue',
      [styles.purple]: color === 'purple',
    })}
  >
    {children}
  </div>
)

export default SubcriptionTag
