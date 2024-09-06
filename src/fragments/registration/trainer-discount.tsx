import { Controller } from 'react-hook-form'
import CheckSign from '../../icons/check-sign'
import CrossSign from '../../icons/cross-sign'
import Toggle from '../components/toggle'
import LabelWrapper from '../form/label-wrapper'
import RegistrationInfo from './registration-info'
import styles from './studio-discount.module.scss'

interface TrainerDiscountInfoProps {
  control: any
  errors: any
}

const TrainerDiscount = ({ control, errors }: TrainerDiscountInfoProps) => (
  // <RegistrationInfo>
    <div>
      <LabelWrapper className={styles.wrapper} error={`isStudio` in errors ? 'Phone must be provided' : null}>
        {() => (
          <Controller
            name="is_trainer_discount"
            control={control}
            render={({ field }) => (
              <>
                <span>חודשי</span>
                <Toggle on={field.value} onChange={field.onChange} />
                <span style={{ fontWeight: 'bold' }}>שנתי</span>
                <span className={styles.tag}>
                  <span>הנחה</span> <span>15%</span>
                </span>
              </>
            )}
          />
        )}
      </LabelWrapper>
      <div className={styles.inner}>
        <div>
          <span>
            הנפקת חשבוניות אוטומטיות <CheckSign />
          </span>
          <span>
            מספר מנויים ומתאמנים ללא הגבלה <CheckSign />
          </span>
          <span>
            ניהול סטודיו וחדרים <CrossSign />
          </span>
          <span>
            ניהול מדריכים ומשמרות <CrossSign />
          </span>
        </div>
        <div>
          <span>
            יצירת אימונים ללא הגבלה <CheckSign />
          </span>
          <span>
            קבלת תשלום מאובטח <CheckSign />
          </span>
          <span>
            בניה וניהול קורסים <CheckSign />
          </span>
          <span>
            התממשקות ליומנים <CheckSign />
          </span>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>חודשי</span>
        <span>₪79</span>
        <span>₪89</span>
      </div>
    </div>
  // </RegistrationInfo>
)

export default TrainerDiscount
