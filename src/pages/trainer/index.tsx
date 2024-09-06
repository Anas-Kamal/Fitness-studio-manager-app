/* eslint-disable no-underscore-dangle */
import React from 'react'
import cls from 'classnames'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../../fragments/components/page-container'
import Table from '../../fragments/components/table'
import { Ordering } from '../../features/api-types'
import Trainer from '../../fragments/trainer/trainer'
import AddTrainerModal from '../../fragments/trainer/modals/add-trainer'
import { ROUTES } from '../../lib/constants'
import Avatar from '../../fragments/components/avatar'
import useTrainerStudio from '../../features/trainer'
import useAuth from '../../features/auth'
import CreateSellerModal from '../../fragments/create-seller/create-seller-modal'

interface TrainerProps {
  className?: string
  style?: React.CSSProperties
}

const TrainersPageLayout: React.FC<TrainerProps> = ({ className, style }) => {
  const navigation = useNavigate()
  // const [page, setPage] = React.useState(1)
  // const [rowFilter, setRowFilter] = React.useState<string>()
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false)
  const [isCreateModalVisible, setCreateModalVisible] = React.useState<boolean>(false)

  const [orderKey, setOrderKey] = React.useState<string | null>('created_at')
  const [orderDirection, setOrderDirection] = React.useState<Ordering>('desc')

  const { profile } = useAuth()
  const { collection, isLoading } = useTrainerStudio({ studio_id: profile?._id })

  return (
    <div style={style} className={cls(className)}>
      <PageContainer>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Trainer
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
              loading={isLoading}
              columns={[
                {
                  isFilter: true,
                  style: { width: '15%' },
                  title: 'כמות אימונים',
                  onOrderChange: (key) => {
                    setOrderKey('amount_of_trainings')
                    setOrderDirection(key)
                  },
                  orderDirection: orderKey === 'amount_of_trainings' ? orderDirection : null,
                  render: ({ amount_of_trainings }) => amount_of_trainings
                },
                {
                  isFilter: true,
                  style: {
                    width: '15%'
                  },
                  title: 'ת. אימון אחרון',
                  onOrderChange: (key) => {
                    setOrderKey('date_of_last_training')
                    setOrderDirection(key)
                  },
                  orderDirection: orderKey === 'date_of_last_training' ? orderDirection : null,
                  render: ({ date_of_last_training }) => date_of_last_training
                },
                {
                  isFilter: true,
                  style: { width: '15%' },
                  title: 'מגדר',
                  onOrderChange: (key) => {
                    setOrderKey('sex')
                    setOrderDirection(key)
                  },
                  orderDirection: orderKey === 'sex' ? orderDirection : null,
                  render: ({ sex }) => (sex === 'male' ? 'זכר' : 'נקבה')
                },

                {
                  onOrderChange: (key) => {
                    setOrderKey('email')
                    setOrderDirection(key)
                  },
                  orderDirection: orderKey === 'email' ? orderDirection : null,
                  title: 'אימייל',
                  isFilter: true,
                  render: ({ email }) => email
                },
                {
                  onOrderChange: (key) => {
                    setOrderKey('phone')
                    setOrderDirection(key)
                  },
                  orderDirection: orderKey === 'phone' ? orderDirection : null,

                  title: 'טלפון',
                  isFilter: true,
                  render: ({ phone }) => phone
                },
                {
                  onOrderChange: (key) => {
                    setOrderKey('name')
                    setOrderDirection(key)
                  },
                  orderDirection: orderKey === 'name' ? orderDirection : null,

                  title: 'שם',
                  isFilter: true,
                  render: ({ name }) => name
                },
                {
                  title: '',
                  isFilter: true,
                  render: ({ avatar, name }) => (
                    <Avatar
                      style={{ width: 40, height: 40, fontSize: 14 }}
                      fullName={avatar || name}
                    />
                  )
                }
              ]}
              data={collection}
              onRowClick={(record) =>
                navigation(`${ROUTES.TRAINER_PROFILE_PAGE}`, { state: record._id })
              }
            />
          </div>
        </div>
      </PageContainer>
      <AddTrainerModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
      <CreateSellerModal
        visible={isCreateModalVisible}
        style={{ width: 411 }}
        onClose={() => setCreateModalVisible(false)}
      />
    </div>
  )
}

export default TrainersPageLayout
