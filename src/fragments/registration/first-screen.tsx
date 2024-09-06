import { Controller } from 'react-hook-form'
import Logo from '../../icons/logo'
import Button from '../components/button'
import CheckBox from '../components/checkbox'
import LabelWrapper from '../form/label-wrapper'
import { Row } from 'reactstrap'
import styles from './first-screen.module.scss'
import StudioDiscount from './studio-discount'
import TrainerDiscount from './trainer-discount'
import { Col } from 'reactstrap'
// import registration1 from "../../imgs/bounce/registration1.png"
interface RenderFirstScreenProps {
  isStudio: boolean
  isTrainer: boolean
  control: any
  handleSubmit: () => void
  errors: any
  setStep: (step: number) => void
}
enum Photos {
  zero = '../../imgs/bounce/registration1.png',
  first = 'https://xrpezrbqybgyoeudryoa.supabase.co/storage/v1/object/public/generalphotos/registration/3.png'
}

const RenderFirstScreen = ({
  isStudio,
  control,
  isTrainer,
  handleSubmit,
  errors,
  setStep
}: RenderFirstScreenProps) => (
  // <div className={"styles.wrapper"}>
  //   {!isStudio && <img src={"./../../imgs/bounce/registration1.png"} alt="trainer" />}
  //   {isStudio && <img src={Photos.first} alt="trainer" />}

  //   <div>
  //     <Logo height={120} />
  //   <span> Create New Profile </span>
  //   <span>בחרו עכשיו את החבילה המתאימה לכם וקבלו 15% הנחה</span>
  //     <div className={"styles.block"}>
  //       <LabelWrapper className={"styles.box"} error={`isTrainer` in errors ? 'Phone must be provided' : null}>
  //         {() => (
  //           <Controller
  //             name="isTrainer"
  //             control={control}
  //             render={({ field }) => (
  //               <>
  //                 <div>
  //                   <CheckBox on={field.value} onChange={field.onChange} />
  //                   <span> personal trainer</span>
  //                 </div>
  //                 <span>אימון כושר שבו אדם אחד מתאמן תחת הדרכתו האישית של מאמן כושר גופני . </span>
  //               </>
  //             )}
  //           />
  //         )}
  //       </LabelWrapper>
  //       <LabelWrapper className={"styles.box"} error={`isStudio` in errors ? 'Phone must be provided' : null}>
  //         {() => (
  //           <Controller
  //             name="isStudio"
  //             control={control}
  //             render={({ field }) => (
  //               <>
  //                 <div>
  //                   <CheckBox on={field.value} onChange={field.onChange} />
  //                   <span>סטודיו</span>
  //                 </div>
  //                 <span>אימון כושר שבו אדם אחד מתאמן תחת הדרכתו האישית של מאמן כושר גופני. </span>
  //               </>
  //             )}
  //           />
  //         )}
  //       </LabelWrapper>
  //     </div>
  //     {isStudio && <StudioDiscount control={control} errors={errors} />}
  //     {isTrainer && <TrainerDiscount control={control} errors={errors} />}

  //     <Button
  //       type={isTrainer || isStudio ? 'event' : 'white'}
  //       className={"styles.button"}
  //       onClick={() => {
  //         handleSubmit()
  //         return setStep(1)
  //      }}
  //     >
  //       the next
  //     </ Button>
  //     <button className={"styles.bottomButton"} type="button" onClick={handleSubmit}>
  //       אני מעוניין להתחיל להנות מהמערכת ולרכוש מנוי אחר כך
  //     </button>
  //   </div>
  // </div>

  <Row className="w-full h-full" style={{ height: '100vh !important' }}>
    <Col md={5} sm={12} className="h-100">
      {!isStudio && (
        <img
          src={
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
          }
          alt="trainer"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      )}
      {isStudio && (
        <img
          src={
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
          }
          alt="trainer"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      )}
    </Col>
    <Col md={7} sm={12}>
      <Row>
        <Col md={12} className="d-flex justify-end">
          <div style={{ marginRight: '40px' }}>
            <Logo height={120} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div style={{ textAlign: 'end', marginRight: '40px' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}> Create New Profile </p>
            <span>בחרו עכשיו את החבילה המתאימה לכם וקבלו 15% הנחה</span>
          </div>
        </Col>
      </Row>
      <Row className="mt-5 gap-2 justify-content-end" style={{ marginRight: '40px' }}>
        <Col md={5} className="d-flex justify-content-end">
          <LabelWrapper
            className={styles.box}
            error={`isTrainer` in errors ? 'Phone must be provided' : null}>
            {() => (
              <Controller
                name="isTrainer"
                control={control}
                render={({ field }) => (
                  <>
                    <div>
                      <CheckBox on={field.value} onChange={field.onChange} />
                      <span>מאמן אישי</span>
                    </div>
                    <span>
                      אימון כושר שבו אדם אחד מתאמן תחת הדרכתו האישית של מאמן כושר גופני .{' '}
                    </span>
                  </>
                )}
              />
            )}
          </LabelWrapper>
        </Col>
        <Col md={5} className="d-flex justify-content-end">
          <LabelWrapper
            className={styles.box}
            error={`isStudio` in errors ? 'Phone must be provided' : null}>
            {() => (
              <Controller
                name="isStudio"
                control={control}
                render={({ field }) => (
                  <>
                    <div>
                      <CheckBox on={field.value} onChange={field.onChange} />
                      <span>סטודיו</span>
                    </div>
                    <span>אימון כושר שבו אדם אחד מתאמן תחת הדרכתו האישית של מאמן כושר גופני. </span>
                  </>
                )}
              />
            )}
          </LabelWrapper>
        </Col>
      </Row>
      <Row style={{ marginRight: '40px' }}>
        <Col md={12} sm={12} lg={12}>
          {isStudio && <StudioDiscount control={control} errors={errors} />}
          {isTrainer && <TrainerDiscount control={control} errors={errors} />}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={12} className="d-flex flex-col align-items-center">
          <Button
            className="px-5 mb-3"
            style={{ background: 'black', color: 'white' }}
            type={isTrainer || isStudio ? 'event' : 'white'}
            onClick={() => {
              handleSubmit()
              return setStep(1)
            }}>
            הבא
          </Button>
          <button className={styles.bottomButton} type="button" onClick={handleSubmit}>
            אני מעוניין להתחיל להנות מהמערכת ולרכוש מנוי אחר כך
          </button>
        </Col>
      </Row>
    </Col>
  </Row>
)
export default RenderFirstScreen
