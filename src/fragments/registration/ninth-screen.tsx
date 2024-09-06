import { UseFormRegister } from 'react-hook-form'
import Logo from '../../icons/logo'
import Button from '../components/button'
import { Input } from '../components/input'
import LabelWrapper from '../form/label-wrapper'
import styles from './ninth-screen.module.scss'
import { RegisterInterface } from './types'
import { Row, Col } from 'reactstrap'
interface RenderNinthScreenProps {
  handleSubmit: () => void
  setStep: () => void
  register: UseFormRegister<RegisterInterface>
}
enum Photos {
  zero = 'https://xrpezrbqybgyoeudryoa.supabase.co/storage/v1/object/public/generalphotos/registration/2.png',
  first = 'https://xrpezrbqybgyoeudryoa.supabase.co/storage/v1/object/public/generalphotos/registration/3.png'
}

const RenderNinthScreen = ({ handleSubmit, setStep, register }: RenderNinthScreenProps) => (
  <Row className="w-100 h-100">
    <Col md={6}>
      <img
        src={
          'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
        alt="trainer"
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
    </Col>
    <Col md={6}>
      <div className="mx-3">
        <div className="d-flex justify-end">
          <Logo height={120} />
        </div>
        <div className="mb-2" style={{ textAlign: 'end' }}>
          <span>כרטיס אשראי</span>
        </div>
        <div className={styles.block}>
          <div className={styles.grid}>
            <LabelWrapper style={{ gridArea: 'card_full_name' }} title="שם מלא">
              {({ id }) => <Input id={id} {...register('card_full_name', { required: true })} />}
            </LabelWrapper>
            <LabelWrapper style={{ gridArea: 'card_verification_id' }} title="ת.ז של בעל הכרטיס">
              {({ id }) => (
                <Input id={id} {...register('card_verification_id', { required: true })} />
              )}
            </LabelWrapper>
            <LabelWrapper style={{ gridArea: 'card_number' }} title="מספר כרטיס">
              {({ id }) => (
                <Input
                  id={id}
                  maxLength={19}
                  {...register('card_number', { required: true, maxLength: 19 })}
                />
              )}
            </LabelWrapper>
            <div className={styles.cardCreds} style={{ gridArea: 'card_creds' }}>
              <LabelWrapper>
                {({ id }) => (
                  <Input
                    placeholder="MM/YY"
                    maxLength={4}
                    id={id}
                    {...register('card_exp', {
                      required: true,
                      maxLength: 5
                      // onChange: (e) => {
                      //   let input = e.target.value;
                      //   input = input.replace(/\D/g, '');
                      //   if (input.length >= 3) {
                      //     input = `${input.slice(0, 2)}/${input.slice(2)}`;
                      //   }
                      //   return input
                      //   // Use a regular expression to allow only MM/YY format
                      //   // const isValidFormat = /^\d{2}\/\d{2}$/.test(input);

                      // }
                    })}
                  />
                )}
              </LabelWrapper>
              <LabelWrapper>
                {({ id }) => (
                  <Input
                    maxLength={3}
                    placeholder="CVV"
                    id={id}
                    type="password"
                    {...register('card_cvv', { required: true, maxLength: 3 })}
                  />
                )}
              </LabelWrapper>
            </div>
          </div>
        </div>

        <div className={styles.btnBlock}>
          <Button type="event" className={styles.button} onClick={handleSubmit}>
            סיום
          </Button>
          <Button
            type="white"
            style={{ backgroundColor: '#777777', color: 'white' }}
            className={styles.button}
            onClick={() => setStep()}>
            חזור
          </Button>
        </div>
      </div>
    </Col>
  </Row>
)
export default RenderNinthScreen
