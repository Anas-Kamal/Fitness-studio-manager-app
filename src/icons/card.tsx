import React from 'react'
import { IconProps } from './types'

const CardIcon: React.FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="0 -3 24 24" fill="black" {...rest}>
    <path
      d="M20 4H4a1.985 1.985 0 00-1.99 2L2 18a1.993 1.993 0 002 2h16a1.993 1.993 0 002-2V6a1.993 1.993 0 00-2-2zm0 14H4v-6h16zm0-10H4V6h16z"
      transform="translate(-2 -4)"
    />
  </svg>
)

export default CardIcon
