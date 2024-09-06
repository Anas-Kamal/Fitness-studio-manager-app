import { Controller } from 'react-hook-form'
import CheckSign from '../../icons/check-sign'
import Toggle from '../components/toggle'
import LabelWrapper from '../form/label-wrapper'
import RegistrationInfo from './registration-info'
import styles from './studio-discount.module.scss'

interface StudioDiscountInfoProps {
  control: any
  errors: any
}

const StudioDiscount = ({ control, errors }: StudioDiscountInfoProps) => (
  // <RegistrationInfo>
    <div>
      <LabelWrapper className={styles.wrapper} error={`isStudio` in errors ? 'Phone must be provided' : null}>
        {() => (
          <Controller
            name="is_studio_discount"
            control={control}
            render={({ field }) => (
              <div className='flex flex-row space-x-3'>
                <span>חודשי</span>
                <Toggle on={field.value} onChange={field.onChange} />
                <span>שנתי</span>
              </div>
            )}
          />
        )}
      </LabelWrapper>
      <div className="flex flex-row space-x-3 space-y-2 items-center justify-around">
        <div className='flex flex-col justify-end'>
          <div className='flex flex-row items-center'>
            <span className='mr-4' >הנפקת חשבוניות אוטומטיות  </span>
            <CheckSign />
          </div>
          <div className='flex flex-row items-center'>
            <span className='mr-4'>מספר מנויים ומתאמנים ללא הגבלה </span>
            <CheckSign />
          </div>
          <div className='flex flex-row items-center'>
            <span className='mr-4'>ניהול סטודיו וחדרים  </span>
            <CheckSign />
          </div>
          <div className='flex flex-row items-center'>
            <span className='mr-4'>ניהול מדריכים ומשמרות  </span>
            <CheckSign />
          </div>
        </div>
        <div className='flex flex-col justify-start'>
          <div className='flex flex-row items-center'>
            <span className='mr-4'>יצירת אימונים ללא הגבלה   </span>
            <CheckSign />
          </div>
          <div className='flex flex-row items-center'>
            <span className='mr-4'>מספר מנויים ומתאמנים ללא הגבלה </span>
            <CheckSign />
          </div>
          <div className='flex flex-row items-center'>
            <span className='mr-4'>ניהול סטודיו וחדרים  </span>
            <CheckSign />
          </div>
          <div className='flex flex-row items-center'>
            <span className='mr-4'>ניהול מדריכים ומשמרות  </span>
            <CheckSign />
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>חודשי</span>
        <span>₪130</span>
        <span>₪179</span>
      </div>
    </div>
  // </RegistrationInfo>
)

export default StudioDiscount
