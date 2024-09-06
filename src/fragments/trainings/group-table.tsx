/* eslint-disable no-underscore-dangle */

import React from 'react'
import cls from 'classnames'
import Table from '../components/table'
import { Ordering } from '../../features/api-types'
import useCalendarGroupSession from '../../features/calendar-groups-sessions'
import useAuth from '../../features/auth'

interface GroupTable {
  className?: string
  style?: React.CSSProperties
}

const GroupTable: React.FC<GroupTable> = ({ className, style }) => {
  const [orderKey, setOrderKey] = React.useState<string | null>('created_at')
  const [orderDirection, setOrderDirection] = React.useState<Ordering>('desc')

  const { profile } = useAuth()
  const { collection, isLoading, isValidating } = useCalendarGroupSession({ studio_id: profile?._id })

  return (
    <Table
      className={cls(className)}
      style={{
        ...style,
        width: '100%',
        maxWidth: 1350,
        minHeight: 400,
        marginInline: 'auto',
      }}
      columns={[
        {
          style: { width: '15%' },
          title: 'מחיר',
          isFilter: true,
          onOrderChange: key => {
            setOrderKey('price')
            setOrderDirection(key)
          },
          orderDirection: orderKey === 'price' ? orderDirection : null,

          render: ({ group_price }) => group_price,
        },
        {
          isFilter: true,
          onOrderChange: key => {
            setOrderKey('amount_of_trainings')
            setOrderDirection(key)
          },
          orderDirection: orderKey === 'amount_of_trainings' ? orderDirection : null,

          style: { width: '15%' },
          title: 'כמות אימונים',
          render: ({ group_amount_of_trainings }) => group_amount_of_trainings,
        },
        {
          isFilter: true,
          onOrderChange: key => {
            setOrderKey('last_training')
            setOrderDirection(key)
          },
          orderDirection: orderKey === 'last_training' ? orderDirection : null,

          style: { width: '15%' },
          title: 'ת. אימון אחרון',
          render: ({ group_date_of_end }) => group_date_of_end,
        },
        {
          isFilter: true,
          onOrderChange: key => {
            setOrderKey('number_of_participants')
            setOrderDirection(key)
          },
          orderDirection: orderKey === 'number_of_participants' ? orderDirection : null,

          style: { width: '15%' },
          title: 'כמות משתתפים',
          render: ({ group_number_of_partipiciants }) => group_number_of_partipiciants,
        },
        {
          isFilter: true,
          onOrderChange: key => {
            setOrderKey('instructor')
            setOrderDirection(key)
          },
          orderDirection: orderKey === 'instructor' ? orderDirection : null,
          style: { width: '15%' },
          title: 'מדריך',
          render: ({ group_instructor }) => group_instructor,
        },
        {
          isFilter: true,
          onOrderChange: key => {
            setOrderKey('date_of_training')
            setOrderDirection(key)
          },
          orderDirection: orderKey === 'date_of_training' ? orderDirection : null,

          style: { width: '15%' },
          title: 'תאריך',
          render: ({ group_date }) => group_date,
        },
        {
          isFilter: true,
          onOrderChange: key => {
            setOrderKey('type_of_training')
            setOrderDirection(key)
          },
          orderDirection: orderKey === 'type_of_training' ? orderDirection : null,

          style: { width: '15%' },
          title: 'סוג אימון',
          render: ({ group_type_of_studying }) => group_type_of_studying,
        },
      ]}
      data={collection}
      refreshing={isValidating}
      loading={isLoading}
    />
  )
}

export default GroupTable
