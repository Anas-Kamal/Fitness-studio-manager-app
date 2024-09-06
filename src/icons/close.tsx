import * as React from 'react'
import { IconProps } from './types'

const Close: React.FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" {...rest}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M17.25 6.75l-10.5 10.5M6.75 6.75l10.5 10.5"
    />
  </svg>
)

export default Close
