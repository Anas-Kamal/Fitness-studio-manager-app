import React from 'react'
import { IconProps } from './types'

const DatePickerIcon: React.FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg width={size} height={size} fill="black" viewBox="0 0 24 24" {...rest}>
    <g data-name="Group 3023" transform="translate(15599.074 5022.963)">
      <path
        d="M17 10H7v2h10zm2-7h-1V1h-2v2H8V1H6v2H5a1.991 1.991 0 00-1.99 2L3 19a2 2 0 002 2h14a2.006 2.006 0 002-2V5a2.006 2.006 0 00-2-2zm0 16H5V8h14zm-5-5H7v2h7z"
        transform="translate(-15602.074 -5023.963)"
      />
    </g>
  </svg>
)

export default DatePickerIcon
