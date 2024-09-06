import React from 'react'
import { IconProps } from './types'

const CalendarIcon: React.FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="-3 -1 24 24" fill="black" {...rest}>
    <path
      fill="#241f1f"
      d="M17 12h-5v5h5zM16 1v2H8V1H6v2H5a1.991 1.991 0 00-1.99 2L3 19a2 2 0 002 2h14a2.006 2.006 0 002-2V5a2.006 2.006 0 00-2-2h-1V1zm3 18H5V8h14z"
      transform="translate(-3 -1)"
    />
  </svg>
)

export default CalendarIcon
