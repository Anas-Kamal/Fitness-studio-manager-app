
/* eslint-disable no-underscore-dangle */
import React from 'react'
import cls from 'classnames'
import Table from '../components/table'
import { Ordering } from '../../features/api-types'
import useAuth from '../../features/auth'
import useCalendarCourseSession from '../../features/calendar-course-session'

interface CourseTableProps {
  className?: string
  style?: React.CSSProperties
}

const CourseTable: React.FC<CourseTableProps> = ({ className, style }) => {
  const [orderKey, setOrderKey] = React.useState<string | null>('created_at')
  const [orderDirection, setOrderDirection] = React.useState<Ordering>('desc')

  const { profile } = useAuth()
  const { collection, isLoading, isValidating } = useCalendarCourseSession({
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
          style: { width: '15%' },
          title: 'מחיר',
          isFilter: true,
          onOrderChange: key => {
            setOrderKey('instructor')
            setOrderDirection(key)
          },
          orderDirection: orderKey === 'instructor' ? orderDirection : null,

          render: ({ course_trainer }) => course_trainer,
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
          render: ({ course_end_date }) => course_end_date,
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
          render: ({ course_participants_number }) => course_participants_number,
        },
        {
          isFilter: true,
          onOrderChange: key => {
            setOrderKey('course_repetition')
            setOrderDirection(key)
          },
          orderDirection: orderKey === 'course_repetition' ? orderDirection : null,

          style: { width: '15%' },
          title: 'כמות חזרות',
          render: ({ course_repetitions_amount }) => course_repetitions_amount,
        },
        {
          isFilter: true,
          onOrderChange: key => {
            setOrderKey('end_date')
            setOrderDirection(key)
          },
          orderDirection: orderKey === 'end_date' ? orderDirection : null,

          style: { width: '15%' },
          title: 'תאריך סיום',
          render: ({ course_end_date }) => course_end_date,
        },
        {
          isFilter: true,
          onOrderChange: key => {
            setOrderKey('start_date')
            setOrderDirection(key)
          },
          orderDirection: orderKey === 'start_date' ? orderDirection : null,

          style: { width: '15%' },
          title: 'תאריך התחלה',
          render: ({ course_start_date }) => course_start_date,
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
          render: ({ course_trainer }) => course_trainer,
        },
        {
          isFilter: true,
          onOrderChange: key => {
            setOrderKey('name')
            setOrderDirection(key)
          },
          orderDirection: orderKey === 'name' ? orderDirection : null,

          style: { width: '15%' },
          title: 'שם הקורס',
          render: ({ course_name }) => course_name,
        },
      ]}
      data={collection}
      refreshing={isValidating}
      loading={isLoading}
    />
  )
}

export default CourseTable
