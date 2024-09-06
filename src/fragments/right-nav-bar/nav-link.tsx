import React from 'react'
import cls from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import styles from './nav-bar.module.scss'
import { ROUTES } from '../../lib/constants'

interface NavLinkProps {
  className?: string
  to: string
  style?: React.CSSProperties
  children?: any
}

const NavLink: React.FC<NavLinkProps> = ({ className, style, to = ROUTES.CALENDAR, children }): JSX.Element => {
  const { pathname } = useLocation()
  return (
    <Link to={to} style={style} className={cls(styles.link, className, { [styles.active]: pathname === to })}>
      {children && children}
    </Link>
  )
}

export default NavLink
