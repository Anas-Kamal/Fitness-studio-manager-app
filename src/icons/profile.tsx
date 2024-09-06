import React from 'react'
import { IconProps } from './types'

const ProfileIcon: React.FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="0 -7 24 24" fill="black" {...rest}>
    <path
      fill="#241f1f"
      d="M12 12a4 4 0 10-4-4 4 4 0 004 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      transform="translate(-4 -4)"
    />
  </svg>
)

export default ProfileIcon
