import React, { Fragment } from 'react'
import { Col, Form, Label, Row } from 'reactstrap'
import { Input } from '../components/input'
import Select from '../components/select'
import { useDropzone } from 'react-dropzone'
import Button from '../components/button'
import DatePicker from '../components/date-picker'
import styles from './settings.module.scss'
import DropZone from '../form/drop-zone'
import { useForm } from 'react-hook-form'
import { SellerFormType } from '../../features/api-types'
import useAuth from '../../features/auth'
function PriceSellerSettingPage() {
  interface dropzoneProps {
    file: File
  }
  const handleDrop1 = (file: File) => {}
  const handleDrop2 = (file: File) => {}
  const {profile} = useAuth()
  console.log(profile)
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors }
  } = useForm<SellerFormType>()


  return (
    <Fragment>
      <Form className={styles.sellerForm}>
        <Row>
          <Col md={12} className="d-flex justify-end">
            <p className="font-bold">יצירת מוכר</p>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="text-right">
            <Label>שם משפחה</Label>
            <Input type="text" />
          </Col>
          <Col md={6} className="text-right">
            <Label>שם פרטי</Label>
            <Input type="text" />
          </Col>
        </Row>

        <Row className="text-right">
          <Col md={12} className="text-right">
            <Label>אימייל </Label>
            <Input type="text" />
          </Col>
        </Row>
        <Row>
          <Col md={3} className="text-right">
            <Label>ת. לידה</Label>
            <DatePicker />
          </Col>
          <Col md={3} className="text-right">
            <Label>מין </Label>
            <Select
              options={[
                { label: 'נקבה', value: 'נקבה' },
                { label: 'זכר', value: 'זכר' }
              ]}
            />
          </Col>
          <Col md={6} className="text-right">
            <Label>טלפון </Label>
            <Input type="text" />
          </Col>
        </Row>
        <Row>
          <Col md={6} className="text-right">
            <Label>תאריך הנפקת תעודת זהות</Label>
            <DatePicker />{' '}
          </Col>

          <Col md={6} className="text-right">
            <Label>תעודת זהות</Label>
            <Input type="text" />
          </Col>
        </Row>

        <Row>
          <Col md={12} className="text-right">
            <Label>אימייל של העסק</Label>
            <DatePicker />{' '}
          </Col>
        </Row>

        <Row>
          <Col md={6} className="text-right">
            <Label>מספר חשבון בנק</Label>
            <DatePicker />{' '}
          </Col>

          <Col md={6} className="text-right">
            <Label>טלפון של העסק</Label>
            <Input type="text" />
          </Col>
        </Row>
        <Row>
          <Col md={6} className="text-right">
            <Label>מספר סניף</Label>
            <DatePicker />{' '}
          </Col>

          <Col md={6} className="text-right">
            <Label>קוד הבנק</Label>
            <Input type="text" />
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-right">
            <Label>מספר סניף</Label>
            <Input type="textarea" />
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-right">
            <Label>סוג העסק</Label>
            <Select
              options={[
                { label: 'אדם פרטי', value: 'אדם פרטי' },
                { label: 'עוסק מורשה', value: 'עוסק מורשה' },
                { label: 'שותפות רשומה', value: 'שותפות רשומה' },
                { label: 'עוסק פטור', value: 'עוסק פטור' },
                { label: 'עסק ללא מטרות רווח', value: 'עסק ללא מטרות רווח' },
                { label: 'חברה בע״מ', value: 'חברה בע״מ' }
              ]}
              onChange={(e) => {}}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6} className="text-right">
            <Label>ח.פ</Label>
            <Input type="textarea" />
          </Col>
          <Col md={6} className="text-right">
            <Label>תאריך רישום העסק</Label>
            <DatePicker />{' '}
          </Col>
        </Row>
        <Row>
          <Col md={6} className="text-right">
            <Label>רחוב</Label>
            <Input type="text" />
          </Col>
          <Col md={6} className="text-right">
            <Label>עיר</Label>
            <Input type="text" />
          </Col>
        </Row>
        <Row>
          <Col md={6} className="text-right">
            <Label>תא דואר</Label>
            <Input type="text" />
          </Col>
          <Col md={6} className="text-right">
            <Label>מדינה</Label>
            <Input type="text" />
          </Col>
        </Row>
        <Row  className='mt-2'>
          <Col md={12}>
            
            <DropZone maxFiles={1} maxFileSize={1024 * 1024 * 50} onDrop={(file) => handleDrop1(file)} />
          </Col>
        </Row>
        <Row className='mt-2'>
          <Col md={12}>
          <DropZone maxFiles={1} maxFileSize={1024 * 1024 * 50} onDrop={(file) => handleDrop2(file)} />
          </Col>
        </Row>
        <Row  className='my-4'>
          <Col md={12}>
            <Button className="w-100" htmlType="submit" type="event">
              אישור והרשמה
            </Button>
          </Col>
        </Row>
      </Form>
    </Fragment>
  )
}

export default PriceSellerSettingPage
