import React from 'react'
import { IconProps } from './types'

const AddContact: React.FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 30 24" fill="black" {...rest}>
    <path
      d="M18.5 14a5 5 0 10-5-5 5 5 0 005 5zM7.25 11.5V7.75h-2.5v3.75H1V14h3.75v3.75h2.5V14H11v-2.5zm11.25 5c-3.337 0-10 1.675-10 5V24h20v-2.5c0-3.325-6.663-5-10-5z"
      transform="translate(-1 -4)"
    />
  </svg>
)

export default AddContact
