import { UseFormRegister } from 'react-hook-form'
import Logo from '../../icons/logo'
import * as ReactDOM from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/button'
import { Input } from '../components/input'
import LabelWrapper from '../form/label-wrapper'
import moduleStyles from '../form/modal.module.scss'
import styles from './ninth-screen.module.scss'
import { RegisterInterface } from './types'
import { Row, Col } from 'reactstrap'
import Modal from '../form/modal'
import { useRef, useState } from 'react'
interface RenderNinthScreenProps {
  handleSubmit: () => void
  setStep: () => void
  register: UseFormRegister<RegisterInterface>
}
enum Photos {
  zero = 'https://xrpezrbqybgyoeudryoa.supabase.co/storage/v1/object/public/generalphotos/registration/2.png',
  first = 'https://xrpezrbqybgyoeudryoa.supabase.co/storage/v1/object/public/generalphotos/registration/3.png'
}

const RenderEightScreen = ({ handleSubmit, setStep, register }: RenderNinthScreenProps) => (
  <Row className="w-100 h-100 relative">
    {/* <div className='absolute'>
        sdsad
    </div> */}
    <Col md={6}>
      <img src={Photos.first} alt="trainer" />
    </Col>
    <Col md={6}>
      <div className="mx-3">
        <div className="d-flex justify-end">
          <Logo height={120} />
        </div>
        {/* <Modal visible={true} style={{ width: 511 }} title="תנאי שימוש ופרטיות"></Modal> */}
        {/* <Modal></Modal> */}
        {ReactDOM.createPortal(<AnimatePresence>{renderModal(handleSubmit)}</AnimatePresence>, document.body)}
      </div>
    </Col>
  </Row>
)

const renderModal = (handleSubmit) => {
    const scrollableDivRef = useRef(null);
    const parentDivRef = useRef(null);
    const [disable, setDisable] = useState(true)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.125 }}
      className={moduleStyles.wrapper}>
      <motion.div
        className={moduleStyles.modal}
        ref={parentDivRef}
        style={{ width: 511, height: 500 }}
        initial={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}>
        {/* <div className={moduleStyles.header}> */}
        <div className="text-center">
          <p className="font-bold">תנאי שימוש ופרטיות</p>
        </div>
        {/* </div> */}

        <div
          className="mt-3 max-h-full overflow-x-auto text-right"
          ref={scrollableDivRef}
        //   onScroll={() => {
        //     const div = scrollableDivRef.current;
        //     const parentDiv = parentDivRef.current;
        //     if (div && parentDiv) {

        //         const isAtEnd =
        //         div.scrollHeight -div.scrollTop === parentDiv.clientHeight
        //         console.log(isAtEnd)
        //     }
        //     // scrollButton.disabled = !isAtEnd
        //   }}
          >
          <p className="font-semibold mt-2">תנאי שימוש</p>
          <p style={{ fontSize: '13px' }}>
            תנאי השימוש המפורטים להלן (“תנאי השימוש”) קובעים את הגישה שלך לאתר https://bouncit.co.il
            (“האתר”) ויחולו על כל שימוש שתעשה/י באתר לרבות במידע, בתכנים ובשירותים המופיעים בו או
            בקישוריות למקורות מידע אחרים המסופקים באתר או באמצעותו, וכן על כל מסירת מידע או על כל
            רכישת שירות באמצעות האתר והם מהווים את הבסיס המשפטי לכל התקשרות או פעולה שתעשה/י במסגרת
            זו. הבעלים של האתר, BOUNCE (להלן: “ ,(“BOUNCEמאשר לך את השימוש באתר זה בכפיפות לתנאי
            השימוש. קרא/י בעיון את תנאי השימוש לפני השימוש באתר. אתר זה זמין לשימושך רק בתנאי
            שתסכימ/י לתנאי השימוש. הגלישה והשימוש באתר זה, על השירותים אשר ניתנים ו/או יינתנו בו
            ו/או באמצעותו מפעם לפעם הינם בכפוף להוראות תנאי שימוש אלה. אם אינך מסכימ/ה לכל תנאי
            השימוש אל תעשה שימוש באתר. גלישה ושימוש באתר מהווה הסכמה מצדך להוראות ולתנאים אלה
            והתחייבותך לפעול על-פיהם.
          </p>
          <p className="font-semibold mt-2">מסירת מידע אישי באמצעות האתר</p>
          <p style={{ fontSize: '13px' }}>
            הנך מאשר/ת כי כל מידע שתמסר/י באמצעות האתר ל-BOUNCE, יימסר מרצונך ומהסכמתך המלאה ויהווה
            הסכמה ברורה מצידך ל-BOUNCE או למי מטעמו להשתמש בפרטים שמסרת, בכפוף לכל דין, לרבות הסכמתך
            שתימסר לקבל דברי דואר בין בדואר רגיל, בין בדואר אלקטרוני ובין בכל דרך אחרת . הסכמה
            שתימסר למשלוח תכנים שיווקיים באמצעות פקסימיליה, מערכת חיוג אוטומטי, הודעה אלקטרונית או
            הודעת מסר קצר (SMS) כפופה, בין היתר, להוראות תיקון מס’ 40 של חוק התקשורת (בזק ושידורים),
            התשס”ח-2008 . המידע ש-BOUNCE אוסף מהמבקרים באתר מיועד למתן שירות וכן ליצירת קשר בהזמנה
            להציע הצעות לרכישת ומוצרים או שירותים מטעם BOUNCE, לדיוור ישיר, לצורך עיבודים סטטיסטיים,
            לפילוח ומיקוד שיווקי, למטרות שיפור ו/או שינוי השירותים הניתנים באמצעות האתר ותכניו. הנך
            מסכימ/ה, כי המידע יימסר לצורך עיבודו, אחסונו ו/או לשם השלמת השימושים כאמור וזאת בכפוף
            להוראות חוק הגנת הפרטיות, התשמ”א-1981. אם אינך מעונינ/ת לקבל מידע על מוצרים ושירותים אשר
            לדעת BOUNCE עשויים לעניין אותך, יהיה באפשרותך לבחור בכל עת באפשרות הסרה מרשימת התפוצה
            בעת קבלת המידע כאמור.
          </p>
        </div>

        <div>
          <div className="d-flex justify-center">
            <p>אני מאשר עוגיות</p>
            <input className="mx-2" type="checkbox" onChange={(e)=>{
                if(e.target.checked){
                    setDisable(false)
                }
                else{
                    setDisable(true)
                }
            }}></input>
          </div>
          <div className='text-center'>

          <button style={{background:"black", color:"white"}} onClick={handleSubmit} className='px-5 py-1' type="button" disabled={disable}>אישור</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
export default RenderEightScreen
