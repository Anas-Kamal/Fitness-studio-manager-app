
/* eslint-disable no-underscore-dangle */
import React from 'react'
import cls from 'classnames'
import { intervalToDuration } from 'date-fns'
import Table from '../components/table'
import { Ordering } from '../../features/api-types'
import useAuth from '../../features/auth'
import useCalendarPrivateSession from '../../features/calendar-private-session'

interface PrivateTableProps {
  className?: string
  style?: React.CSSProperties
}
const formatHours = (h: number | undefined) => (h && h?.toString()?.length > 1 ? h : `0${h}`)
const formatMinutes = (h: number | undefined) => (h && h?.toString()?.length > 1 ? h : `0${h}`)

const PrivateTable: React.FC<PrivateTableProps> = ({ className, style }) => {
  const [orderKey, setOrderKey] = React.useState<string | null>('created_at')
  const [orderDirection, setOrderDirection] = React.useState<Ordering>('desc')

  const { profile } = useAuth()
  const { collection, isLoading, isValidating } = useCalendarPrivateSession({
    studio_id: profile?._id,
  })
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
          isFilter: true,
          onOrderChange: key => {
            setOrderKey('amount_of_trainings')
            setOrderDirection(key)
          },
          orderDirection: orderKey === 'amount_of_trainings' ? orderDirection : null,

          style: { width: '15%' },
          title: 'כמות אימונים',
          render: ({ private_amount_of_trainings }) => private_amount_of_trainings,
        },
        {
          style: { width: '15%' },
          title: 'ת. אימון אחרון',
          isFilter: true,
          onOrderChange: key => {
            setOrderKey('last_training')
            setOrderDirection(key)
          },
          orderDirection: orderKey === 'last_training' ? orderDirection : null,

          render: ({ private_finish }) => private_finish,
        },
        {
          isFilter: true,
          onOrderChange: key => {
            setOrderKey('duration_of_trainings')
            setOrderDirection(key)
          },
          orderDirection: orderKey === 'duration_of_trainings' ? orderDirection : null,

          style: { width: '15%' },
          title: 'משך אימון',
          render: ({ private_start, private_finish, private_date }) => {
            const startDate = new Date(`${private_date}:${private_start}`)
            const endDate = new Date(`${private_date}:${private_finish}`)
            const diff = intervalToDuration({ start: startDate, end: endDate })

            return `${formatHours(diff.hours)}:${formatMinutes(diff.minutes)}`
          },
        },
        {
          isFilter: true,
          onOrderChange: key => {
            setOrderKey('date')
            setOrderDirection(key)
          },
          orderDirection: orderKey === 'date' ? orderDirection : null,

          style: { width: '15%' },
          title: 'תאריך',
          render: ({ private_date }) => private_date,
        },
        {
          isFilter: true,
          onOrderChange: key => {
            setOrderKey('external_address')
            setOrderDirection(key)
          },
          orderDirection: orderKey === 'external_address' ? orderDirection : null,
          style: { width: '15%' },
          title: 'שם מתאמן',
          render: ({ private_is_external_address, private_room, private_address }) =>
            private_is_external_address ? private_address : private_room,
        },
        {
          isFilter: true,
          onOrderChange: key => {
            setOrderKey('private_instructor')
            setOrderDirection(key)
          },
          orderDirection: orderKey === 'private_instructor' ? orderDirection : null,

          style: { width: '15%' },
          title: 'מדריך',
          render: ({ private_instructor }) => private_instructor,
        },
      ]}
      data={collection}
      refreshing={isValidating}
      loading={isLoading}
    />
  )
}

export default PrivateTable
