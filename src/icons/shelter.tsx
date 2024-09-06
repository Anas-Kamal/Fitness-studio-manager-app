import React from 'react'
import { IconProps } from './types'

const ShelterIcon: React.FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="0 -1 24 24" fill="black" {...rest}>
    <path
      fill="#241f1f"
      d="M2.53 19.65l1.34.56v-9.03l-2.43 5.86a2.019 2.019 0 001.09 2.61zm19.5-3.7L17.07 3.98a1.993 1.993 0 00-2.6-1.08L7.1 5.95a2 2 0 00-1.23 1.8 1.866 1.866 0 00.15.8l4.96 11.97a2 2 0 001.83 1.23 2.069 2.069 0 00.77-.15l7.36-3.05a1.994 1.994 0 001.09-2.6zM7.88 8.75a1 1 0 111-1 1 1 0 01-1 1zm-2 11a2.006 2.006 0 002 2h1.45l-3.45-8.34z"
      transform="translate(-1.295 -2.75)"
    />
  </svg>
)

export default ShelterIcon
