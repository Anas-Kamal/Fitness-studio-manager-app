import React from 'react'
import { IconProps } from './types'

const Tablet = React.forwardRef<SVGSVGElement, IconProps>(({ size = 24, ...rest }, ref) => (
  <svg width={size} height={size} viewBox="-5 -5 24 24" fill="none" ref={ref} {...rest}>
    <path
      d="M17 10H7v2h10zm2-7h-1V1h-2v2H8V1H6v2H5a1.991 1.991 0 00-1.99 2L3 19a2 2 0 002 2h14a2.006 2.006 0 002-2V5a2.006 2.006 0 00-2-2zm0 16H5V8h14zm-5-5H7v2h7z"
      transform="translate(-3 -1)"
    />
  </svg>
))

export default Tablet
