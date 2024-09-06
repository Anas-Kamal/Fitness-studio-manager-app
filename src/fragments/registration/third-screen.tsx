import { UseFormRegister } from 'react-hook-form'
import Logo from '../../icons/logo'
import Button from '../components/button'
import { Input } from '../components/input'
import LabelWrapper from '../form/label-wrapper'
import styles from './third-screen.module.scss'
import { RegisterInterface } from './types'
import { Col, Row } from 'reactstrap'

interface RenderThirdScreenProps {
  handleSubmit: () => void
  errors: any
  register: UseFormRegister<RegisterInterface>
}

const RenderThirdScreen = ({ errors, handleSubmit, register }: RenderThirdScreenProps) => {
  console.log()
  return (
    <Row style={{width:"100vw", height:"100vh"}}>
      <Col sm={12} md={6} className='d-flex justify-content-end'>
      <img
        src="https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop"
        alt="trainer"
                  style={{objectFit:"cover", width:"100%", height:"100%"}}

      />
      </Col>
      <Col sm={12} md={6}>
      <div>
        <Logo height={120} />
        <span>יצירת פרופיל חדש</span>
        <div className={styles.block}>
          <form className={styles.grid}>
            <LabelWrapper
              error={`studio_nickname` in errors ? 'Second name must be provided' : null}
              style={{ gridArea: 'studio_nickname' }}
              title="כינוי"
            >
              {({ id }) => <Input id={id} {...register('studio_nickname', { required: true })} />}
            </LabelWrapper>
            <LabelWrapper
              error={`studio_full_name` in errors ? 'First name must be provided' : null}
              style={{ gridArea: 'studio_full_name' }}
              title="שם הסטודיו"
            >
              {({ id }) => <Input id={id} {...register('studio_full_name', { required: true })} />}
            </LabelWrapper>
            <LabelWrapper
              error={`studio_email` in errors ? 'Email must be provided' : null}
              style={{ gridArea: 'studio_email' }}
              title="אימייל הסטודיו"
            >
              {({ id }) => <Input id={id} {...register('studio_email', { required: true })} />}
            </LabelWrapper>
            <LabelWrapper
              error={`studio_name` in errors ? 'Phone must be provided' : null}
              style={{ gridArea: 'studio_name' }}
              title="טלפון הסטודיו"
            >
              {({ id }) => <Input id={id} {...register('studio_name', { required: true })} />}
            </LabelWrapper>
            <LabelWrapper
              error={`studio_location` in errors ? 'Phone must be provided' : null}
              style={{ gridArea: 'studio_location' }}
              title="מיקום הסטודיו"
            >
              {({ id }) => <Input id={id} {...register('studio_location', { required: true })} />}
            </LabelWrapper>
          </form>
        </div>

        <Button type="event" className={styles.button} onClick={handleSubmit}>
          הבא
        </Button>
      </div>
      </Col>
    </Row>
    // <div className={styles.wrapper}>
     
  
    // </div>
  )
}

export default RenderThirdScreen
