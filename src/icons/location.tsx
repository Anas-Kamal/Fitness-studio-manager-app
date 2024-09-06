import React from 'react'
import { IconProps } from './types'

const LocationIcon: React.FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="black" {...rest}>
    <path
      d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1114.5 9a2.5 2.5 0 01-2.5 2.5z"
      transform="translate(-5 -2)"
    />
  </svg>
)
export default LocationIcon
