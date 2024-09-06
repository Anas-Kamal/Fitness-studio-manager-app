import React from 'react'
import cls from 'classnames'
import styles from './rooms.module.scss'
import RoomList from '../../icons/rooms-list'
import useAuth from '../../features/auth'
import useRooms from '../../features/rooms'
import Table from '../components/table'
import { Ordering } from '../../features/api-types'
import Search from '../../icons/search'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../lib/constants'

interface RoomsProps {
  className?: string
  style?: React.CSSProperties
  onOpen: () => void
  openSellerModal: () => void
}

const Rooms: React.FC<RoomsProps> = ({
  className,
  style,
  onOpen = () => null,
  openSellerModal
}) => {
  const [page, setPage] = React.useState(1)
  const [rowFilter, setRowFilter] = React.useState<string>()

  const [orderKey, setOrderKey] = React.useState<string | null>('created_at')
  const [orderDirection, setOrderDirection] = React.useState<Ordering>('desc')

  const { profile } = useAuth()
  const { collection, isLoading, isValidating } = useRooms({ studio_id: profile?._id })

  const navigate = useNavigate()

  const handleClick = () => {
    // if (!profile.sellerKey || profile.sellerKey === '' || profile.sellerKey === 'undefined') {
    //   openSellerModal()
    // } else {
    onOpen()
    // }
  }
  return (
    <div style={style} className={cls(styles.wrapper, className)}>
      <div>
        <button type="button" onClick={handleClick}>
          יצירת חדר
        </button>
      </div>
      <div>
        {collection && collection.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #F4F4F4',
                borderRadius: 16,
                padding: '20px 20px',
                width: '90%',
                marginInline: 'auto'
              }}>
              <div>
                <span>לחץ על מנת לחפש חדר</span>
                <Search />
                <span>חדרים</span>
              </div>
              <Table
                refreshing={isValidating}
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
                    title: 'מתקנים',
                    onOrderChange: (key) => {
                      setOrderKey('facilities')
                      setOrderDirection(key)
                    },
                    orderDirection: orderKey === 'facilities' ? orderDirection : null,
                    render: ({ facilities }) => facilities
                  },
                  {
                    isFilter: true,
                    style: { width: '15%' },
                    title: 'יעוד',
                    onOrderChange: (key) => {
                      setOrderKey('room_type')
                      setOrderDirection(key)
                    },
                    orderDirection: orderKey === 'room_type' ? orderDirection : null,
                    render: ({ room_type }) => room_type
                  },
                  {
                    isFilter: true,
                    style: { width: '15%' },
                    title: 'גודל',
                    onOrderChange: (key) => {
                      setOrderKey('width_of_room')
                      setOrderDirection(key)
                    },
                    orderDirection: orderKey === 'width_of_room' ? orderDirection : null,
                    render: ({ width_of_room }) => width_of_room
                  },
                  {
                    isFilter: true,
                    style: { width: '15%' },
                    title: 'שם',
                    onOrderChange: (key) => {
                      setOrderKey('name_of_room')
                      setOrderDirection(key)
                    },
                    orderDirection: orderKey === 'name_of_room' ? orderDirection : null,
                    render: ({ name_of_room }) => name_of_room
                  }
                ]}
                data={collection}
                onRowClick={(record) => null}
              />
            </div>
          </div>
        ) : (
          <>
            <RoomList />
            <span>
              עדיין לא יצרתם חדרים בסטודיו שלכם על מנת ליצור חדר לחצו על הכפתור יצירת חדר בצד שמאל
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default Rooms
