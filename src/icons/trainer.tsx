import React from 'react'
import { IconProps } from './types'

const TrainerIcon: React.FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg width={size} height={size} fill="black" viewBox="0 0 24 24" {...rest}>
    <path
      d="M20 0H4v2h16zM4 24h16v-2H4zM20 4H4a2.006 2.006 0 00-2 2v12a2.006 2.006 0 002 2h16a2.006 2.006 0 002-2V6a2.006 2.006 0 00-2-2zm-8 2.75A2.25 2.25 0 119.75 9 2.253 2.253 0 0112 6.75zM17 17H7v-1.5c0-1.67 3.33-2.5 5-2.5s5 .83 5 2.5z"
      transform="translate(-2)"
    />
  </svg>
)

export default TrainerIcon
