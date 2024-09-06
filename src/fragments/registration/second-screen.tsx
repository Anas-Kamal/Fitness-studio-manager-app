import { UseFormRegister } from 'react-hook-form'
import Logo from '../../icons/logo'
import Button from '../components/button'
// import { Input } from '../components/input'
import LabelWrapper from '../form/label-wrapper'
import styles from './second-screen.module.scss'
import { RegisterInterface } from './types'
import { Row, Col, Input } from 'reactstrap'
interface RenderSecondScreenProps {
  handleSubmit: () => void
  errors: any
  register: UseFormRegister<RegisterInterface>
}

const RenderSecondScreen = ({ errors, handleSubmit, register }: RenderSecondScreenProps) => {
  return (
    <Row className="w-100 h-100">
      <Col md={6}>
        <img
          src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format"
          alt="trainer"
          style={{objectFit:"cover", width:"100%", height:"100%"}}
        />
      </Col>
      <Col md={6}>
        <div className="d-flex justify-end">
          <Logo height={120} />
        </div>
        <div>
          <div className='text-right'>

          <p>יצירת פרופיל חדש</p>
          </div>
          <div className={styles.block}>
            <form className={styles.grid}>
              <LabelWrapper
                error={`client_second_name` in errors ? 'Second name must be provided' : null}
                style={{ gridArea: 'client_second_name' }}
                title="שם משפחה">
                {({ id }) => (
                  <Input id={id} {...register('client_second_name', { required: true })} />
                )}
              </LabelWrapper>
              <LabelWrapper
                error={`client_first_name` in errors ? 'First name must be provided' : null}
                style={{ gridArea: 'client_first_name' }}
                title="שם פרטי">
                {({ id }) => (
                  <Input id={id} {...register('client_first_name', { required: true })} />
                )}
              </LabelWrapper>
              <LabelWrapper
                error={`client_email` in errors ? 'Email must be provided' : null}
                style={{ gridArea: 'client_email' }}
                title="אימייל">
                {({ id }) => <Input id={id} {...register('client_email', { required: true })} />}
              </LabelWrapper>
              <LabelWrapper
                error={`client_phone` in errors ? 'Phone must be provided' : null}
                style={{ gridArea: 'client_phone' }}
                title="טלפון">
                {({ id }) => <Input id={id} {...register('client_phone', { required: true })} />}
              </LabelWrapper>
            </form>
          </div>
          <Button type="event" className={styles.button} onClick={handleSubmit}>
            הבא
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export default RenderSecondScreen
