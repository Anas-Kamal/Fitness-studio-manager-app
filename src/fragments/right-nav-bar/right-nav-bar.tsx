import React from 'react'
import useAuth from '../../features/auth'
import useResizeObserver from '../../hooks/resize-observer'
import Logo from '../../icons/logo'
import SettingsIcon from '../../icons/settings'
import logo from '../../imgs/bounce/logo.svg'
import NavBar from './nav-bar'
import NavLink from './nav-link'
import GenerateCopyURLComponent from '../components/generate-copy-link'
import Button from '../components/button'
import LogOut from '../../icons/log-out'
import styles from '../components/style.module.scss'
interface RightNavBarProps {
  className?: string
  style?: React.CSSProperties
}

const RightNavBar: React.FC<RightNavBarProps> = ({ className, style }) => {
  const { profile, logOut } = useAuth()
  const observer = useResizeObserver()

  return (
    <div
      style={style}
      className={`${styles.rightSidebar}`+" flex flex-col w-full max-w-[322px] h-full min-h-[100vh] border border-[#e6e6e6] "}>
      <div className="flex justify-end items-center gap-[12px] mr-[10px] w-full h-[100px]">
        <span>{profile.full_name}</span>
        <img
          src={logo}
          alt="logo"
          className="mr-[10px] h-[50px] w-[50px] rounded-full p-1 border border-[#e6e6e6]"
        />
      </div>

      <NavBar />

      <div className="w-full flex justify-center items-center mt-auto flex-col">
        <div>
          <NavLink to={'/setting'}>
            <span>הגדרות</span>
            <SettingsIcon />
          </NavLink>
        </div>
        <div className="flex space-x-2 justify-between hover:cursor-pointer" onClick={logOut}>
          <span>להתנתק</span>
          <LogOut />
        </div>
        {/* <GenerateCopyURLComponent /> */}
        <Logo />
      </div>
    </div>
  )
}

export default RightNavBar
