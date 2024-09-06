import React from 'react'
import cls from 'classnames'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../../fragments/components/page-container'
import Trainees from '../../fragments/trainees/trainees'
import { Ordering } from '../../features/api-types'
import Table from '../../fragments/components/table'
import { ROUTES } from '../../lib/constants'
import AddTraineeModal from '../../fragments/trainees/modals/add-trainee'
import Avatar from '../../fragments/components/avatar'
import useTraineeStudio from '../../features/trainees'
import useAuth from '../../features/auth'
import CreateSellerModal from '../../fragments/create-seller/create-seller-modal'

interface TraineesPageLayoutProps {
  className?: string
  style?: React.CSSProperties
}

const TraineesPageLayout: React.FC<TraineesPageLayoutProps> = ({ className, style }) => {
  const navigation = useNavigate()
  const [page, setPage] = React.useState(1)
  const [rowFilter, setRowFilter] = React.useState<string>()
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false)
  const [isCreateModalVisible, setCreateModalVisible] = React.useState<boolean>(false)

  const [orderKey, setOrderKey] = React.useState<string | null>('created_at')
  const [orderDirection, setOrderDirection] = React.useState<Ordering>('desc')

  const { profile } = useAuth()
  const { collection, isLoading } = useTraineeStudio({ studio_id: profile?._id })

  return (
    <div style={style} className={cls(className)}>
      <PageContainer>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
          <Trainees
            openModal={() => setIsModalVisible(true)}
            openSellerModal={() => setCreateModalVisible(true)}
          />
          <div
            style={{
              display: 'flex',
              border: '1px solid #F4F4F4',
              borderRadius: 16,
              padding: '20px 20px',
              boxSizing: 'border-box',
              width: '90%',
              marginInline: 'auto'
            }}>
            <Table
              style={{
                width: '100%',
                maxWidth: 1350,
                minHeight: 600,
                marginInline: 'auto'
              }}
              loading={false}
              columns={[
                {
                  isFilter: true,
                  style: { width: '15%' },
                  title: 'מנוי/כרטיסיה',
                  onOrderChange: (key) => {
                    setOrderKey('subscription')
                    setOrderDirection(key)
                  },
                  orderDirection: orderKey === 'subscription' ? orderDirection : null,
                  render: () => (
                    <div style={{ overflow: 'scroll', gap: 6, maxWidth: 240 }}>
                      {/* {subscription.map((_) => (
                        <SubcriptionTag color="purple">{_}</SubcriptionTag>
                      ))} */}
                    </div>
                  )
                },
                {
                  isFilter: true,
                  style: { width: '15%' },
                  title: 'ת. אימון אחרון',
                  onOrderChange: (key) => {
                    setOrderKey('date_of_last_training')
                    setOrderDirection(key)
                  },
                  orderDirection: orderKey === 'date_of_last_training' ? orderDirection : null,
                  render: ({ date_of_last_training }) => date_of_last_training || ''
                },
                {
                  isFilter: true,
                  style: { width: '15%' },
                  title: 'גיל',
                  onOrderChange: (key) => {
                    setOrderKey('age')
                    setOrderDirection(key)
                  },
                  orderDirection: orderKey === 'age' ? orderDirection : null,
                  render: ({ birthday }) => birthday
                },
                {
                  isFilter: true,
                  style: { width: '15%' },
                  title: 'אימייל',
                  onOrderChange: (key) => {
                    setOrderKey('email')
                    setOrderDirection(key)
                  },
                  orderDirection: orderKey === 'email' ? orderDirection : null,
                  render: ({ email }) => email
                },
                {
                  isFilter: true,
                  style: { width: '15%' },
                  title: 'טלפון',
                  onOrderChange: (key) => {
                    setOrderKey('phone')
                    setOrderDirection(key)
                  },
                  orderDirection: orderKey === 'phone' ? orderDirection : null,
                  render: ({ phone }) => phone
                },
                {
                  isFilter: true,
                  style: { width: '15%' },
                  title: 'שם',
                  onOrderChange: (key) => {
                    setOrderKey('name')
                    setOrderDirection(key)
                  },
                  orderDirection: orderKey === 'name' ? orderDirection : null,
                  render: ({ full_name }) => full_name
                },
                {
                  isFilter: true,
                  style: { width: '15%' },
                  title: '',
                  orderDirection: orderKey === 'avatar' ? orderDirection : null,
                  render: ({ avatar_url, full_name }) => (
                    <Avatar style={{ width: 40, height: 40, fontSize: 16 }} fullName={full_name} />
                  )
                }
              ]}
              data={collection}
              onRowClick={(record) =>
                navigation(`${ROUTES.TRAINEES_PROFILE_PAGE}`, { state: record._id })
              }
            />
          </div>
        </div>
      </PageContainer>
      <AddTraineeModal
        visible={isModalVisible}
        style={{ width: 411 }}
        onClose={() => setIsModalVisible(false)}
      />
      <CreateSellerModal
        visible={isCreateModalVisible}
        style={{ width: 411 }}
        onClose={() => setCreateModalVisible(false)}
      />
    </div>
  )
}

export default TraineesPageLayout
