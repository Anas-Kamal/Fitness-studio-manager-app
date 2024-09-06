import React from 'react'
import { IconProps } from './types'

const UploadIcon: React.FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="-2 -3 24 24" fill="black" {...rest}>
    <path
      d="M20 6h-8l-2-2H4a1.985 1.985 0 00-1.99 2L2 18a1.993 1.993 0 002 2h16a1.993 1.993 0 002-2V8a1.993 1.993 0 00-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3z"
      transform="translate(-2 -4)"
    />
  </svg>
)

export default UploadIcon
