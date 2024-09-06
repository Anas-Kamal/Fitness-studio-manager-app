import React, { useState, Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import Toggle from '../components/toggle'
import styles from './settings.module.scss'
import Zoomicon from './zoom.png'
import Googleicon from './google.png'
import Morningicon from './morning.png'
function SystemSettingPage() {
  const [toggles, setToggles] = useState([false, false, false, false])
  const UpdateToggle = (i) => {
    // console.log(toggles.map((itm,index) => index===i ? !itm:itm))
    setToggles(toggles.map((itm, index) => (index === i ? !itm : itm)))
  }
  return (
    <Fragment>
      <Row>
        <Col md={12}>
          <p className="font-bold">התראות מערכת </p>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col md={12}>
          <div
            className="d-flex justify-end  my-2 p-3 w-100"
            style={{ border: '1px solid #E6E6E6' }}>
            <p className="mx-2">האם לאפשר תשלום במזומן?</p>
            <div className={styles.toggle}>
              <Toggle on={toggles[0]} onChange={() => UpdateToggle(0)} />
            </div>
          </div>

          <div
            className="d-flex justify-end my-2 p-3 w-100"
            style={{ border: '1px solid #E6E6E6' }}>
            <p className="mx-2">האם ברצונך לקבל התראות אל הטלפון של העסק?</p>
            <div className={styles.toggle}>
              <Toggle on={toggles[1]} onChange={() => UpdateToggle(1)} />
            </div>
          </div>

          <div
            className="d-flex justify-end my-2 p-3 w-100"
            style={{ border: '1px solid #E6E6E6' }}>
            <p className="mx-2">האם ברצונך לקבל התראות לאימייל?</p>
            <div className={styles.toggle}>
              <Toggle on={toggles[2]} onChange={() => UpdateToggle(2)} />
            </div>
          </div>

          <div
            className="d-flex justify-end my-2 p-3 w-100"
            style={{ border: '1px solid #E6E6E6' }}>
            <p className="mx-2">האם ברצונך לקבל התראות לאימייל?</p>
            <div className={styles.toggle}>
              <Toggle on={toggles[3]} onChange={() => UpdateToggle(3)} />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <p className="font-bold">אינטגרציות</p>
        </Col>
      </Row>
      <Row className={styles.integrations}>
        <Col md={12}>
          <Row>
            <Col md={12}>
            <div className="d-flex my-3 align-items-center justify-between">
              <div className={styles.toggle}>
                <Toggle />
              </div>
              <div className="d-flex justify-evenly align-items-center  gap-4">
                <p>תאמן אונליין</p>
                <div className='d-flex  align-items-center justify-center'>
                  <p  className='mx-3'>Zoom</p>
                  <img src={Zoomicon} width={'40px'} />
                </div>
              </div>
            </div>
            </Col>
            <Col md={12}>
            <div className="d-flex my-3 align-items-center justify-between">
              <div className={styles.toggle}>
                <Toggle />
              </div>
              <div className="d-flex justify-evenly align-items-center gap-4">
                <p > חבר את האימייל שלך</p>
                <div className='d-flex align-items-center justify-center'>
                  <p  className='mx-3'>Google</p>
                  <img src={Googleicon} width={'40px'} />
                </div>
              </div>
            </div>
            </Col>
            <Col md={12}>
            <div className="d-flex my-3 align-items-center justify-between">
              <div className={styles.toggle}>
                <Toggle />
              </div>
              <div className="d-flex justify-evenly align-items-center gap-4">
                <p>חשבונית ירוקה ללקוחות שלך </p>
                <div className='d-flex align-items-center justify-center'>
                  <p  className='mx-3'>Morning</p>
                  <img src={Morningicon} width={'40px'} />
                </div>
              </div>
            </div>
            </Col>
          </Row>
          <div>
          
            
          
           
          </div>
        </Col>
      </Row>
    </Fragment>
  )
}

export default SystemSettingPage
