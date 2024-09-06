import React from 'react'
import cls from 'classnames'
import PageContainer from '../../fragments/components/page-container'
import CardsAndSubscriptions from '../../fragments/cards/cards-and-subscriptions'

interface CardAndSubscriptionsPageLayoutProps {
  className?: string
  style?: React.CSSProperties
}

const CardAndSubscriptionsPageLayout: React.FC<CardAndSubscriptionsPageLayoutProps> = ({ className, style }) => (
  <div style={style} className={cls(className)}>
    <PageContainer>
      <CardsAndSubscriptions />
    </PageContainer>
  </div>
)

export default CardAndSubscriptionsPageLayout
