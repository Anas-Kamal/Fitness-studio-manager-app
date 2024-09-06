import React from 'react'
import cls from 'classnames'
import { useLocation } from 'react-router-dom'
import PageContainer from '../../fragments/components/page-container'
import TrainerProfilePage from '../../fragments/trainer-profile-page/trainer-page'

interface TrainerProfilePageProps {
  className?: string
  style?: React.CSSProperties
}

const TrainerProfilePageLayout: React.FC<TrainerProfilePageProps> = ({ className, style }) => {
  // fetch info about trainer
  const { state: trainerId }: { state: string } = useLocation()

  return (
    <div style={style} className={cls(className)}>
      <PageContainer>
        <TrainerProfilePage trainerId={trainerId} />
      </PageContainer>
    </div>
  )
}

export default TrainerProfilePageLayout
