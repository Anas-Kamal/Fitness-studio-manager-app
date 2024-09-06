import { Control, Controller } from 'react-hook-form'
import Logo from '../../icons/logo'
import Button from '../components/button'
import CheckBox from '../components/checkbox'
import LabelWrapper from '../form/label-wrapper'
import styles from './sixth-screen.module.scss'
import { FACILITIES, RegisterInterface } from './types'
import { Row, Col } from 'reactstrap'
interface RenderSixthScreenProps {
  handleSubmit: () => void
  errors: any
  control: Control<RegisterInterface, any>
}

const RenderSixthScreen = ({ errors, handleSubmit, control }: RenderSixthScreenProps) => (
  <Row className="w-100 h-100">
    <Col md={6}>
      <img
      src="https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format"
  alt="trainer"
  style={{objectFit:"cover", width:"100%", height:"100%"}}

      />
    </Col>
    <Col md={6}>
      <div className='d-flex justify-end'>
        <Logo height={120} />
      </div>
      <div className='mx-3'>
        <span>אודות הסטודיו</span>
        <div className={styles.block}>
          <div className={styles.facilities} style={{ gridArea: 'facilities' }}>
            {FACILITIES.map((facility) => (
              <LabelWrapper
                key={facility}
                className={styles.facility}
                error={`facilities` in errors ? 'Phone must be provided' : null}>
                {() => (
                  <Controller
                    control={control}
                    name={`facilities.${facility}`}
                    render={({ field }) => (
                      <div>
                        <span>
                          <CheckBox on={field.value} onChange={field.onChange} />
                        </span>
                        <span>{facility}</span>
                      </div>
                    )}
                  />
                )}
              </LabelWrapper>
            ))}
          </div>
          <Button type="event" className={styles.button} onClick={handleSubmit}>
            הבא
          </Button>
        </div>
      </div>
    </Col>
  </Row>
)

export default RenderSixthScreen
