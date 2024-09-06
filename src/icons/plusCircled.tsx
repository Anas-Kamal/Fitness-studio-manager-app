import React from 'react'
import { IconProps } from './types'

const PlusCircledIcon: React.FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="black" {...rest}>
    <path
      d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8.011 8.011 0 01-8 8z"
      transform="translate(-2 -2)"
    />
  </svg>
)

export default PlusCircledIcon
