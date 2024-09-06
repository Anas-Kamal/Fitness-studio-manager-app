import React from 'react'
import { IconProps } from './types'

const ThrashIcon: React.FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="black" {...rest}>
    <path
      fill="#595959"
      d="M6 19a2.006 2.006 0 002 2h8a2.006 2.006 0 002-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
      transform="translate(-5 -3)"
    />
  </svg>
)

export default ThrashIcon
