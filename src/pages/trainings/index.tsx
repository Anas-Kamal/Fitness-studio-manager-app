import React from 'react'
import cls from 'classnames'
import Trainings from '../../fragments/trainings/trainings'
import PageContainer from '../../fragments/components/page-container'

interface TrainingsPageLayoutProps {
  className?: string
  style?: React.CSSProperties
}

const TrainingsPageLayout: React.FC<TrainingsPageLayoutProps> = ({ className, style }) => (
  <div style={style} className={cls(className)}>
    <PageContainer>
      <Trainings />
    </PageContainer>
  </div>
)

export default TrainingsPageLayout
