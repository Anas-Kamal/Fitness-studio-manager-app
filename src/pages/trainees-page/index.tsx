import React from 'react'
import cls from 'classnames'
import { useLocation } from 'react-router-dom'
import PageContainer from '../../fragments/components/page-container'
import TraineesProfilePage from '../../fragments/trainees-profile-page/trainees-page'

interface TraineesProfilePageLayoutProps {
  className?: string
  style?: React.CSSProperties
}

const TraineesProfilePageLayout: React.FC<TraineesProfilePageLayoutProps> = ({ className, style }) => {
  const { state: traineeId }: { state: string } = useLocation()

  return (
    <div style={style} className={cls(className)}>
      <PageContainer>
        <TraineesProfilePage traineeId={traineeId} />
      </PageContainer>
    </div>
  )
}

export default TraineesProfilePageLayout
