import React from 'react'
import cls from 'classnames'
import styles from './cards-and-subscriptions.module.scss'
import useAuth from '../../features/auth'
import useCards from '../../features/cards'
import RoomList from '../../icons/rooms-list'
import CreateCard from './modals/create-card'
import CreateSubscription from './modals/create-subscription'
import useSubscriptions from '../../features/subscriptions'
import Card from './components/card'
import Subscription from './components/subscription'
import EditCard from './modals/edit-card'
import { CardType, SubscriptionType } from '../../features/api-types'
import EditSubscription from './modals/edit-subscription'
import DeleteCard from './modals/delete-card'
import DeleteSubscription from './modals/delete-subscription'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../lib/constants'
import CreateSellerModal from '../create-seller/create-seller-modal'

interface CardsAndSubscriptionsProps {
  className?: string
  style?: React.CSSProperties
}

const CardsAndSubscriptions: React.FC<CardsAndSubscriptionsProps> = ({ className, style }) => {
  //   const [page, setPage] = React.useState(1)
  //   const [rowFilter, setRowFilter] = React.useState<string>()
  const [isCardLayout, setIsCardLayout] = React.useState(true)
  const [isCreateCardOpen, setIsCreateCardOpen] = React.useState(false)
  const [isCreateSubscriptionOpen, setIsCreateSubscriptionOpen] = React.useState(false)
  const [isEditCardOpen, setIsEditCardOpen] = React.useState(false)
  const [isDeleteCardOpen, setIsDeleteCardOpen] = React.useState(false)
  const [isDeleteSubscriptionOpen, setIsDeleteSubscriptionOpen] = React.useState(false)
  const [isEditSubscriptionOpen, setIsEditSubscriptionOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState<CardType|SubscriptionType >()
  const [selectedSubscription, setSelectedSubscription] = React.useState<SubscriptionType>()
  const [isCreateModalVisible, setCreateModalVisible] = React.useState<boolean>(false)
  const { profile } = useAuth()
  const {
    collection: cardsCollection,
    isLoading: isCardsLoading,
    isValidating: isCardsValidating
  } = useCards({ studio_id: profile?._id })
  const {
    collection: subscriptionsCollection,
    isLoading: isSubscriptionsLoading,
    isValidating: isSubscriptionsValidating
  } = useSubscriptions({ studio_id: profile?._id })


  const handleCardEdit = (card: CardType) => {
    setSelectedCard(card)
    setIsEditCardOpen(true)
  }

  const handleCardDelete = (card: CardType) => {
    setSelectedCard(card)
    setIsDeleteCardOpen(true)
  }

  const handleSubscriptionEdit = (card: SubscriptionType) => {
    setSelectedSubscription(card)
    setIsEditSubscriptionOpen(true)
  }
  const handleSubscriptionDelete = (card: SubscriptionType) => {
        setSelectedCard(card)
    // setSelectedSubscription(card)
    setIsDeleteSubscriptionOpen(true)
    // setIsEditSubscriptionOpen(true)
  }

  const handleClick = () => {
    // if (!profile?.seller?._id || profile.sellerKey === '' || profile.sellerKey === 'undefined') {
    //   setCreateModalVisible(true)
    // } else {
    //   isCardLayout ? setIsCreateCardOpen(true) : setIsCreateSubscriptionOpen(true)
    // }
    // if (!profile.sellerKey || profile.sellerKey === '' || profile.sellerKey === 'undefined') {
    //   setCreateModalVisible(true)
    // } else {
      isCardLayout ? setIsCreateCardOpen(true) : setIsCreateSubscriptionOpen(true)
    // }
  }
  return (
    <>
      <div style={style} className={cls(styles.wrapper, className)}>
        <header>
          <div>
            <button type="button" onClick={() => handleClick()} className={styles.createButton}>
              {isCardLayout ? 'יצירת כרטיסיה' : 'יצירת מנוי'}
            </button>
          </div>
          <div>
            <button
              onClick={() => setIsCardLayout(false)}
              style={{ backgroundColor: !isCardLayout ? '#1384e629' : '#fff' }}>
              מנויים
            </button>
            <button
              type="button"
              onClick={() => setIsCardLayout(true)}
              style={{ backgroundColor: isCardLayout ? '#1384e629' : '#fff' }}>
              כרטיסיות
            </button>
          </div>
        </header>
        <main className="flex w-100">
          {(isCardLayout && !cardsCollection.length) ||
          (!isCardLayout && !subscriptionsCollection.length) ? (
            <div>
              <RoomList />
              <div className={styles.noContentInfo}>
                {isCardLayout
                  ? 'לא נמצאו מנויים, ניתן להוסיף וליצור מנויים בלחצן השמאלי העליון'
                  : 'לא נוצרו כרטיסיות חדשות, אפשר להוסיף וליצור מנויים וכרטיסיות בלחצן השמאלי.'}
              </div>
            </div>
          ) : null}{' '}
          <div>
            <div>
              {isCardLayout === false ? (
                <div style={{ overflowX: 'auto' }} className={styles.cardsWrapper}>
                  {subscriptionsCollection.length > 0 ? (
                    subscriptionsCollection.map((subscription) => (
                      <Subscription
                        key={subscription._id} // Add a unique key prop
                        subscription={subscription}
                        onEdit={() => handleSubscriptionEdit(subscription)}
                        onDelete={() => handleSubscriptionDelete(subscription)}
                      />
                    ))
                  ) : (
                    <p>No subscriptions to display</p>
                  )}
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }} className={styles.cardsWrapper}>
                  {cardsCollection.length > 0 ? (
                    cardsCollection.map((card) => (
                      <Card
                        key={card._id} // Add a unique key prop
                        card={card}
                        onEdit={() => handleCardEdit(card)}
                        onDelete={() => handleCardDelete(card)}
                      />
                    ))
                  ) : (
                    <p>No cards to display</p>
                  )}
                </div>
              )}
            </div>
            {/* <div className={styles.cardsWrapper}></div> */}
          </div>
        </main>
      </div>
      <CreateCard
        isVisible={isCreateCardOpen}
        onClose={() => setIsCreateCardOpen(false)}
        style={{ width: 597 }}
      />
      <EditCard
        isVisible={isEditCardOpen}
        onClose={() => setIsEditCardOpen(false)}
        style={{ width: 597 }}
        card={selectedCard}
      />
      <CreateSubscription
        isVisible={isCreateSubscriptionOpen}
        onClose={() => setIsCreateSubscriptionOpen(false)}
        style={{ width: 597 }}
      />
      <EditSubscription
        isVisible={isEditSubscriptionOpen}
        onClose={() => setIsEditSubscriptionOpen(false)}
        style={{ width: 597 }}
        subscription={selectedSubscription}
      />
      <DeleteCard
        isVisible={isDeleteCardOpen}
        onClose={() => setIsDeleteCardOpen(false)}
        style={{ width: 597 }}
        card={selectedCard}
      />
      <DeleteSubscription
        isVisible={isDeleteSubscriptionOpen}
        onClose={() => setIsDeleteSubscriptionOpen(false)}
        style={{ width: 597 }}
        card={selectedCard}
      />
      <CreateSellerModal
        visible={isCreateModalVisible}
        style={{ width: 411 }}
        onClose={() => setCreateModalVisible(false)}
      />
    </>
  )
}

export default CardsAndSubscriptions
