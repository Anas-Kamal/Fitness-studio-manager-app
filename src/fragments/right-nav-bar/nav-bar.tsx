import React from 'react'
import cls from 'classnames'
import styles from './nav-bar.module.scss'
import NavLink from './nav-link'
import { NAV_BAR_LINKS } from '../../lib/constants'
import useAuth from '../../features/auth'

interface NavBarProps {
  className?: string
  style?: React.CSSProperties
}

const NavBar: React.FC<NavBarProps> = ({ className, style }) => {
  const { view } = useAuth()
  return (
    <div style={style} className={cls(styles.wrapper, className)}>
      <nav>
        <ul>
          {view &&
            NAV_BAR_LINKS &&
            NAV_BAR_LINKS.filter(({ type }) => type.includes(view)).map(
              ({ children, text, to }): JSX.Element => (
                <NavLink key={to} to={to}>
                  <span>{text}</span>
                  <img src={children as string} alt="bar" />
                </NavLink>
              )
            )}
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
