import React from 'react'
import { IconProps } from './types'

const Sorter: React.FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="-5 -7 24 24" fill="black" {...rest}>
    <path
      d="M8.056 14.667h2.889v-1.445H8.056zM3 6v1.444h13V6zm2.167 5.056h8.667V9.611H5.167z"
      transform="translate(-3 -6)"
    />
  </svg>
)

export default Sorter
