import React from 'react'
import { IconProps } from './types'

const Address: React.FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="black" {...rest}>
    <path
      d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9a.5.5 0 00-.36.48V20.5a.5.5 0 00.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9a.5.5 0 00.36-.48V3.5a.5.5 0 00-.5-.5zM15 19l-6-2.11V5l6 2.11z"
      transform="translate(-3 -3)"
    />
  </svg>
)

export default Address
