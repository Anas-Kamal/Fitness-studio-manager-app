import * as React from 'react'
import cls from 'classnames'
import styles from './avatar.module.scss'

export interface AvatarProps {
  className?: string
  style?: React.CSSProperties
  fullName?: string
  image?: string | React.ReactNode
  loading?: boolean
  onClick?: () => void
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const { className, image, style, fullName, loading, onClick } = props

  const userCredential = fullName
    ? fullName
        .split(/\s/g)
        .slice(0, 2)
        .map(p => p[0].toUpperCase())
        .join('')
    : ''

  const renderImage = () => (typeof image === 'string' ? <img src={image} alt={fullName} /> : image)

  const avatar = (
    <div
      ref={ref}
      className={cls(styles.wrapper, {
        [styles.loading]: loading,
      })}
    >
      <div
        ref={ref}
        style={style}
        className={cls(styles.avatar, className, {
          [styles.clickable]: !!onClick,
        })}
      >
        {image ? renderImage() : userCredential}
      </div>
    </div>
  )

  if (onClick) {
    return React.cloneElement(avatar, {
      role: 'button',
      tabIndex: 0,
      onClick,
    })
  }

  return avatar
})

export default Avatar
