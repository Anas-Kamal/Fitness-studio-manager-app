import React, { useEffect, useState } from 'react'
import cls from 'classnames'
import styles from './style.module.scss'
import RightNavBar from '../right-nav-bar/right-nav-bar'
import NavBar from '../right-nav-bar/nav-bar'
import { NavLink } from 'react-router-dom'
import SettingsIcon from '../../icons/settings'
import LogOut from '../../icons/log-out'
import useAuth from '../../features/auth'
import Logo from '../../icons/logo'
import { Col, Row } from 'reactstrap'
import Hamburger from "./hamburger.png"
interface PageContainerProps {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

const PageContainer: React.FC<PageContainerProps> = ({ className, style, children }) => {
  const [isOpen, setOpen] = useState(false)
  const { profile, logOut } = useAuth()
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false)
      }
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize)

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <div style={style} className={cls(styles.container, className)}>
      <Row className={'w-100'} style={{height:"100vh"}}>
        <Col xl={10} lg={8} className={styles.leftSideChildren} style={{height:"100vh"}}>{children}</Col>
        <Col xl={2} lg={4} className={styles.rightSide}>
          <RightNavBar className="rightSidebar" />
        </Col>
      </Row>
      <div className={styles.mobilemenu}>
      <div onClick={() => {
            setOpen(!isOpen)
          }}  className={`${styles.hamburger} ${isOpen ? styles.hamburgeractive : ''} mt-2`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {/* <p
          onClick={() => {
            setOpen(!isOpen)
          }}>
          <img src={Hamburger} width={50} alt="" />
        </p> */}
      </div>
      <div
        style={{
          display: isOpen ? 'block' : 'none',
          background: 'white',
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          zIndex: 9999999
        }}>
        <NavBar />
        <div className="w-full flex justify-center items-center flex-col mt-5">
          <NavLink to={'/setting'}>
            <div className="d-flex my-2">
              <span className="mx-2">הגדרות</span>
              <SettingsIcon />
            </div>
          </NavLink>
          <div className="flex space-x-2 justify-between hover:cursor-pointer" onClick={logOut}>
            <span>להתנתק</span>
            <LogOut />
          </div>
          <Logo />
        </div>
      </div>
    </div>
  )
  //   <div style={style} className={cls('container', className)}>
  //   <div className="content">
  //     {children}
  //   </div>
  //   <div className="right-sidebar">
  //     <RightNavBar />
  //   </div>
  // </div>
}

export default PageContainer
