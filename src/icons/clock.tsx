import React from 'react'
import { IconProps } from './types'

const Clock: React.FC<IconProps> = ({ size = 20, ...rest }) => (
  <svg width={size} height={size} fill="black" viewBox="0 0 20 20" {...rest}>
    <path
      d="M11.99 2A10 10 0 1022 12 10 10 0 0011.99 2zM12 20a8 8 0 118-8 8 8 0 01-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
      transform="translate(-2 -2)"
    />
  </svg>
)

export default Clock
