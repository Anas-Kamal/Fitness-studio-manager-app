import React from 'react'
import cls from 'classnames'
import PageContainer from '../../fragments/components/page-container'
import Rooms from '../../fragments/rooms/rooms'
import AddRoomModal from '../../fragments/rooms/modals/add-room'
import CreateSellerModal from '../../fragments/create-seller/create-seller-modal'

interface Index {
  className?: string
  style?: React.CSSProperties
}

const RoomsPageLayout: React.FC<Index> = ({ className, style }) => {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false)
  const [isCreateModalVisible, setCreateModalVisible] = React.useState<boolean>(false)

  return (
    <div style={style} className={cls(className)}>
      <PageContainer>
        <Rooms
          onOpen={() => setIsModalVisible(true)}
          openSellerModal={() => setCreateModalVisible(true)}
        />
      </PageContainer>
      <AddRoomModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
      <CreateSellerModal
        visible={isCreateModalVisible}
        style={{ width: 411 }}
        onClose={() => setCreateModalVisible(false)}
      />
    </div>
  )
}

export default RoomsPageLayout
