import React from 'react'
import { IconProps } from './types'

const Marker: React.FC<IconProps> = ({ size = 18, ...rest }) => (
  <svg width={size} height={size} viewBox="0 -3 18 24" fill="black" {...rest}>
    <path
      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
      transform="translate(-3 -2.997)"
    />
  </svg>
)

export default Marker
