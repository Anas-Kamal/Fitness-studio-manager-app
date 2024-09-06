import Logo from '../../icons/logo'
import Schedule from '../components/schedule'
import styles from './forth-screen.module.scss'
import { Row, Col } from 'reactstrap'

interface RenderForthScreenProps {
  handleSubmit: (data: any) => void
}

const RenderForthScreen = ({ handleSubmit }: RenderForthScreenProps) => (
  <Row className="w-100 h-100">
    <Col md={6}>
      <img
         src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop"
         alt="trainer"
         style={{objectFit:"cover", width:"100%", height:"100%"}}
      />
    </Col>
    <Col md={6}>
      <div className="d-flex justify-end mx-4">
        <Logo height={120} />
      </div>
      <div className='mx-4'>
      <Schedule returnHandleOnSumbit={(data) => handleSubmit(data)} />
      </div>
    </Col>
  </Row>
)

export default RenderForthScreen
