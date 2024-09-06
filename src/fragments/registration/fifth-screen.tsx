import { Control, Controller, UseFormRegister } from 'react-hook-form'
import Logo from '../../icons/logo'
import Button from '../components/button'
import CheckBox from '../components/checkbox'
import { Input } from '../components/input'
import LabelWrapper from '../form/label-wrapper'
import styles from './fifth-screen.module.scss'
import { FACILITIES, RegisterInterface } from './types'
import { Row, Col } from 'reactstrap'
interface RenderFifthScreenProps {
  handleSubmit: () => void
  errors: any
  register: UseFormRegister<RegisterInterface>
  control: Control<RegisterInterface, any>
}

const RenderFifthScreen = ({ errors, handleSubmit, register, control }: RenderFifthScreenProps) => (
  <Row className="w-100 h-100">
    <Col md={6}>
    <img
    src='https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format'
  alt="trainer"
         style={{objectFit:"cover", width:"100%", height:"100%"}}
      />
    </Col>
    <Col md={6}>
      <div className='mx-3'>
        <Logo height={120} />
        <span>אודות הסטודיו</span>
        <div className={styles.block}>
          <form className={styles.grid}>
            <LabelWrapper
              error={`instagram_link` in errors ? 'Second name must be provided' : null}
              style={{ gridArea: 'instagram_link' }}
              title="עמוד אינסטגרם">
              {({ id }) => <Input id={id} {...register('instagram_link')} />}
            </LabelWrapper>
            <LabelWrapper
              error={`facebook_link` in errors ? 'First name must be provided' : null}
              style={{ gridArea: 'facebook_link' }}
              title="עמוד פייסבוק">
              {({ id }) => <Input id={id} {...register('facebook_link')} />}
            </LabelWrapper>
            <LabelWrapper
              className={styles.desctiption}
              style={{ gridArea: 'description' }}
              error={`description` in errors ? 'Email must be provided' : null}
              title="כתבו בקצרה אודות הסטודיו שלכם">
              {({ id }) => <textarea id={id} {...register('description')} />}
            </LabelWrapper>

            <span className={styles.title} style={{ gridArea: 'title' }}>
              היכן מתקיימים האימונים?
            </span>
            <LabelWrapper
              style={{ gridArea: 'training_in_client_home' }}
              title="יש לי סטודיו לאימונים"
              className={styles.facility}
              error={`training_in_client_home` in errors ? 'Phone must be provided' : null}>
              {() => (
                <Controller
                  control={control}
                  name="training_in_client_home"
                  render={({ field }) => (
                    <div>
                      <span>
                        <CheckBox on={field.value} onChange={field.onChange} />
                      </span>
                      <span>יש לי סטודיו לאימונים</span>
                    </div>
                  )}
                />
              )}
            </LabelWrapper>
            <LabelWrapper
              style={{ gridArea: 'training_in_studio' }}
              title="אימונים בבית הלקוח"
              className={styles.facility}
              error={`training_in_studio` in errors ? 'Phone must be provided' : null}>
              {() => (
                <Controller
                  control={control}
                  name="training_in_studio"
                  render={({ field }) => (
                    <div>
                      <span>
                        <CheckBox on={field.value} onChange={field.onChange} />
                      </span>
                      <span>אימונים בבית הלקוח</span>
                    </div>
                  )}
                />
              )}
            </LabelWrapper>
          </form>
          <div className='d-flex justify-center mt-5'>
          <Button type="event" style={{width:"20%"}} className={styles.button} onClick={handleSubmit}>
            הבא
          </Button>
          </div>
         
        </div>
      </div>
    </Col>
  </Row>
)

export default RenderFifthScreen
